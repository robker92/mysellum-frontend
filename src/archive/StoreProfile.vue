<template>
  <div class="mainDiv">
    <div v-if="editMode">
      <v-row v-if="profileData">
        <v-col cols="12" sm="6" offset-sm="3">
          <v-card>
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="(imgSrc, index) in this.profileData.images"
                  :key="index"
                  class="d-flex child-flex"
                  cols="4"
                >
                  <v-card flat tile class="d-flex">
                    <v-img
                      :src="imgSrc"
                      height="150px"
                      width="150px"
                      class="grey lighten-2"
                    >
                      <v-btn
                        icon
                        outlined
                        absolute
                        top
                        left
                        small
                        color="white"
                        @click="deleteImage(index)"
                      >
                        <!-- -->
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-carousel
        v-if="profileData"
        cycle
        show-arrows-on-hover
        height="400px"
        style="width:500px;"
      >
        <v-carousel-item v-for="(img, i) in profileData.images" :key="i" eager>
          <v-img :src="img.src" height="100%" eager>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-2"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-container fill-height fluid pa-0 ma-0 pb-3>
              <v-layout fill-height align-start pb-4 mb-4>
                <v-flex xs12>
                  <v-card color="transparent" flat class="pa-2">
                    <span class="headline white--text" v-text="img.title">
                    </span>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-btn @click="printData">Print</v-btn>
    <EditStoreDialog
      v-model="showEditStoreDialog"
      :profile-data="profileData"
      @edit-store="submitEditStore"
    />
    <div v-if="checkForStoreOwner">
      <v-btn
        v-if="editMode == false"
        color="pink"
        icon
        outlined
        @click="
          editMode = true;
          $vuetify.goTo(0);
        "
      >
        <v-icon color="pink">mdi-pencil</v-icon>
      </v-btn>
      <v-btn color="pink" outlined @click="showEditStoreDialog = true">
        <v-icon color="pink">mdi-pencil</v-icon>
        Edit Store
      </v-btn>
      <v-btn
        v-if="editMode == true"
        color="indigo"
        icon
        outlined
        @click="saveStoreChanges"
      >
        <v-icon color="indigo">mdi-content-save</v-icon>
      </v-btn>
    </div>
    <div v-if="editMode" id="titleDiv">
      <v-btn @click="showAddStoreImageDialog = true">Add Image</v-btn>
      <AddStoreImageDialog
        v-model="showAddStoreImageDialog"
        @add-store-image="addNewImageToArray"
      />
      <v-text-field
        v-model="profileData.title"
        :counter="100"
        label="Store Title*"
        required
      />
      <v-textarea
        v-model="profileData.description"
        :counter="1000"
        label="Store Description*"
        required
      />
      <v-combobox
        v-model="tagsComboBox"
        :items="tagsComboBoxItems"
        label="Store Tags*"
        multiple
        chips
        deletable-chips
      />
    </div>
    <div v-else>
      <h1 v-if="profileData">{{ profileData.title }}</h1>
      <p v-if="profileData">{{ profileData.description }}</p>
      <v-chip
        v-for="(tag, index) in this.profileData.tags"
        :key="index"
        outlined
        class="ma-1"
        color="primary"
        >{{ tag }}</v-chip
      >
    </div>

    <!-- <v-container v-if="productList">
      <StoreProfileListItem
        v-for="prod in productList"
        v-bind:key="prod.productId"
        v-bind:product="prod"
        v-bind:modifiable="checkForStoreOwner"
        v-on:delete-product="removeProductFromArray"
      />
    </v-container>
    <v-container v-if="productList">
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="prod in productList"
          v-bind:key="prod.productId"
        >
          <StoreProfileListItemNew
            v-bind:product="prod"
            v-bind:modifiable="checkForStoreOwner"
            v-on:delete-product="removeProductFromArray"
            v-on:edit-product="showProductDialogEdit"
          />
        </v-col>
      </v-row>
    </v-container> -->
    <v-card v-if="dataset" class="mx-auto" max-width="344" outlined>
      <v-card-title>Address</v-card-title>
      <v-card-text>
        {{ dataset.mapData.address.street }}
        {{ dataset.mapData.address.houseNumber }},
        {{ dataset.mapData.address.city }}
        {{ dataset.mapData.address.postalCode }}
      </v-card-text>
      <v-card-text>
        Lat: {{ dataset.mapData.location.lat }} Lng:
        {{ dataset.mapData.location.lng }}
      </v-card-text>
    </v-card>
    <div v-if="dataset" height="400px">
      <GoogleMapProfile :map-data="mapData" />
    </div>
    <!-- <v-divider></v-divider>
    Average Rating:
    {{ this.avgRatingComputed }}
    ({{ profileData.reviews ? profileData.reviews.length : 0 }})
    <v-rating
      v-model="avgRatingComputed"
      background-color="orange lighten-3"
      color="orange"
      dense
      half-increments
      readonly
    />
    <v-btn
      @click.stop="showReviewDialogNew"
      v-show="!addButtonHidden"
      small
      dark
      color="indigo"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <ReviewDialog
      v-model="showReviewDialog"
      :reviewToEdit="reviewToEdit"
      v-on:add-new-review="addNewReviewToArray"
      v-on:update-review="editExistingReview"
      v-on:reviewToEdit-to-null="nullifyReviewToEdit"
      v-on:change-reviewToEdit-rating="changeRatingReviewToEdit"
      v-on:change-reviewToEdit-text="changeTextReviewToEdit"
    />
    <v-divider></v-divider>
    <div v-if="profileData.reviews">
      <StoreProfileReviewListItem
        v-for="rvw in computedReviews"
        v-bind:key="rvw.reviewId"
        v-bind:review="rvw"
        v-on:remove-review="removeReviewfromArray"
        v-on:edit-review="showReviewDialogEdit"
      />
    </div>
    <div v-if="profileData.reviews">
      <v-pagination
        v-model="currentPage"
        :length="numOfPages"
        v-if="profileData.reviews.length > reviewsPerPage"
      />
    </div> -->

    <AddProductDialog
      v-model="showProductDialog"
      :product-to-edit="productToEdit"
      @add-new-product="addNewProductToArray"
      @update-product="editExistingProduct"
      @productToEdit-to-null="nullifyProductToEdit"
      @change-productToEdit-title="changeTitleProductToEdit"
    />
    <v-tabs color="indigo" right icons-and-text centered>
      <v-tab>
        Products
        <v-icon left>
          mdi-format-list-bulleted
        </v-icon>
      </v-tab>
      <!--       <v-tab>
        Description
        <v-icon left>
          mdi-text-box-search-outline
        </v-icon>
      </v-tab> -->
      <v-tab>
        Reviews
        <v-rating
          v-model="avgRatingComputed"
          background-color="orange lighten-3"
          color="orange"
          dense
          half-increments
          readonly
        />
      </v-tab>

      <v-tab-item>
        <v-container v-if="productList">
          <v-row>
            <v-btn
              v-if="checkForStoreOwner"
              color="pink"
              dark
              class="ml-3"
              @click.stop="showProductDialogNew"
            >
              <v-icon left> mdi-plus </v-icon>Add Product</v-btn
            >
          </v-row>
          <v-row>
            <v-col
              v-for="prod in productList"
              :key="prod.productId"
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="3"
              xl="2"
            >
              <StoreProfileListItemNew
                :product="prod"
                :modifiable="checkForStoreOwner"
                @delete-product="removeProductFromArray"
                @edit-product="showProductDialogEdit"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <!--       <v-tab-item>

        <v-card flat>
          <v-card-text>
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi
              ac felis. Etiam feugiat lorem non metus. Sed a libero.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item> -->
      <v-tab-item>
        <div class="text-left">
          Average Rating:
          {{ this.avgRatingComputed }}
          ({{ profileData.reviews ? profileData.reviews.length : 0 }})
          <v-rating
            v-model="avgRatingComputed"
            background-color="orange lighten-3"
            color="orange"
            dense
            half-increments
            readonly
          />
        </div>
        <v-btn
          v-show="!addButtonHidden"
          absolute
          top
          right
          dark
          color="pink"
          @click.stop="showReviewDialogNew"
        >
          <v-icon>mdi-plus</v-icon>
          Add Review
        </v-btn>

        <ReviewDialog
          v-model="showReviewDialog"
          :review-to-edit="reviewToEdit"
          @add-new-review="addNewReviewToArray"
          @update-review="editExistingReview"
          @reviewToEdit-to-null="nullifyReviewToEdit"
          @change-reviewToEdit-rating="changeRatingReviewToEdit"
          @change-reviewToEdit-text="changeTextReviewToEdit"
        />
        <v-divider></v-divider>
        <div v-if="profileData.reviews">
          <StoreProfileReviewListItem
            v-for="rvw in computedReviews"
            :key="rvw.reviewId"
            :review="rvw"
            @remove-review="removeReviewfromArray"
            @edit-review="showReviewDialogEdit"
          />
        </div>
        <div v-if="profileData.reviews">
          <v-pagination
            v-if="profileData.reviews.length > reviewsPerPage"
            v-model="currentPage"
            :length="numOfPages"
          />
        </div>
      </v-tab-item>
    </v-tabs>
    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="128"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
