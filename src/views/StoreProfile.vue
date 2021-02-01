<template>
  <div class="mainDiv">
    <div v-if="loadingStore === false && loadingErrorStore === false">
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
      <StoreProfileActivationSteps
        v-if="checkForStoreOwner"
        :storeActivationSteps="demoActivationSteps"
      />

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
      <v-row align="start" v-if="dataset">
        <v-col cols="12" xs="2" sm="2" md="1" lg="1" xl="1">
          <div
            v-for="(img, i) in dataset.profileData.images"
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
              v-if="dataset"
              v-model="currentImgIndex"
              show-arrows-on-hover
              height="400px"
              cycle
              hide-delimiters
            >
              <!--cycle @change="carouselImageChanged" eager-->
              <v-carousel-item
                v-for="(img, i) in dataset.profileData.images"
                :key="i"
              >
                <v-img :src="img.src" height="100%">
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
        <v-col cols="12" xs="5" sm="5" md="5" lg="6" xl="6" v-if="dataset">
          <div class="text-h4 mb-3">
            {{ dataset.profileData.title }}
          </div>
          <v-chip
            outlined
            class="ma-1"
            color="primary"
            v-for="(tag, index) in this.dataset.profileData.tags"
            :key="index"
            >{{ tag }}</v-chip
          >
          <div
            class="text-body-1 mt-4"
            v-html="dataset.profileData.description"
          />
          <!--  {{ profileData.description }}
        </div> -->
        </v-col>
      </v-row>
      <!-- </div> 
    <v-btn @click="printData">Print</v-btn>-->
      <EditStoreDialog
        v-if="checkForStoreOwner"
        v-model="showEditStoreDialog"
        :profileData="profileData"
        :mapData="mapData"
        v-on:edit-store="updateStoreData"
        v-on:overlay-start="startLoadingOverlay"
        v-on:overlay-end="endLoadingOverlay"
      />
      <StoreProductsTableDialog
        v-if="checkForStoreOwner"
        v-model="showStoreProductsTableDialog"
        :productList="productList"
        v-on:delete-product="removeProductFromArray"
        v-on:edit-product="showProductDialogEdit"
        v-on:add-product="showProductDialogNew"
        v-on:overlay-start="startLoadingOverlay"
        v-on:overlay-end="endLoadingOverlay"
        v-on:update-stock="updateStockAmount"
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

      <ProductDialog
        v-model="showProductDialog"
        :productToEdit="productToEdit"
        v-on:add-new-product="addNewProductToArray"
        v-on:update-product="editExistingProduct"
        v-on:productToEdit-to-null="nullifyProductToEdit"
        v-on:change-productToEdit-title="changeTitleProductToEdit"
        v-on:overlay-start="startLoadingOverlay"
        v-on:overlay-end="endLoadingOverlay"
        v-on:recalculate-max-price="recalculateMaxPriceValue"
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
          <div v-if="productList" class="mt-5">
            <!-- <v-card flat> -->
            <v-container>
              <v-row class="mb-4">
                <!-- <v-col cols="12" md="4" lg="3" xl="3"> -->
                <v-card flat width="30%" height="30px">
                  <v-text-field
                    v-model="productSearchTerm"
                    type="text"
                    label="Search for Product"
                    :append-outer-icon="'mdi-send'"
                    clear-icon="mdi-close-circle"
                    clearable
                    @click:clear="clearMessage"
                    @click:append-outer="searchProducts"
                    @keyup.enter="searchProducts"
                    dense
                  ></v-text-field>
                </v-card>
                <!--   </v-col>
            <v-col cols="12" md="1" lg="1" xl="1"> -->
                <v-menu
                  bottom
                  left
                  :nudge-bottom="10"
                  offset-y
                  max-width="250px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      color="primary"
                      class="ml-3"
                    >
                      <v-icon color="primary">mdi-sort</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list dense nav>
                      <v-list-item-group
                        v-model="selectedProductSort"
                        color="primary"
                      >
                        <v-list-item
                          v-for="(item, index) in sortTypes"
                          :key="index"
                          @click="sortListClicked(index)"
                          link
                        >
                          <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title class="text-left">
                              {{ item.type }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card>
                </v-menu>
                <!-- </v-col>
            <v-col cols="12" md="2" lg="2" xl="2"> -->
                <!--               <v-slider
                v-model="priceSlider"
                class="align-center"
                :max="max"
                :min="min"
                hide-details
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="priceSlider"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider> -->
                <v-card width="40%" class="ml-3">
                  <div class="text-body-2 text-left ml-1 mt-1">Price Range</div>
                  <v-range-slider
                    v-model="priceRange"
                    :max="maxValue"
                    :min="min"
                    hide-details
                    @change="searchProducts"
                    ><!-- @change="searchProducts" -->
                    <template v-slot:prepend>
                      <v-text-field
                        label="From:"
                        :value="priceRange[0]"
                        class="mt-0 pt-0 ml-1 inputPriceRange"
                        hide-details
                        single-line
                        type="number"
                        style="width: 45px"
                        @change="$set(priceRange, 0, $event)"
                      ></v-text-field>
                    </template>
                    <template v-slot:append>
                      <v-text-field
                        label="To:"
                        :value="priceRange[1]"
                        class="mt-0 pt-0 mr-1 inputPriceRange"
                        hide-details
                        single-line
                        type="number"
                        style="width: 45px"
                        @change="$set(priceRange, 1, $event)"
                      ></v-text-field>
                    </template>
                  </v-range-slider>
                </v-card>
                <v-col>
                  <v-btn
                    v-if="checkForStoreOwner"
                    @click.stop="showProductDialogNew"
                    color="pink"
                    dark
                    outlined
                    class="ml-3"
                  >
                    <v-icon left> mdi-plus </v-icon>Create Product</v-btn
                  >
                  <v-btn
                    v-if="checkForStoreOwner"
                    @click.stop="showProductTableDialog"
                    color="pink"
                    dark
                    outlined
                    class="ml-3"
                  >
                    <v-icon left> mdi-table-cog </v-icon>Table View</v-btn
                  >
                </v-col>
                <!-- </v-col> -->
              </v-row>
            </v-container>
            <!-- </v-card> -->
            <!--           <v-row class="mb-3">
            <v-btn
              v-if="checkForStoreOwner"
              @click.stop="showProductDialogNew"
              color="pink"
              dark
              outlined
              class="ml-3"
            >
              <v-icon left> mdi-plus </v-icon>Create Product</v-btn
            >
          </v-row> -->
            <div
              v-if="loadingProducts === false && loadingErrorProducts === false"
            >
              <v-row class="mb-2 ml-1 mr-1">
                <v-col
                  cols="12"
                  xs="6"
                  sm="6"
                  md="3"
                  lg="3"
                  xl="3"
                  v-for="prod in computedProducts"
                  v-bind:key="prod._id"
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

              <div v-if="productList.length > productsPerPage">
                <v-pagination
                  v-model="productsCurrentPage"
                  :length="numOfPagesProducts"
                />
              </div>
            </div>
            <div v-if="loadingProducts === true">
              <v-progress-circular
                :size="70"
                :width="7"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div v-if="loadingErrorProducts === true" class="text-body-1 ">
              We could not load the store's products, we're sorry.
            </div>
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
        <v-tab-item v-if="dataset">
          <v-row class="my-5">
            <div>
              <div class="text-left text-body-1 font-weight-bold ml-5">
                <!--  Average Rating:
            {{ this.avgRatingComputed }}
            ({{ profileData.reviews ? profileData.reviews.length : 0 }}) -->
                {{
                  dataset.profileData.reviews
                    ? dataset.profileData.reviews.length
                    : 0
                }}
                Reviews ({{ this.avgRatingComputed }})
              </div>
              <div class="text-left text-body-1 font-weight-bold ml-3">
                <v-rating
                  v-model="avgRatingComputed"
                  background-color="orange lighten-3"
                  color="orange"
                  dense
                  half-increments
                  readonly
                />
              </div>
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
          <div v-if="dataset.profileData.reviews">
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
          <div v-if="dataset.profileData.reviews">
            <v-pagination
              v-model="currentPage"
              :length="numOfPagesReviews"
              v-if="dataset.profileData.reviews.length > reviewsPerPage"
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
            <GoogleMapProfile :mapData="dataset.mapData" />
          </div>
        </v-col>
      </v-row>

      <v-overlay v-model="overlay">
        <v-progress-circular indeterminate size="80"></v-progress-circular>
      </v-overlay>
    </div>

    <div v-if="loadingStore === true">
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-if="loadingErrorStore === true" class="text-body-1 ">
      We could not load the store, we're sorry.
    </div>
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
import ProductDialog from "../components/ProductDialog";
import StoreProductsTableDialog from "../components/StoreProductsTableDialog";
import StoreProfileActivationSteps from "../components/StoreProfileActivationSteps";

//import AddStoreImageDialog from "../components/AddStoreImageDialog";
import GoogleMapProfile from "../components/GoogleMapProfile";

//import axios from "axios";

import { compareArrayAsc, compareArrayDesc } from "../helpers";

import { mapState } from "vuex";

export default {
  name: "StoreProfileView",
  components: {
    //StoreProfileListItem: StoreProfileListItem,
    StoreProfileListItemNew: StoreProfileListItemNew,
    StoreProfileReviewListItem: StoreProfileReviewListItem,
    EditStoreDialog: EditStoreDialog,
    ReviewDialog: ReviewDialog,
    ProductDialog: ProductDialog,
    StoreProductsTableDialog: StoreProductsTableDialog,
    StoreProfileActivationSteps: StoreProfileActivationSteps,
    //AddStoreImageDialog: AddStoreImageDialog,
    GoogleMapProfile: GoogleMapProfile
  },

  data() {
    return {
      // profileData: storeData[0].profileData,
      // productList: storeData[0].profileData.products,
      loadingStore: true,
      loadingProducts: true,
      loadingErrorStore: false,
      loadingErrorProducts: false,

      //store activation
      demoActivationSteps: {
        profileComplete: true,
        minOneProduct: true,
        shippingRegistered: true,
        paymentMethodRegistered: false
      },

      editMode: false,
      fab: false,
      overlay: false,
      //profileData: {},
      productList: [],
      dataset: null,
      mapData: {},
      profileData: {},
      avgRating: 0,
      addButtonHidden: false,
      showEditStoreDialog: false,
      showReviewDialog: false,
      showProductDialog: false,
      showAddStoreImageDialog: false,
      showProductAvailabilityNotificationDialog: false,
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
      //Product search and sort
      selectedProductSort: 0,
      productSearchTerm: "",
      sortTypes: [
        { type: "Date", icon: "mdi-sort-calendar-descending", tooltip: "" },
        { type: "Date", icon: "mdi-sort-calendar-ascending", tooltip: "" },
        {
          type: "Title",
          icon: "mdi-sort-alphabetical-descending",
          tooltip: ""
        },
        {
          type: "Title",
          icon: "mdi-sort-alphabetical-ascending",
          tooltip: ""
        },
        { type: "Price", icon: "mdi-sort-numeric-descending", tooltip: "" },
        { type: "Price", icon: "mdi-sort-numeric-ascending", tooltip: "" }
      ],
      //Price Slider
      priceRange: [0, 1000],
      min: 0,
      maxValue: 100000,

      //Table View:
      showStoreProductsTableDialog: false,

      //Pagination Products
      productsCurrentPage: 1,
      productsPerPage: 5,

      //Pagination Reviews
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
      //console.log(val);
      for (let i = 0; i < this.dataset.profileData.images.length; i++) {
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
    //Review Pagination
    numOfPagesReviews() {
      if (this.dataset) {
        return Math.ceil(
          this.dataset.profileData.reviews.length / this.reviewsPerPage
        );
      }
      return 0;
    },

    computedReviews() {
      // if (this.offset > this.profileData.reviews.length) {
      //   this.currentPage = this.numOfPages;
      // }
      if (this.dataset) {
        return this.dataset.profileData.reviews.slice(
          this.sliceStart,
          this.sliceEnd
        );
      }
      return [];
    },
    sliceStart() {
      return (this.currentPage - 1) * this.reviewsPerPage;
    },
    sliceEnd() {
      return this.sliceStart + this.reviewsPerPage;
    },

    //Product Pagination
    computedProducts() {
      return this.productList.slice(
        this.productsSliceStart,
        this.productsSliceEnd
      );
    },
    numOfPagesProducts() {
      if (this.dataset) {
        return Math.ceil(this.productList.length / this.productsPerPage);
      }
      return 0;
    },
    productsSliceStart() {
      return (this.productsCurrentPage - 1) * this.productsPerPage;
    },
    productsSliceEnd() {
      return this.productsSliceStart + this.productsPerPage;
    },

    checkPriceMax: {
      get() {
        if (this.productList.length > 0) {
          let max = this.productList.reduce(function(prev, curr) {
            return prev.price > curr.price ? prev : curr;
          });
          //console.log(max);Math.round(parseFloat(max.price))
          console.log(Math.round(parseFloat(max.price)));
          return Math.round(parseFloat(max.price));
        } else {
          return 0;
        }
      }
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
          return this.dataset.profileData.tags;
        } else {
          return [];
        }
      },
      set(value) {
        this.dataset.profileData.tags = value;
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
          for (var i = 0; i < this.dataset.profileData.reviews.length; i++) {
            if (
              this.dataset.profileData.reviews[i].userEmail === this.user.email
            ) {
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
    let id = this.$route.params.id;
    let responseStore;
    try {
      responseStore = await storeService.getSingleStore(id);
    } catch (error) {
      this.loadingErrorStore = true;
      this.loadingStore = false;
      return;
    }
    console.log("store:");
    console.log(responseStore);
    //Set data
    this.dataset = responseStore;
    this.mapData = responseStore.mapData;
    this.profileData = responseStore.profileData;
    this.tagsString = this.dataset.profileData.tags.join(", ");
    this.avgRating = parseFloat(this.dataset.profileData.avgRating);
    //end store loading
    this.loadingStore = false;

    //Fetch Products
    let data = { storeId: id };
    let responseProducts;
    try {
      responseProducts = await storeService.getStoreProducts(data);
    } catch (error) {
      this.loadingErrorProducts = true;
      this.loadingProducts = false;
      return;
    }
    this.productList = responseProducts;
    //Set Price Range
    this.setPriceRange();
    this.loadingProducts = false;
  },

  methods: {
    setPriceRange() {
      if (this.productList.length > 0) {
        let objct = this.productList.reduce(function(prev, curr) {
          return prev.priceFloat > curr.priceFloat ? prev : curr;
        });
        //console.log(max);Math.round(parseFloat(max.price))
        //console.log(Math.round(parseFloat(max.price)));
        this.maxValue = Math.round(parseFloat(objct.priceFloat));
        this.priceRange[1] = this.maxValue;
        console.log(this.maxValue);
      }
    },
    //...mapActions("shoppingCart", ["addProduct", "removeProduct"]),
    printData() {
      console.log(this.user.shoppingCart);
      console.log(this.user.productCounter);
      console.log(this.user.email);
      console.log(this.user);
      console.log("products:");
      console.log(this.dataset.profileData.products);
      console.log(this.$route.params);
      console.log(this.dataset);
      console.log(this.avgRating);
      console.log(Math.round(this.avgRating * 10) / 10);
      this.drawer = true;
      //this.overlay = true;
    },

    //at click on a mini img, change the current image
    changeImages(index) {
      this.currentImgIndex = index;
    },
    //When a product was changed, recalculate the max price value
    recalculateMaxPriceValue() {
      if (this.productList.length > 0) {
        let maxValue = Math.max.apply(
          Math,
          this.productList.map(function(o) {
            return o.priceFloat;
          })
        );
        this.maxValue = Math.round(parseFloat(maxValue));
        this.priceRange[1] = this.maxValue;
      }
    },

    //update the store values which come from the edit store dialog's event
    updateStoreData: async function(data) {
      this.dataset.profileData.title = data.title;
      this.dataset.profileData.description = data.description;
      this.dataset.profileData.tags = data.tags;
      this.dataset.profileData.images = data.images;

      this.dataset.mapData.address.addressLine1 = data.address.addressLine1;
      this.dataset.mapData.address.postcode = data.address.postcode;
      this.dataset.mapData.address.city = data.address.city;
      this.dataset.mapData.address.country = data.address.country;
      this.dataset.mapData.mapIcon = data.mapIcon;

      this.dataset.mapData.location.lat = data.location.lat;
      this.dataset.mapData.location.lng = data.location.lng;
      this.overlay = false;
    },

    addNewImageToArray(newImage) {
      this.dataset.profileData.images.push(newImage);
    },
    addNewProductToArray(newProduct) {
      this.productList.unshift(newProduct);
    },
    addNewReviewToArray(newReview) {
      this.dataset.profileData.reviews.unshift(newReview.review);
      this.avgRating = parseFloat(newReview.avgRating);
    },
    editExistingReview(updatedReview) {
      var index = this.dataset.profileData.reviews.findIndex(
        rv => rv.reviewId === updatedReview.review.reviewId
      );
      this.dataset.profileData.reviews.splice(index, 1, updatedReview.review);
      this.avgRating = parseFloat(updatedReview.avgRating);
    },
    removeReviewfromArray(eventData) {
      var indexOfReview = this.dataset.profileData.reviews.findIndex(
        r => r.reviewId === eventData.reviewId
      );
      this.dataset.profileData.reviews.splice(indexOfReview, 1);
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
    showProductTableDialog() {
      this.showStoreProductsTableDialog = true;
    },
    showProductDialogEdit(product) {
      this.productToEdit = product;
      this.showProductDialog = true;
    },
    removeProductFromArray(_id) {
      var indexOfProduct = this.productList.findIndex(r => r._id === _id);
      this.productList.splice(indexOfProduct, 1);
    },
    nullifyProductToEdit() {
      this.productToEdit = null;
    },
    changeTitleProductToEdit(value) {
      this.productToEdit.title = value;
    },
    editExistingProduct(updatedProduct) {
      console.log(updatedProduct);
      var index = this.productList.findIndex(
        prd => prd._id === updatedProduct._id
      );
      //replace array element
      this.productList.splice(index, 1, updatedProduct);
    },
    updateStockAmount(_id, stockAmount) {
      var indexOfProduct = this.productList.findIndex(prd => prd._id === _id);
      this.productList[indexOfProduct].stockAmount = stockAmount;
    },
    //Overlay
    startLoadingOverlay() {
      this.overlay = true;
    },
    endLoadingOverlay() {
      this.overlay = false;
    },

    async clearMessage() {
      this.productSearchTerm = "";
      let data = {
        storeId: this.$route.params.id
      };
      this.productList = await storeService.getStoreProducts(data);
    },
    sortListClicked(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.productList.sort(compareArrayDesc("datetimeCreated"));
          break;
        case 1:
          this.productList.sort(compareArrayAsc("datetimeCreated"));
          break;
        case 2:
          this.productList.sort(compareArrayDesc("title"));
          break;
        case 3:
          this.productList.sort(compareArrayAsc("title"));
          break;
        case 4:
          this.productList.sort(compareArrayDesc("priceFloat"));
          break;
        case 5:
          this.productList.sort(compareArrayAsc("priceFloat"));
          break;
      }
    },
    async searchProducts() {
      console.log(this.priceRange[1]);
      console.log(this.maxValue);
      let data = {
        storeId: this.$route.params.id,
        searchTerm: this.productSearchTerm
      };
      if (
        this.priceRange[0] !== this.min ||
        this.priceRange[1] !== this.maxValue
      ) {
        data["priceMin"] = this.priceRange[0];
        data["priceMax"] = this.priceRange[1];
      }
      console.log(data);
      this.productList = await storeService.getStoreProducts(data);
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
.inputPriceRange input[type="number"] {
  -moz-appearance: textfield;
}
.inputPriceRange input::-webkit-outer-spin-button,
.inputPriceRange input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
