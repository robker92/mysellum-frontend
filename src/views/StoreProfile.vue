<template>
  <div class="mainDiv">
    <div v-if="loadingStore === false && loadingErrorStore === false">
      <div v-if="checkForStoreOwner" class="text-left text-h5">
        Administration:
      </div>

      <div v-if="checkForStoreOwner" class="text-right">
        <v-btn color="pink" outlined dark @click="showEditStoreDialog = true">
          <v-icon left color="pink">mdi-pencil</v-icon>
          Edit Store
        </v-btn>
      </div>

      <StoreProfileActivationSteps
        v-if="checkForStoreOwner"
        :storeActivationSteps="demoActivationSteps"
        class="ml-2"
      />

      <v-divider v-if="checkForStoreOwner" class="my-2" />
      <v-row>
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="cyan accent-4"
              class="btnNoHover"
              :ripple="false"
            >
              <v-icon>mdi-hand-heart</v-icon>
            </v-btn>
          </template>
          <span>Offers self pickup</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              :ripple="false"
              color="cyan accent-4"
              class="btnNoHover"
            >
              <v-icon>mdi-truck-delivery</v-icon>
            </v-btn>
          </template>
          <span>Offers delivery</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" :ripple="false" @click="print">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>Add to favorites</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" :ripple="false" @click="print">
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </template>
          <span>Bookmark</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" :ripple="false" @click="print">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <span>Share</span>
        </v-tooltip>
      </v-row>

      <!--  -->
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
                </v-img>
              </v-carousel-item>
            </v-carousel>
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
        </v-col>
      </v-row>

      <EditStoreDialog
        v-if="checkForStoreOwner"
        v-model="showEditStoreDialog"
        :profileData="profileData"
        :mapData="mapData"
        :paypalSignupLink="paypalSignupLink"
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
                <v-card width="40%" class="ml-3" height="63px">
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
                        style="width: 40px"
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
                        style="width: 40px"
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
              </v-row>
            </v-container>
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
                  xl="2"
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
        <v-tab-item v-if="dataset">
          <v-row class="my-5">
            <div>
              <div class="text-left text-body-1 font-weight-bold ml-5">
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
          <div
            v-if="dataset.profileData.reviews.length === 0"
            class="text-body-1 text-left"
          >
            There are no reviews for this store yet. Why don't you leave the
            first one?
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
// Store Profile
import StoreProfileListItemNew from "../components/storeProfileComponents/StoreProfileListItemNew";
import StoreProfileReviewListItem from "../components/storeProfileComponents/StoreProfileReviewListItem";
import StoreProductsTableDialog from "../components/storeProfileComponents/StoreProductsTableDialog";
import StoreProfileActivationSteps from "../components/storeProfileComponents/StoreProfileActivationSteps";
import GoogleMapProfile from "../components/storeProfileComponents/GoogleMapProfile";
import ProductDialog from "../components/storeProfileComponents/ProductDialog";
import ReviewDialog from "../components/storeProfileComponents/ReviewDialog";

// Edit Store
import EditStoreDialog from "../components/editStoreDialogComponents/EditStoreDialog";

// Others
import { compareArrayAsc, compareArrayDesc } from "../helpers";
import { storeService } from "../services";
import { mapState } from "vuex";

export default {
  name: "StoreProfileView",
  components: {
    StoreProfileListItemNew: StoreProfileListItemNew,
    StoreProfileReviewListItem: StoreProfileReviewListItem,
    EditStoreDialog: EditStoreDialog,
    ReviewDialog: ReviewDialog,
    ProductDialog: ProductDialog,
    StoreProductsTableDialog: StoreProductsTableDialog,
    StoreProfileActivationSteps: StoreProfileActivationSteps,
    GoogleMapProfile: GoogleMapProfile
  },

  data() {
    return {
      loadingStore: true,
      loadingProducts: true,
      loadingErrorStore: false,
      loadingErrorProducts: false,

      // paypal
      paypalSignupLink: "",

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

    if (this.dataset.payment.paypal) {
      this.paypalSignupLink = this.dataset.payment.paypal.urls.actionUrl.href;
    }
    console.log(this.paypalSignupLink);
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
        this.maxValue = Math.ceil(parseFloat(objct.priceFloat));
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
      let index = this.dataset.profileData.reviews.findIndex(
        rv => rv.reviewId === updatedReview.review.reviewId
      );
      this.dataset.profileData.reviews.splice(index, 1, updatedReview.review);
      this.avgRating = parseFloat(updatedReview.avgRating);
    },
    removeReviewfromArray(eventData) {
      let indexOfReview = this.dataset.profileData.reviews.findIndex(
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
