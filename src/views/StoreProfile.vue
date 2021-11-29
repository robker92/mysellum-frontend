<template>
  <div class="mainDiv">
    <div v-if="loadingStore === false && loadingErrorStore === false">
      <div v-if="checkForStoreOwner" class="text-left text-h5">
        {{ $t("storeProfile.administrationHeadline") }}
      </div>

      <div v-if="checkForStoreOwner" class="text-right">
        <v-btn
          color="editStore"
          outlined
          dark
          @click="showEditStoreDialog = true"
        >
          <v-icon left color="editStore">mdi-pencil</v-icon>
          {{ $t("storeProfile.editStoreButtonLabel") }}
        </v-btn>
      </div>

      <StoreProfileActivationSteps
        v-if="checkForStoreOwner"
        :store-activation-steps="dataset.activationSteps"
        class="ml-2"
      />

      <v-divider v-if="checkForStoreOwner" class="my-3" />
      <div v-if="checkForStoreOwner" class="mt-3">&nbsp;</div>
      <span v-if="checkForStoreOwner" class="mb-3"> </span>

      <v-row class="mb-3 mx-1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              v-if="storeOpened"
              v-bind="attrs"
              class="ma-0 mr-3"
              color="green"
              text-color="white"
              v-on="on"
              @click="$vuetify.goTo($refs.openingHours, scrollingOptions)"
            >
              {{ $t("storeProfile.openedBadge") }}
            </v-chip>
            <v-chip
              v-else
              v-bind="attrs"
              class="ma-0 mr-3"
              v-on="on"
              @click="$vuetify.goTo($refs.openingHours, scrollingOptions)"
            >
              <v-icon left>mdi-close</v-icon>
              {{ $t("storeProfile.closedBadge") }}
            </v-chip>
          </template>
          <span v-if="storeOpened">
            {{ $t("storeProfile.openedBadgeTooltip") }}
          </span>
          <span v-else>{{ $t("storeProfile.closedBadgeTooltip") }}</span>
        </v-tooltip>

        <v-divider vertical />

        <v-tooltip v-if="dataset.pickup" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip v-bind="attrs" class="ma-0 ml-3 primary" outlined v-on="on">
              <v-icon left color="primary">mdi-hand-heart</v-icon>
              {{ $t("storeProfile.pickupBadgeLabel") }}
            </v-chip>
          </template>
          <span>
            {{ $t("storeProfile.pickupBadgeTooltip") }}
          </span>
        </v-tooltip>

        <v-tooltip v-if="dataset.delivery" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip v-bind="attrs" class="ma-0 ml-3 primary" outlined v-on="on">
              <v-icon left color="primary">mdi-truck-delivery</v-icon>
              {{ $t("storeProfile.deliveryBadgeLabel") }}
            </v-chip>
          </template>
          <span>
            {{ $t("storeProfile.deliveryBadgeTooltip") }}
          </span>
        </v-tooltip>

        <v-spacer />

        <div v-if="!checkForStoreOwner">
          <v-tooltip v-if="!checkFavoriteStore || loggedIn === false" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                :ripple="false"
                v-on="on"
                @click="addFavorites()"
              >
                <v-icon color="pink">mdi-heart-outline</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t("storeProfile.addToFavorites") }}
            </span>
          </v-tooltip>

          <v-tooltip v-if="checkFavoriteStore && loggedIn === true" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                :ripple="false"
                v-on="on"
                @click="removeFavorites()"
              >
                <v-icon color="pink">mdi-heart</v-icon>
              </v-btn>
            </template>
            <span>
              {{ $t("storeProfile.removeFromFavorites") }}
            </span>
          </v-tooltip>
        </div>

        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" :ripple="false" v-on="on" @click="print">
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </template>
          <span>Bookmark</span>
        </v-tooltip> -->

        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" :ripple="false" v-on="on" @click="print">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <span>Share</span>
        </v-tooltip> -->

        <v-speed-dial
          v-model="fab2"
          direction="bottom"
          open-on-hover
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab2" icon color="primary" dark>
              <v-icon v-if="fab2">
                mdi-close
              </v-icon>
              <v-icon v-else>
                mdi-share-variant
              </v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="green">
            <ShareNetwork
              network="whatsapp"
              :url="getCurrentURL()"
              title="Mysellum store"
              :description="
                `Check out this store ${dataset.profileData.title}!`
              "
            >
              <v-icon color="white">mdi-whatsapp</v-icon>
            </ShareNetwork>
          </v-btn>
          <v-btn fab dark small color="#3b5998">
            <ShareNetwork
              network="facebook"
              :url="getCurrentURL()"
              title="Awesome Article"
              description="This is an awesome article for awesome readers"
              hashtags="Frontend, Programming"
            >
              <v-icon color="white">mdi-facebook</v-icon>
            </ShareNetwork>
          </v-btn>
          <v-btn fab dark small color="#0072b1">
            <ShareNetwork
              network="linkedin"
              :url="getCurrentURL()"
              title="Awesome Article"
            >
              <v-icon color="white">mdi-linkedin</v-icon>
            </ShareNetwork>
          </v-btn>
          <!-- <v-btn fab dark small color="red">
            <ShareNetwork
              network="instagram"
              :url="getCurrentURL()"
              title="Awesome Article"
              description="This is an awesome article for awesome readers"
              hashtags="Frontend, Programming"
            >
              <v-icon color="white">mdi-instagram</v-icon>
            </ShareNetwork>
          </v-btn> -->
          <v-btn fab dark small color="#1DA1F2">
            <ShareNetwork
              network="twitter"
              :url="getCurrentURL()"
              title="Awesome Article"
              hashtags="Frontend, Programming"
            >
              <v-icon color="white">mdi-twitter</v-icon>
            </ShareNetwork>
          </v-btn>
        </v-speed-dial>
      </v-row>

      <!--  -->
      <v-row v-if="dataset" align="start">
        <v-col cols="12" xs="1" sm="2" md="2" lg="1" xl="1">
          <div
            v-for="(img, i) in dataset.profileData.images"
            :id="'imageDiv' + i"
            :key="i"
            class="mb-2"
            :style="
              i === 0
                ? 'border: 2px solid black; border-radius: 6px; opacity: 1; max-width: 100px; max-height: 100px;'
                : 'opacity: 0.5; max-width: 100px; max-height: 100px;'
            "
          >
            <v-card :id="'imageCard' + i" flat @click="changeImages(i)">
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
        <v-col cols="12" xs="5" sm="10" md="10" lg="5" xl="5">
          <v-card flat>
            <v-carousel
              v-if="dataset"
              v-model="currentImgIndex"
              height="400px"
              cycle
              hide-delimiters
              :show-arrows-on-hover="dataset.profileData.images.length > 1"
              :show-arrows="dataset.profileData.images.length > 1"
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
        <v-col v-if="dataset" cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
          <div class="text-h4 mb-3">
            {{ dataset.profileData.title }}
          </div>
          <v-chip
            v-for="(tag, index) in dataset.profileData.tags"
            :key="index"
            outlined
            class="ma-1"
            color="primary"
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
        :profile-data="profileData"
        :map-data="mapData"
        :shipping-data="shippingData"
        :paypal-signup-link="paypalSignupLink"
        :opening-hours-data="openingHoursData"
        @edit-store="updateStoreData"
        @overlay-start="startLoadingOverlay"
        @overlay-end="endLoadingOverlay"
      />
      <StoreProductsTableDialog
        v-if="checkForStoreOwner"
        v-model="showStoreProductsTableDialog"
        :product-list="productList"
        @delete-product="removeProductFromArray"
        @edit-product="showProductDialogEdit"
        @add-product="showProductDialogNew"
        @overlay-start="startLoadingOverlay"
        @overlay-end="endLoadingOverlay"
        @update-stock="updateStockAmount"
      />

      <ProductDialog
        v-model="showProductDialog"
        :product-to-edit="productToEdit"
        @add-new-product="addNewProductToArray"
        @update-product="editExistingProduct"
        @productToEdit-to-null="nullifyProductToEdit"
        @change-productToEdit-title="changeTitleProductToEdit"
        @overlay-start="startLoadingOverlay"
        @overlay-end="endLoadingOverlay"
        @recalculate-max-price="recalculateMaxPriceValue"
      />

      <StoreProfileProductDetailDialog
        v-model="showProductDetailDialog"
        :product="productToShowDetails"
        :modifiable="checkForStoreOwner"
        @overlay-start="startLoadingOverlay"
        @overlay-end="endLoadingOverlay"
        @update-stock="updateStockAmount"
      />

      <v-tabs color="primary" class="mt-3" right icons-and-text centered>
        <v-tab>
          {{ $t("storeProfile.productsTabHeadline") }}
          <v-icon left>
            mdi-format-list-bulleted
          </v-icon>
        </v-tab>
        <v-tab>
          {{ $t("storeProfile.reviewsTabHeadline") }}
          <v-rating
            v-model="avgRatingComputed"
            background-color="orange lighten-3"
            color="orange"
            dense
            half-increments
            readonly
          />
          ({{ reviewList ? reviewList.length : 0 }})
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
                    dense
                    @click:clear="clearMessage"
                    @click:append-outer="searchProducts"
                    @keyup.enter="searchProducts"
                  ></v-text-field>
                </v-card>
                <!--   </v-col>
            <v-col cols="12" md="1" lg="1" xl="1"> -->
                <v-menu bottom left :nudge-bottom="10" offset-y width="400px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      outlined
                      color="primary"
                      class="ml-3"
                      v-on="on"
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
                          link
                          @click="sortListClicked(index)"
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

                <!-- FILTER MENU ######################################################################################-->
                <!-- <v-menu
                  bottom
                  left
                  :nudge-bottom="10"
                  offset-y
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      outlined
                      color="primary"
                      class="ml-3"
                      v-on="on"
                    >
                      <v-icon color="primary">mdi-filter-menu</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-container>
                      <div class="text-left text-h6">Filters:</div>
                      <v-card width="40%" class="ml-3" height="63px">
                        <div class="text-body-2 text-left ml-1 mt-1">
                          Price Range
                        </div>
                        <v-range-slider
                          v-model="priceRange"
                          :max="maxValue"
                          :min="min"
                          hide-details
                          @change="searchProducts"
                        >
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
                    </v-container>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="primary" @click="searchFilterSort(true)"
                        >Set</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-menu> -->
                <!-- ##################################################################################################-->

                <v-spacer />

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="checkForStoreOwner"
                      color="editStore"
                      v-bind="attrs"
                      dark
                      outlined
                      class="ml-3"
                      v-on="on"
                      @click.stop="showProductDialogNew"
                    >
                      <v-icon> mdi-plus </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    {{ $t("storeProfile.createProductButtonTooltip") }}
                  </span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="checkForStoreOwner"
                      color="editStore"
                      v-bind="attrs"
                      dark
                      outlined
                      class="ml-3"
                      v-on="on"
                      @click.stop="showProductTableDialog"
                    >
                      <v-icon> mdi-table-cog </v-icon>
                    </v-btn>
                  </template>
                  <span>
                    {{ $t("storeProfile.productsTableButtonTooltip") }}
                  </span>
                </v-tooltip>
              </v-row>
            </v-container>
            <div
              v-if="loadingProducts === false && loadingErrorProducts === false"
            >
              <v-row class="mb-2 ml-1 mr-1">
                <v-col
                  v-for="prod in computedProducts"
                  :key="prod._id"
                  cols="12"
                  xs="6"
                  sm="6"
                  md="4"
                  lg="4"
                  xl="3"
                >
                  <StoreProfileProductListItem
                    :product="prod"
                    :modifiable="checkForStoreOwner"
                    @delete-product="removeProductFromArray"
                    @edit-product="showProductDialogEdit"
                    @overlay-start="startLoadingOverlay"
                    @overlay-end="endLoadingOverlay"
                    @update-stock="updateStockAmount"
                    @show-product-details="showProductDetails"
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
              {{ $t("storeProfile.productsLoadingError") }}
            </div>
          </div>
        </v-tab-item>
        <v-tab-item v-if="dataset">
          <div v-if="!loadingReviews && !loadingErrorReviews">
            <v-row class="my-5">
              <!-- <div>
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
            </div> -->
              <v-btn
                v-show="!addButtonHidden"
                dark
                color="editStore"
                class="ml-5"
                :disabled="reviewButtonDisabled"
                @click.stop="showReviewDialogNew"
              >
                <v-icon>mdi-plus</v-icon>
                {{ $t("storeProfile.addReviewButton") }}
              </v-btn>
            </v-row>
            <ReviewDialog
              v-model="showReviewDialog"
              :review-to-edit="reviewToEdit"
              @add-new-review="addNewReviewToArray"
              @update-review="editExistingReview"
              @reviewToEdit-to-null="nullifyReviewToEdit"
              @change-reviewToEdit-rating="changeRatingReviewToEdit"
              @change-reviewToEdit-text="changeTextReviewToEdit"
              @overlay-start="startLoadingOverlay"
              @overlay-end="endLoadingOverlay"
            />
            <div v-if="reviewList.length === 0" class="text-body-1 text-left">
              {{ $t("storeProfile.emptyReviewList") }}
            </div>
            <div v-if="reviewList">
              <div>
                <StoreProfileReviewListItem
                  v-for="rvw in computedReviews"
                  :key="rvw._id"
                  :review="rvw"
                  @remove-review="removeReviewfromArray"
                  @edit-review="showReviewDialogEdit"
                  @overlay-start="startLoadingOverlay"
                  @overlay-end="endLoadingOverlay"
                />
              </div>
              <div>
                <v-pagination
                  v-if="reviewList.length > reviewsPerPage"
                  v-model="currentPage"
                  :length="numOfPagesReviews"
                />
              </div>
            </div>
          </div>
          <div
            v-if="!loadingReviews && loadingErrorReviews"
            class="text-body-1 text-left"
          >
            {{ $t("storeProfile.reviewsLoadingError") }}
          </div>
          <div v-if="loadingReviews">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-tab-item>
      </v-tabs>
      <v-divider class="my-3" />

      <v-row>
        <v-col cols="12" lg="6">
          <v-card v-if="dataset" class="mx-auto mb-5" flat>
            <v-card-title>
              {{ $t("storeProfile.paymentMethodsHeadline") }}
            </v-card-title>
            <v-img src="../assets/payment-methods-logo.jpg" width="500px" />
          </v-card>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card v-if="dataset" class=" mb-5" flat>
            <v-card-title>
              {{ $t("storeProfile.shippingHeadline") }}
            </v-card-title>
            <v-card-text class="text-left text-body-1 black--text ml-2">
              <div v-if="shippingData.method === 'free'">
                {{ $t("storeProfile.freeShippingText") }}
              </div>
              <div v-if="shippingData.method === 'fixed'">
                {{ $t("storeProfile.fixedShippingText") }}
                {{ shippingData.costs }}€
              </div>
              <div v-if="shippingData.method === 'threshold'">
                {{ $t("storeProfile.thresholdShippingText1") }}
                {{ shippingData.costs }}€,
                {{ $t("storeProfile.thresholdShippingText2") }}
                {{ shippingData.thresholdValue }}€
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="my-3" />

      <v-row>
        <v-col cols="12" lg="6">
          <!-- OPENING HOURS -->
          <v-card v-if="dataset" ref="openingHours" flat>
            <v-card-title>
              {{ $t("storeProfile.openingHoursHeadline") }}
            </v-card-title>
            <v-expansion-panels flat hover>
              <v-expansion-panel>
                <v-expansion-panel-header
                  v-if="!storeOpened"
                  class="text-body-1 red--text"
                >
                  {{ $t("storeProfile.currentlyClosedLabel") }}
                </v-expansion-panel-header>
                <v-expansion-panel-header
                  v-else
                  class="text-body-1 green--text"
                >
                  {{ $t("storeProfile.todayOpenedLabel") }} ({{
                    todaysOpeningTimes
                  }})
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <OpeningHoursDisplay :opening-hours="openingHoursData" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>

          <!-- ADDRESS -->
          <v-card v-if="dataset" flat>
            <v-card-title>
              {{ $t("storeProfile.addressHeadline") }}
            </v-card-title>
            <v-card-text class="text-body-1 text-left ml-2 black--text">
              <div>
                {{ dataset.profileData.title }}
              </div>
              <div>
                {{ dataset.mapData.address.addressLine1 }},
                {{ dataset.mapData.address.postcode }}
                {{ dataset.mapData.address.city }}
              </div>
              <div>{{ dataset.mapData.address.country }}</div>
              <div class="mt-3">
                <v-btn color="primary" @click="redirectToGoogleMaps()">
                  {{ $t("storeProfile.planRouteButtonLabel") }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>

          <!-- CONTACT -->
          <v-card v-if="dataset" flat>
            <v-card-title>
              {{ $t("storeProfile.contactHeadline") }}
            </v-card-title>
            <v-card-text class="text-body-1 text-left ml-2 black--text">
              <div>
                E-Mail: producer@gmx.de
              </div>
              <div>
                Tel.num.: 0123 456789
              </div>
              <div class="mt-3">
                <v-btn color="primary" @click="console.log('hi1')">
                  <v-icon>mdi-web</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- GOOGLE MAP -->
        <v-col cols="12" lg="6">
          <div v-if="dataset" height="280px">
            <GoogleMapProfile :map-data="dataset.mapData" />
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
      {{ $t("storeProfile.storeLoadingError") }}
    </div>
  </div>
</template>

<script>
// Store Profile
import StoreProfileProductListItem from "../components/storeProfileComponents/StoreProfileProductListItem";
import StoreProfileReviewListItem from "../components/storeProfileComponents/StoreProfileReviewListItem";
import StoreProductsTableDialog from "../components/storeProfileComponents/StoreProductsTableDialog";
import StoreProfileActivationSteps from "../components/storeProfileComponents/StoreProfileActivationSteps";
import GoogleMapProfile from "../components/storeProfileComponents/GoogleMapProfile";
import ProductDialog from "../components/storeProfileComponents/ProductDialog";
import ReviewDialog from "../components/storeProfileComponents/ReviewDialog";
import OpeningHoursDisplay from "../components/storeProfileComponents/OpeningHoursDisplay";
import StoreProfileProductDetailDialog from "../components/storeProfileComponents/StoreProfileProductDetailDialog";

// Edit Store
import EditStoreDialog from "../components/editStoreDialogComponents/EditStoreDialog";

// Others
import {
  compareArrayAsc,
  compareArrayDesc,
  checkIfStoreOpened,
} from "../helpers";
import { storeService, paypalService, reviewService } from "../services";
import { mapState, mapActions } from "vuex";

export default {
  name: "StoreProfileView",
  components: {
    StoreProfileProductListItem: StoreProfileProductListItem,
    StoreProfileReviewListItem: StoreProfileReviewListItem,
    EditStoreDialog: EditStoreDialog,
    ReviewDialog: ReviewDialog,
    ProductDialog: ProductDialog,
    StoreProductsTableDialog: StoreProductsTableDialog,
    StoreProfileActivationSteps: StoreProfileActivationSteps,
    GoogleMapProfile: GoogleMapProfile,
    OpeningHoursDisplay: OpeningHoursDisplay,
    StoreProfileProductDetailDialog: StoreProfileProductDetailDialog,
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
        paymentMethodRegistered: false,
      },

      editMode: false,
      fab: false,
      fab2: false,
      overlay: false,
      //profileData: {},
      productList: [],
      dataset: null,
      mapData: {},
      profileData: {},
      shippingData: {},
      openingHoursData: {},
      avgRating: 0,
      addButtonHidden: false,
      showEditStoreDialog: false,
      showReviewDialog: false,
      showProductDialog: false,
      showAddStoreImageDialog: false,

      showProductDetailDialog: false,
      productToShowDetails: {},

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
        "Beer",
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
          tooltip: "",
        },
        {
          type: "Title",
          icon: "mdi-sort-alphabetical-ascending",
          tooltip: "",
        },
        { type: "Price", icon: "mdi-sort-numeric-descending", tooltip: "" },
        { type: "Price", icon: "mdi-sort-numeric-ascending", tooltip: "" },
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
      reviewsPerPage: 5,

      // opened
      storeOpened: false,
      todaysOpeningTimes: "",

      // Reviews
      loadingErrorReviews: false,
      loadingReviews: true,
      reviewList: [],

      // scrolling options
      duration: 400,
      offset: 0,
      easing: "easeInOutCubic",
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
          document.getElementById(`imageDiv${i}`).style.maxWidth = "100px";
          document.getElementById(`imageDiv${i}`).style.maxHeight = "100px";
        }
      }
      //styles for chosen image
      document.getElementById(`imageDiv${val}`).style.border =
        "2px solid black";
      document.getElementById(`imageDiv${val}`).style.maxWidth = "100px";
      document.getElementById(`imageDiv${val}`).style.maxHeight = "100px";
      document.getElementById(`imageDiv${val}`).style.borderRadius = "6px";
      document.getElementById(`imageDiv${val}`).style.opacity = "1";
    },
  },

  computed: {
    ...mapState("account", ["user", "loggedIn", "favoriteStores"]),

    googleMapsRouteUrl() {
      const addressString =
        this.dataset.mapData.address.addressLine1 +
        ", " +
        this.dataset.mapData.address.postcode +
        " " +
        this.dataset.mapData.address.city;

      const addressUrlEncoded = encodeURIComponent(addressString);
      const googleMapsBaseUrl = "https://www.google.com/maps/dir/?api=1";

      return `${googleMapsBaseUrl}&destination=${addressUrlEncoded}`;
    },

    //Review Pagination
    numOfPagesReviews() {
      if (this.reviewList) {
        return Math.ceil(this.reviewList.length / this.reviewsPerPage);
      }
      return 0;
    },

    computedReviews() {
      // if (this.offset > this.profileData.reviews.length) {
      //   this.currentPage = this.numOfPages;
      // }
      if (this.reviewList) {
        return this.reviewList.slice(this.sliceStart, this.sliceEnd);
      }
      return [];
    },
    sliceStart() {
      return (this.currentPage - 1) * this.reviewsPerPage;
    },
    sliceEnd() {
      return this.sliceStart + this.reviewsPerPage;
    },

    scrollingOptions() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },

    checkFavoriteStore() {
      if (
        this.loggedIn === true &&
        this.favoriteStores.includes(this.$route.params.id)
      ) {
        return true;
      }
      return false;
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
          // console.log(Math.round(parseFloat(max.price)));
          return Math.round(parseFloat(max.price));
        } else {
          return 0;
        }
      },
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
      },
    },
    avgRatingComputed: {
      get() {
        return Math.round(this.avgRating * 10) / 10;
      },
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
      },
    },
    reviewAlreadySubmitted: {
      //check if logged in user already submitted a review for this store
      get() {
        if (this.dataset != null) {
          for (var i = 0; i < this.reviewList.length; i++) {
            if (this.reviewList[i].userEmail === this.user.email) {
              return true;
            }
          }
        }
        return false;
      },
    },

    //...mapState("shoppingCart", ["shoppingCart", "counter"])
  },
  async mounted() {
    // Option 1 to save the Paypal Merchant Id -> click on the Return to Store Button
    if (this.$route.query.merchantId && this.$route.query.merchantIdInPayPal) {
      await this.saveOnboardingDataFunction();
    }

    let id = this.$route.params.id;
    let responseStore;
    try {
      responseStore = await storeService.getSingleStore(id);
    } catch (error) {
      this.loadingErrorStore = true;
      this.loadingStore = false;
      return;
    }

    // Set data
    this.dataset = responseStore;
    this.mapData = responseStore.mapData;
    this.profileData = responseStore.profileData;
    this.shippingData = responseStore.shipping;
    this.openingHoursData = responseStore.openingHours;
    this.tagsString = this.dataset.profileData.tags.join(", ");
    // console.log(JSON.stringify(responseStore.openingHours));
    this.setStoreOpeningHours(responseStore.openingHours);
    // console.log(`store opened: ${this.storeOpened}`);

    if (this.dataset.payment.paypal) {
      this.paypalSignupLink = this.dataset.payment.paypal.urls.actionUrl.href;
    }
    // console.log(this.paypalSignupLink);
    this.avgRating = parseFloat(this.dataset.profileData.avgRating);
    // end store loading
    this.loadingStore = false;

    // Fetch Products
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
    this.loadingProducts = false;

    // Fetch Store's Reviews
    let responseReviews;
    try {
      responseReviews = await reviewService.getStoresReviews(data);
    } catch (error) {
      this.loadingErrorReviews = true;
      this.loadingReviews = false;
      return;
    }
    this.reviewList = responseReviews;
    this.loadingReviews = false;

    //Set Price Range
    this.setPriceRange();
  },

  methods: {
    ...mapActions("snackbar", [
      "addSuccessSnackbar",
      "addErrorSnackbar",
      "addInfoSnackbar",
    ]),
    ...mapActions("account", [
      "addStoreToFavorites",
      "removeStoreFromFavorites",
    ]),

    redirectToGoogleMaps() {
      const url = this.googleMapsRouteUrl;
      window.open(url, "_blank");
    },
    // https://prjct-frontend.azurewebsites.net/store-profile/60ba8b63114d260f4415f636?merchantId=60ba8b63114d260f4415f636&merchantIdInPayPal=5FHJ5NA2X94VG&permissionsGranted=true&consentStatus=true&productIntentId=addipmt&productIntentID=addipmt&isEmailConfirmed=true&accountStatus=BUSINESS_ACCOUNT
    async saveOnboardingDataFunction() {
      const storeId = this.$route.params.id;
      const payload = {
        merchantId: this.$route.query.merchantId,
        merchantIdInPayPal: this.$route.query.merchantIdInPayPal,
        permissionsGranted: this.$route.query.permissionsGranted === "true", // convert to boolean
        consentStatus: this.$route.query.consentStatus === "true",
        productIntentId: this.$route.query.productIntentId,
        productIntentID: this.$route.query.productIntentID,
        isEmailConfirmed: this.$route.query.isEmailConfirmed === "true",
        accountStatus: this.$route.query.accountStatus,
      };
      try {
        await paypalService.saveOnboardingData(payload, storeId);
      } catch (error) {
        console.log(error);
        return;
      }
      let query = Object.assign({}, this.$route.query);
      for (const key of Object.keys(payload)) {
        delete query[key];
      }
      this.$router.replace({ query });
      return;
    },

    setStoreOpeningHours(openingHours) {
      const openingHelperResponse = checkIfStoreOpened(openingHours);
      this.storeOpened = openingHelperResponse.opened;
      if (this.storeOpened) {
        this.todaysOpeningTimes = openingHelperResponse.todaysOpeningTimes;
      }
    },

    setPriceRange() {
      if (this.productList.length > 0) {
        let objct = this.productList.reduce(function(prev, curr) {
          return prev.priceFloat > curr.priceFloat ? prev : curr;
        });
        this.maxValue = Math.ceil(parseFloat(objct.priceFloat));
        this.priceRange[1] = this.maxValue;
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

    getCurrentURL() {
      return window.location.href;
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
      this.profileData.title = data.title;
      this.profileData.description = data.description;
      this.profileData.tags = data.tags;
      this.profileData.images = data.images;

      this.mapData.address.addressLine1 = data.address.addressLine1;
      this.mapData.address.postcode = data.address.postcode;
      this.mapData.address.city = data.address.city;
      this.mapData.address.country = data.address.country;
      this.mapData.mapIcon = data.mapIcon;
      this.mapData.location.lat = data.location.lat;
      this.mapData.location.lng = data.location.lng;

      this.shippingData.method = data.shippingMethod;
      this.shippingData.costs = data.shippingCosts;
      this.shippingData.thresholdValue = data.shippingThresholdValue;

      this.openingHoursData = data.openingHours;
      // this.dataset.openingHours = data.openingHours;
      this.setStoreOpeningHours(data.openingHours);

      this.overlay = false;
    },

    addNewImageToArray(newImage) {
      this.dataset.profileData.images.push(newImage);
    },
    addNewProductToArray(newProduct) {
      this.productList.unshift(newProduct);
    },
    addNewReviewToArray(newReview) {
      this.reviewList.unshift(newReview.review);
      this.avgRating = parseFloat(newReview.avgRating);
    },
    editExistingReview(updatedReview) {
      let index = this.reviewList.findIndex(
        (rv) => rv._id === updatedReview.review._id
      );
      this.reviewList.splice(index, 1, updatedReview.review);
      this.avgRating = parseFloat(updatedReview.avgRating);
    },
    removeReviewfromArray(eventData) {
      let indexOfReview = this.reviewList.findIndex(
        (r) => r._id === eventData._id
      );
      this.reviewList.splice(indexOfReview, 1);
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
      var indexOfProduct = this.productList.findIndex((r) => r._id === _id);
      this.productList.splice(indexOfProduct, 1);
    },
    nullifyProductToEdit() {
      this.productToEdit = null;
    },
    changeTitleProductToEdit(value) {
      this.productToEdit.title = value;
    },
    editExistingProduct(updatedProduct) {
      var index = this.productList.findIndex(
        (prd) => prd._id === updatedProduct._id
      );
      //replace array element
      this.productList.splice(index, 1, updatedProduct);
    },
    updateStockAmount(_id, stockAmount) {
      var indexOfProduct = this.productList.findIndex((prd) => prd._id === _id);
      this.productList[indexOfProduct].stockAmount = stockAmount;
    },

    // Product details
    showProductDetails(product) {
      this.showProductDetailDialog = true;
      this.productToShowDetails = product;
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
        storeId: this.$route.params.id,
      };
      this.productList = await storeService.getStoreProducts(data);
    },

    sortListClicked(index) {
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
      let data = {
        storeId: this.$route.params.id,
        searchTerm: this.productSearchTerm,
      };
      if (
        this.priceRange[0] !== this.min ||
        this.priceRange[1] !== this.maxValue
      ) {
        data["priceMin"] = this.priceRange[0];
        data["priceMax"] = this.priceRange[1];
      }
      this.productList = await storeService.getStoreProducts(data);
    },

    async removeFavorites() {
      if (this.loggedIn === false) {
        this.addInfoSnackbar(
          "Please login to remove this store from your favorites."
        );
        return;
      }
      try {
        await this.removeStoreFromFavorites(this.$route.params.id);
      } catch (error) {
        // console.log(error);
        this.addErrorSnackbar("Error while removing store from favorites.");
        return;
      }
      this.addSuccessSnackbar("Store was removed from favorites.");
      return;
    },

    async addFavorites() {
      if (this.loggedIn === false) {
        this.addInfoSnackbar(
          "Please login to add this store to your favorites."
        );
        return;
      }
      try {
        await this.addStoreToFavorites(this.$route.params.id);
      } catch (error) {
        // console.log(error);
        this.addErrorSnackbar("Error while adding store to favorites.");
        return;
      }
      this.addSuccessSnackbar("Store was added to favorites.");
      return;
    },

    print() {
      console.log(`hi`);
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
.inputPriceRange input[type="number"] {
  -moz-appearance: textfield;
}
.inputPriceRange input::-webkit-outer-spin-button,
.inputPriceRange input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
