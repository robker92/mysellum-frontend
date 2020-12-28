<template>
  <div class="mainDiv">
    <!-- <p>{{ $t("translation1") }}</p> -->
    <!-- <v-speed-dial
      v-if="checkForStoreOwner"
      absolute
      top
      right
      v-model="fab"
      direction="bottom"
      :open-on-hover="true"
      transition="scale-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="pink" dark fab small>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="orange">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn color="pink" outlined @click="showEditStoreDialog = true">
        <v-icon color="pink">mdi-pencil</v-icon>
        Edit Store
      </v-btn>
    </v-speed-dial> -->

    <!-- <div v-if="checkForStoreOwner"> -->
    <div v-if="checkForStoreOwner" class="text-right">
      <v-btn color="pink" outlined dark @click="showEditStoreDialog = true">
        <v-icon left color="pink">mdi-pencil</v-icon>
        Edit Store
      </v-btn>
    </div>
    <!--       <v-btn
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
      </v-btn> -->
    <!--       <v-btn
        v-if="editMode == true"
        color="indigo"
        icon
        outlined
        @click="saveStoreChanges"
      >
        <v-icon color="indigo">mdi-content-save</v-icon>
      </v-btn> -->
    <!-- </div> -->
    <!--  <div v-if="editMode">
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
    <div v-else> -->
    <!--style="width:500px;" 
    style="border-style: solid; border: 2px solid black; border-radius: 6px;"-->
    <v-row align="start">
      <v-col cols="12" xs="2" sm="2" md="1" lg="1" xl="1">
        <div
          v-for="(img, i) in profileData.images"
          :id="'imageDiv' + i"
          :key="i"
          class="mb-2"
          :style="
            i === 0
              ? 'border: 2px solid black; border-radius: 6px; opacity: 1;'
              : 'opacity: 0.5;'
          "
        >
          <v-card flat @click="changeImages(i)" :id="'imageCard' + i">
            <v-img
              :src="img.src"
              :aspect-ratio="4 / 3"
              max-width="100px"
              max-height="100px"
              class="rounded"
            />
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" xs="5" sm="5" md="5" lg="5" xl="5">
        <v-card flat>
          <v-carousel
            v-if="profileData"
            v-model="currentImgIndex"
            show-arrows-on-hover
            height="400px"
            hide-delimiters
          >
            <!--cycle @change="carouselImageChanged" -->
            <v-carousel-item
              v-for="(img, i) in profileData.images"
              :key="i"
              eager
            >
              <v-img :src="img.src" height="100%" eager>
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-2"
                    ></v-progress-circular>
                  </v-row>
                </template>
                <!--                 <v-container fill-height fluid pa-0 ma-0 pb-3>
                  <v-layout fill-height align-start pb-4 mb-4>
                    <v-flex xs12>
                      <v-card color="white" flat class="pa-2">
                        <span class="headline white--text" v-text="img.title">
                        </span>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container> -->
              </v-img>
            </v-carousel-item>
          </v-carousel>
          <!-- <v-card-title>
            {{ img.title }}
          </v-card-title> -->
        </v-card>
      </v-col>
      <v-col cols="12" xs="5" sm="5" md="5" lg="6" xl="6">
        <div class="text-h4 mb-3" v-if="profileData">
          {{ profileData.title }}
        </div>
        <v-chip
          outlined
          class="ma-1"
          color="primary"
          v-for="(tag, index) in this.profileData.tags"
          :key="index"
          >{{ tag }}</v-chip
        >
        <div
          class="text-body-1 mt-4"
          v-if="profileData"
          v-html="profileData.description"
        />
        <!--  {{ profileData.description }}
        </div> -->
      </v-col>
    </v-row>
    <!-- </div> -->
    <v-btn @click="printData">Print</v-btn>
    <EditStoreDialog
      v-model="showEditStoreDialog"
      :profileData="profileData"
      :mapData="mapData"
      v-on:edit-store="submitEditStore"
      v-on:overlay-start="startLoadingOverlay"
      v-on:overlay-end="endLoadingOverlay"
    />
    <!--  <v-divider /> -->
    <!-- <div v-if="editMode" id="titleDiv">
      <v-btn @click="showAddStoreImageDialog = true">Add Image</v-btn>
      <AddStoreImageDialog
        v-model="showAddStoreImageDialog"
        v-on:add-store-image="addNewImageToArray"
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
    <div v-else> -->
    <!--     <div class="text-h4" v-if="profileData">{{ profileData.title }}</div>
    <div class="text-body-1" v-if="profileData">
      {{ profileData.description }}
    </div>
    <v-chip
      outlined
      class="ma-1"
      color="primary"
      v-for="(tag, index) in this.profileData.tags"
      :key="index"
      >{{ tag }}</v-chip
    > -->
    <!--  </div>

    <v-container v-if="productList">
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
      :productToEdit="productToEdit"
      v-on:add-new-product="addNewProductToArray"
      v-on:update-product="editExistingProduct"
      v-on:productToEdit-to-null="nullifyProductToEdit"
      v-on:change-productToEdit-title="changeTitleProductToEdit"
      v-on:overlay-start="startLoadingOverlay"
      v-on:overlay-end="endLoadingOverlay"
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
        <div v-if="productList">
          <v-row>
            <v-btn
              v-if="checkForStoreOwner"
              @click.stop="showProductDialogNew"
              color="pink"
              dark
              outlined
              class="ml-3"
            >
              <v-icon left> mdi-plus </v-icon>Add Product</v-btn
            >
          </v-row>
          <v-row>
            <v-col
              cols="12"
              xs="6"
              sm="6"
              md="3"
              lg="3"
              xl="3"
              v-for="prod in productList"
              v-bind:key="prod.productId"
            >
              <StoreProfileListItemNew
                v-bind:product="prod"
                v-bind:modifiable="checkForStoreOwner"
                v-on:delete-product="removeProductFromArray"
                v-on:edit-product="showProductDialogEdit"
                v-on:overlay-start="startLoadingOverlay"
                v-on:overlay-end="endLoadingOverlay"
                v-on:update-stock="updateStockAmount"
              />
            </v-col>
          </v-row>
        </div>
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
        <v-row>
          <div class="text-left text-body-1 font-weight-bold ml-5">
            Average Rating:
            {{ this.avgRatingComputed }}
            ({{ profileData.reviews ? profileData.reviews.length : 0 }})
            {{ profileData.reviews ? profileData.reviews.length : 0 }} Reviews
            ({{ this.avgRatingComputed }})
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
            @click.stop="showReviewDialogNew"
            v-show="!addButtonHidden"
            dark
            color="pink"
            class="ml-5"
            :disabled="reviewButtonDisabled"
          >
            <v-icon>mdi-plus</v-icon>
            Add Review
          </v-btn>
        </v-row>
        <!--            absolute
        reviewButtonDisabled
        checkAddReviewButtonDisabled
        reviewButtonDisabled
            top
            right -->
        <ReviewDialog
          v-model="showReviewDialog"
          :reviewToEdit="reviewToEdit"
          v-on:add-new-review="addNewReviewToArray"
          v-on:update-review="editExistingReview"
          v-on:reviewToEdit-to-null="nullifyReviewToEdit"
          v-on:change-reviewToEdit-rating="changeRatingReviewToEdit"
          v-on:change-reviewToEdit-text="changeTextReviewToEdit"
          v-on:overlay-start="startLoadingOverlay"
          v-on:overlay-end="endLoadingOverlay"
        />
        <!-- <v-divider></v-divider> -->
        <div v-if="profileData.reviews">
          <StoreProfileReviewListItem
            v-for="rvw in computedReviews"
            v-bind:key="rvw.reviewId"
            v-bind:review="rvw"
            v-on:remove-review="removeReviewfromArray"
            v-on:edit-review="showReviewDialogEdit"
            v-on:overlay-start="startLoadingOverlay"
            v-on:overlay-end="endLoadingOverlay"
          />
        </div>
        <div v-if="profileData.reviews">
          <v-pagination
            v-model="currentPage"
            :length="numOfPages"
            v-if="profileData.reviews.length > reviewsPerPage"
          />
        </div>
      </v-tab-item>
    </v-tabs>
    <v-divider class="my-3" />
    <!--  <div class="text-left text-">
      Payment Methods:
    </div> -->
    <v-card class="mx-auto mb-5" v-if="dataset" flat>
      <v-card-title>Payment Methods</v-card-title>
      <v-img src="../assets/payment-methods-logo.jpg" width="500px" />
    </v-card>
    <v-divider />
    <v-row>
      <v-col cols="12" lg="6">
        <v-card class="mx-auto" max-width="344" flat v-if="dataset">
          <v-card-title>Address</v-card-title>
          <v-card-text>
            <div>
              Store GmbH
            </div>
            <div>
              {{ dataset.mapData.address.addressLine1 }}
            </div>
            <!-- {{ dataset.mapData.address.houseNumber }} -->
            <div>
              {{ dataset.mapData.address.city }}
              {{ dataset.mapData.address.postcode }}
            </div>
            <div>
              Lat: {{ dataset.mapData.location.lat }} Lng:
              {{ dataset.mapData.location.lng }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <div v-if="dataset" height="200px">
          <GoogleMapProfile :mapData="mapData" />
        </div>
      </v-col>
    </v-row>

    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="80"></v-progress-circular>
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
//import AddStoreImageDialog from "../components/AddStoreImageDialog";
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
    //AddStoreImageDialog: AddStoreImageDialog,
    GoogleMapProfile: GoogleMapProfile
  },

  data() {
    return {
      // profileData: storeData[0].profileData,
      // productList: storeData[0].profileData.products,
      editMode: false,
      fab: false,
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
        "Beer"
      ],
      currentImgIndex: 0,
      //reviewButtonDisabled: false,
      //Pagination
      currentPage: 1,
      reviewsPerPage: 5
    };
  },

  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    },
    currentImgIndex(val) {
      console.log(val);
      for (let i = 0; i < this.profileData.images.length; i++) {
        if (val !== i) {
          //styles for other images
          document.getElementById(`imageDiv${i}`).style = "none";
          document.getElementById(`imageDiv${i}`).style.opacity = "0.5";
        }
      }
      //styles for chosen image
      document.getElementById(`imageDiv${val}`).style.border =
        "2px solid black";
      document.getElementById(`imageDiv${val}`).style.borderRadius = "6px";
      document.getElementById(`imageDiv${val}`).style.opacity = "1";
    }
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
      //check if the store owner is viewing his own store
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
      }
    },
    avgRatingComputed: {
      get() {
        return Math.round(this.avgRating * 10) / 10;
      }
    },
    reviewButtonDisabled: {
      //Add Review Button disabled if a review was already submitted by this user
      get() {
        if (this.loggedIn === false) {
          //if no user logged in -> disabled = true
          return true;
        } else if (this.checkForStoreOwner === true) {
          //if store owner -> disabled = true
          return true;
        } else if (this.reviewAlreadySubmitted === true) {
          //if review already submitted -> disabled = true
          return true;
        }
        return false;
      }
    },
    reviewAlreadySubmitted: {
      //check if logged in user already submitted a review for this store
      get() {
        if (this.dataset != null) {
          for (var i = 0; i < this.profileData.reviews.length; i++) {
            if (this.profileData.reviews[i].userEmail === this.user.email) {
              return true;
            }
          }
        }
        return false;
      }
    }

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
    //Check if a user already submitted a review
    // for (var i = 0; i < response.profileData.reviews.length; i++) {
    //   if (response.profileData.reviews[i].userEmail === this.user.email) {
    //     this.reviewButtonDisabled = true;
    //   }
    // }
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
      this.drawer = true;
      //this.overlay = true;
    },

    // carouselImageChanged(index) {
    //   for (let i = 0; i < this.profileData.images.length; i++) {
    //     if (index !== i) {
    //       //styles for other images
    //       document.getElementById(`imageDiv${i}`).style = "none";
    //       document.getElementById(`imageDiv${i}`).style.opacity = "0.6";
    //     }
    //   }
    //   //styles for chosen image
    //   document.getElementById(`imageDiv${index}`).style.border =
    //     "2px solid black";
    //   document.getElementById(`imageDiv${index}`).style.borderRadius = "6px";
    //   document.getElementById(`imageDiv${index}`).style.opacity = "1";
    // },

    changeImages(index) {
      // console.log(evt.target.id.slice(-1));
      // console.log(this.currentImgIndex);
      //this.currentImgIndex = parseInt(evt.target.id.slice(-1));
      this.currentImgIndex = index;
      //console.log(this.currentImgIndex);
    },

    /*     saveStoreChanges: async function() {
      this.editMode = false;
      var payload = {
        storeId: this.$route.params.id,
        title: this.profileData.title,
        description: this.profileData.description,
        tags: this.profileData.tags
      };
      var editResult = await storeService.editStore(payload);
      console.log(editResult);
    }, */
    submitEditStore: async function(data) {
      /*       var payload = {
        storeId: this.$route.params.id,
        title: data.title,
        description: data.description,
        tags: data.tags,
        images: data.images
      };
      this.overlay = true;
      var editResult = await storeService.editStore(payload); */
      //console.log(editResult);
      this.profileData.title = data.title;
      this.profileData.description = data.description;
      this.profileData.tags = data.tags;
      this.profileData.images = data.images;

      this.mapData.address.addressLine1 = data.address.addressLine1;
      this.mapData.address.postcode = data.address.postcode;
      this.mapData.address.city = data.address.city;
      this.mapData.location.lat = data.location.lat;
      this.mapData.location.lng = data.location.lng;
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
        rv => rv.reviewId === updatedReview.review.reviewId
      );
      this.profileData.reviews.splice(index, 1, updatedReview.review);
      this.avgRating = parseFloat(updatedReview.avgRating);
    },
    removeReviewfromArray(eventData) {
      var indexOfReview = this.profileData.reviews.findIndex(
        r => r.reviewId === eventData.reviewId
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
        r => r.productId === productId
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
      console.log(updatedProduct);
      var index = this.profileData.products.findIndex(
        prd => prd.productId === updatedProduct.productId
      );
      //replace array element
      this.profileData.products.splice(index, 1, updatedProduct);
    },

    updateStockAmount(productId, stockAmount) {
      var indexOfProduct = this.profileData.products.findIndex(
        r => r.productId === productId
      );
      this.profileData.products[indexOfProduct].stockAmount = stockAmount;
    },
    //Overlay
    startLoadingOverlay() {
      this.overlay = true;
    },
    endLoadingOverlay() {
      this.overlay = false;
    }
  }
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