/*
Aufbau:
Bilder, Titel und Beschreibung, Liste mit Produkten, Reviews
*/
// import fakeBackendDataStore from "../fakeBackend/storeProfileStore1.json";
// import fakeBackendDataProducts from "../fakeBackend/storeProfileProducts1.json";
//import storeData from "../fakeBackend/retailerMapInfo.json";
import { storeService } from "../services";

//import StoreProfileListItem from "../components/StoreProfileListItem";
import StoreProfileListItemNew from "../components/StoreProfileListItemNew";
import StoreProfileReviewListItem from "../components/StoreProfileReviewListItem";
import EditStoreDialog from "../components/EditStoreDialog";
import ReviewDialog from "../components/ReviewDialog";
import AddProductDialog from "../components/AddProductDialog";
import AddStoreImageDialog from "../components/AddStoreImageDialog";
import GoogleMapProfile from "../components/GoogleMapProfile";

//import axios from "axios";

import { mapState } from "vuex";

export default {
  name: "StoreProfileView",
  components: {
    //StoreProfileListItem: StoreProfileListItem,
    StoreProfileListItemNew: StoreProfileListItemNew,
    StoreProfileReviewListItem: StoreProfileReviewListItem,
    EditStoreDialog: EditStoreDialog,
    ReviewDialog: ReviewDialog,
    AddProductDialog: AddProductDialog,
    AddStoreImageDialog: AddStoreImageDialog,
    GoogleMapProfile: GoogleMapProfile,
  },

  data() {
    return {
      // profileData: storeData[0].profileData,
      // productList: storeData[0].profileData.products,
      editMode: false,
      overlay: false,
      profileData: {},
      productList: {},
      dataset: null,
      mapData: null,
      avgRating: 0,
      addButtonHidden: false,
      showEditStoreDialog: false,
      showReviewDialog: false,
      showProductDialog: false,
      showAddStoreImageDialog: false,
      tagsString: "",
      productToEdit: null,
      reviewToEdit: null,
      tagsComboBoxItems: [
        "Food",
        "Meat",
        "Beef",
        "Pork",
        "Chicken",
        "Beverages",
        "Wine",
        "Beer",
      ],
      //Pagination
      currentPage: 1,
      reviewsPerPage: 5,
    };
  },

  watch: {
    // overlay(val) {
    //   val &&
    //     setTimeout(() => {
    //       this.overlay = false;
    //     }, 1000);
    // }
  },

  computed: {
    ...mapState("account", ["user", "loggedIn"]),
    //Pagination:
    numOfPages() {
      return Math.ceil(this.profileData.reviews.length / this.reviewsPerPage);
    },
    computedReviews() {
      // if (this.offset > this.profileData.reviews.length) {
      //   this.currentPage = this.numOfPages;
      // }
      return this.profileData.reviews.slice(this.sliceStart, this.sliceEnd);
    },
    sliceStart() {
      return (this.currentPage - 1) * this.reviewsPerPage;
    },
    sliceEnd() {
      return this.sliceStart + this.reviewsPerPage;
    },
    checkForStoreOwner() {
      if (this.dataset != null) {
        if (this.user.email == this.dataset.userEmail) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    tagsComboBox: {
      get() {
        if (this.editMode == true) {
          return this.profileData.tags;
        } else {
          return [];
        }
      },
      set(value) {
        this.profileData.tags = value;
      },
    },
    avgRatingComputed: {
      get() {
        return Math.round(this.avgRating * 10) / 10;
      },
    },

    //...mapState("shoppingCart", ["shoppingCart", "counter"])
  },
  async mounted() {
    var id = this.$route.params.id;
    var response = await storeService.getSingleStore(id);
    console.log(response);
    this.dataset = response;
    this.mapData = response.mapData;
    console.log(this.mapData);
    this.profileData = response.profileData;
    this.productList = response.profileData.products;
    this.tagsString = this.profileData.tags.join(", ");
    this.avgRating = parseFloat(this.profileData.avgRating);
  },
  methods: {
    //...mapActions("shoppingCart", ["addProduct", "removeProduct"]),
    printData() {
      console.log(this.user.shoppingCart);
      console.log(this.user.productCounter);
      console.log(this.user.email);
      console.log(this.user);
      console.log("products:");
      console.log(this.profileData.products);
      console.log(this.$route.params);
      console.log(this.dataset);
      console.log(this.avgRating);
      console.log(Math.round(this.avgRating * 10) / 10);
      this.overlay = true;
    },
    saveStoreChanges: async function() {
      this.editMode = false;
      var payload = {
        storeId: this.$route.params.id,
        title: this.profileData.title,
        description: this.profileData.description,
        tags: this.profileData.tags,
      };
      var editResult = await storeService.editStore(payload);
      console.log(editResult);
    },
    submitEditStore: async function(data) {
      var payload = {
        storeId: this.$route.params.id,
        title: data.title,
        description: data.description,
        tags: data.tags,
        images: data.images,
      };
      this.overlay = true;
      var editResult = await storeService.editStore(payload);
      console.log(editResult);
      this.profileData.title = data.title;
      this.profileData.description = data.description;
      this.profileData.tags = data.tags;
      this.profileData.images = data.images;
      this.overlay = false;
    },
    // deleteImage: async function(index) {
    //   console.log(index);
    //   var payload = {
    //     imageSrc: this.profileData.images[index].src,
    //     title: this.profileData.images[index].title,
    //     imageId: this.profileData.images[index].id,
    //     storeId: this.$route.params.id
    //   };
    //   var deleteImageResult = await storeService.deleteStoreImage(payload);
    //   console.log(deleteImageResult);
    //   this.profileData.images.splice(index, 1);
    // },
    addNewImageToArray(newImage) {
      this.profileData.images.push(newImage);
    },
    addNewProductToArray(newProduct) {
      this.productList.push(newProduct);
    },
    addNewReviewToArray(newReview) {
      this.profileData.reviews.unshift(newReview.review);
      this.avgRating = parseFloat(newReview.avgRating);
    },
    editExistingReview(updatedReview) {
      var index = this.profileData.reviews.findIndex(
        (rv) => rv.reviewId === updatedReview.review.reviewId
      );
      this.profileData.reviews.splice(index, 1, updatedReview.review);
      this.avgRating = parseFloat(updatedReview.avgRating);
    },
    removeReviewfromArray(eventData) {
      var indexOfReview = this.profileData.reviews.findIndex(
        (r) => r.reviewId === eventData.reviewId
      );
      this.profileData.reviews.splice(indexOfReview, 1);
      this.avgRating = parseFloat(eventData.avgRating);
    },
    //Review Dialog
    showReviewDialogNew() {
      this.reviewToEdit = null;
      this.showReviewDialog = true;
    },
    showReviewDialogEdit(review) {
      this.reviewToEdit = review;
      this.showReviewDialog = true;
    },
    nullifyReviewToEdit() {
      this.reviewToEdit = null;
    },
    changeRatingReviewToEdit(rating) {
      this.reviewToEdit.rating = rating;
    },
    changeTextReviewToEdit(text) {
      this.reviewToEdit.text = text;
    },

    //Product Dialog
    showProductDialogNew() {
      this.productToEdit = null;
      this.showProductDialog = true;
    },
    showProductDialogEdit(product) {
      this.productToEdit = product;
      this.showProductDialog = true;
    },
    removeProductFromArray(productId) {
      var indexOfProduct = this.profileData.products.findIndex(
        (r) => r.productId === productId
      );
      this.profileData.products.splice(indexOfProduct, 1);
    },
    nullifyProductToEdit() {
      this.productToEdit = null;
    },
    changeTitleProductToEdit(value) {
      this.productToEdit.title = value;
    },
    editExistingProduct(updatedProduct) {
      var index = this.profileData.products.findIndex(
        (prd) => prd.productId === updatedProduct.productId
      );
      //replace array element
      this.profileData.products.splice(index, 1, updatedProduct);
    },
  },
};
</script>

<style>
.mainDiv {
  width: 80%;
  align-items: center;
  display: inline-block;
  margin-top: 30px;
  margin-bottom: 30px;
}
#titleDiv {
  width: 50%;
  margin: auto;
}
</style>
