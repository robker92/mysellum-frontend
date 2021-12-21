<template>
  <v-dialog
    v-model="show"
    max-width="85%"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    @click:outside="cancel"
  >
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>
          {{ $t("storeProfile.editStoreDialog.headline") }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs vertical class="my-tabs">
        <v-tab class="text-left">
          <v-icon left>
            mdi-store
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.storeProfile.headline") }}
        </v-tab>
        <v-tab class="text-left">
          <v-icon left>
            mdi-map-marker-radius
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.location.headline") }}
        </v-tab>
        <v-tab class="text-left">
          <v-icon left>
            mdi-card-account-phone
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.contact.headline") }}
        </v-tab>
        <v-tab class="text-left">
          <v-icon left>
            mdi-clock-time-four-outline
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.openingHours.headline") }}
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-bell-ring
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.notifications.headline") }}
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-credit-card-outline
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.payment.headline") }}
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-truck
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.shipping.headline") }}
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-lock
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.security.headline") }}
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-cog
          </v-icon>
          {{ $t("storeProfile.editStoreDialog.tabs.settings.headline") }}
        </v-tab>

        <!-- Store Profile -->
        <v-tab-item>
          <div class="ma-3">
            <v-alert type="info" text dense class="text-left">
              {{ $t("storeProfile.editStoreDialog.tabs.storeProfile.info") }}
            </v-alert>
          </div>
          <!-- <div class="text-h6 text-left ml-3">Store Profile:</div> -->
          <v-card class="ma-3">
            <v-container>
              <div class="text-caption text-left grey--text text--darken-1">
                {{
                  $t(
                    "storeProfile.editStoreDialog.tabs.storeProfile.images.label"
                  )
                }}*
              </div>

              <AddStoreImageDialog
                v-model="showAddStoreImageDialog"
                @add-store-image="addNewImageToArray"
              />

              <ShowHelpDialog
                v-model="showShowHelpDialog"
                :title="helpDialogTitle"
                :text="helpDialogMessage"
              />

              <v-row>
                <v-col
                  v-for="(img, index) in storeImages"
                  :key="index"
                  cols="12"
                  xs="6"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card flat tile>
                    <v-img :src="img.src" height="200px" class="grey lighten-2">
                      <v-hover v-slot="{ hover }">
                        <v-btn
                          :elevation="hover ? 16 : 2"
                          :class="{ 'on-hover': hover }"
                          icon
                          absolute
                          top
                          left
                          @click="deleteImage(index)"
                        >
                          <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                      </v-hover>
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
                    <v-row align="center">
                      <v-card-title>{{ img.title }}</v-card-title>
                      <v-spacer />
                      <v-btn
                        icon
                        :disabled="getImgSortArrLeftDisabled(index)"
                        @click="sortArrowLeftClick(index)"
                      >
                        <v-icon color="primary">
                          mdi-arrow-left-bold
                        </v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        :disabled="getImgSortArrRightDisabled(index)"
                        @click="sortArrowRightClick(index)"
                      >
                        <v-icon color="primary">
                          mdi-arrow-right-bold
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col
                  v-if="storeImages.length !== storeImagesMax"
                  cols="12"
                  xs="6"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      :elevation="hover ? 16 : 2"
                      :class="{ 'on-hover': hover }"
                      tile
                      color="grey lighten-3"
                      class="d-flex justify-center align-center"
                      height="200px"
                      @click="showAddStoreImageDialog = true"
                    >
                      <!-- <v-row>
                    <v-col> -->
                      <v-btn x-large dark color="grey lighten-1">
                        <v-icon x-large>mdi-plus</v-icon>
                      </v-btn>
                      <!-- </v-col>
                  </v-row> -->
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
              <div
                v-if="
                  storeImages.length <= storeImagesMax &&
                    storeImages.length >= storeImagesMin
                "
                class="text-caption text-right"
              >
                {{ storeImages.length }} / {{ storeImagesMax }}
              </div>
              <div v-else class="text-caption text-right red--text">
                {{ storeImages.length }} / {{ storeImagesMax }}
              </div>
              <div v-if="$v.storeImages.$invalid" class="text-body-2 red--text">
                {{ storeImagesErrors[0] }}
              </div>
            </v-container>
          </v-card>

          <v-card class="ma-3">
            <v-container>
              <v-text-field
                v-model="storeTitle"
                :counter="storeTitleMax"
                :error-messages="storeTitleErrors"
                :label="
                  $t(
                    'storeProfile.editStoreDialog.tabs.storeProfile.storeTitleLabel'
                  ) + '*'
                "
                required
                @input="$v.storeTitle.$touch()"
                @blur="$v.storeTitle.$touch()"
              />
            </v-container>
          </v-card>

          <v-card class="ma-3">
            <v-container>
              <v-combobox
                v-model="tagsComboBoxModel"
                :items="tagsComboBoxItems"
                :counter="tagsComboBoxModelMax"
                :error-messages="storeTagsErrors"
                :label="
                  $t(
                    'storeProfile.editStoreDialog.tabs.storeProfile.storeTagsLabel'
                  ) + '*'
                "
                multiple
                chips
                deletable-chips
                @input="$v.tagsComboBoxModel.$touch()"
                @blur="$v.tagsComboBoxModel.$touch()"
              />
            </v-container>
          </v-card>

          <EditStoreDialogDescriptionTextArea
            v-if="show"
            :store-description-input="storeDescription"
            @description-text-changed="changeDescriptionText"
            @description-valid="storeDescriptionInvalid = false"
            @description-invalid="storeDescriptionInvalid = true"
          />

          <!-- <v-container>
            <v-btn color="indigo" text @click="cancel">Close</v-btn>
            <v-btn
              color="indigo"
              dark
              :disabled="editButtonDisabled"
              @click="submitEditStore"
              >Save</v-btn
            >
          </v-container> -->
        </v-tab-item>

        <v-tab-item>
          <div class="ma-3">
            <v-alert type="info" text dense class="text-left">
              {{ $t("storeProfile.editStoreDialog.tabs.location.info") }}
            </v-alert>
          </div>
          <!-- <div class="text-h6 text-left ml-3">Store Address:</div> -->
          <v-card class="ma-3">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="addressLine1"
                    :counter="40"
                    :label="
                      $t(
                        'storeProfile.editStoreDialog.tabs.location.addresslineLabel'
                      ) + '*'
                    "
                    required
                    :error-messages="addressLine1Errors"
                    @input="$v.addressLine1.$touch()"
                    @blur="$v.addressLine1.$touch()"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="2" md="2">
                  <v-text-field
                    v-model="postcode"
                    :label="
                      $t(
                        'storeProfile.editStoreDialog.tabs.location.postcodeLabel'
                      ) + '*'
                    "
                    class="inputPostcode"
                    required
                    type="number"
                    maxlength="5"
                    oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
                    :error-messages="postcodeErrors"
                    @input="$v.postcode.$touch()"
                    @blur="$v.postcode.$touch()"
                  />
                </v-col>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field
                    v-model="city"
                    :label="
                      $t(
                        'storeProfile.editStoreDialog.tabs.location.cityLabel'
                      ) + '*'
                    "
                    :counter="20"
                    required
                    :error-messages="cityErrors"
                    @input="$v.city.$touch()"
                    @blur="$v.city.$touch()"
                  />
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="lat" label="Latitude*" required />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="lng" label="Longitude*" required />
                </v-col>
              </v-row> -->
              <v-row>
                <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                  <v-select
                    v-model="mapIcon"
                    :items="mapIconList"
                    :prepend-icon="'mdi-' + mapIcon"
                    append-outer-icon="mdi-information"
                    :label="
                      $t('storeProfile.editStoreDialog.tabs.location.iconLabel')
                    "
                    menu-props="auto"
                    @click:append-outer="
                      showHelp(
                        $t(
                          'storeProfile.editStoreDialog.tabs.location.iconHelp'
                        )
                      )
                    "
                  >
                    <template v-slot:item="{ item }">
                      <!-- <img :src="item.image" /> -->
                      <v-icon>mdi-{{ item.value }}</v-icon>
                      <div class="ml-3">
                        {{ item.text }}
                      </div>
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                  <v-alert type="info" text>
                    {{
                      $t("storeProfile.editStoreDialog.tabs.location.iconInfo")
                    }}
                  </v-alert>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <div class="ma-3">
            <v-alert type="info" text dense class="text-left">
              {{ $t("storeProfile.editStoreDialog.tabs.contact.info") }}
            </v-alert>
          </div>
          <v-card class="ma-3">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="phoneNumber"
                    :label="
                      $t(
                        'storeProfile.editStoreDialog.tabs.contact.phoneNumberLabel'
                      )
                    "
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="emailAddress"
                    :label="
                      $t('storeProfile.editStoreDialog.tabs.contact.emailLabel')
                    "
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="website"
                    :label="
                      $t(
                        'storeProfile.editStoreDialog.tabs.contact.websiteLabel'
                      )
                    "
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <!-- <div class="ma-3">
            <v-alert type="info" text dense class="text-left">
              Here you can set the preferences for notifications you would like
              to receive. Click on the save button at the bottom, when you are
              done.
            </v-alert>
          </div>
          <v-card class="ma-3">
            <v-container>
              <v-checkbox v-model="openMonday" :label="`Monday`"></v-checkbox>
            </v-container>
          </v-card> -->

          <OpeningHoursTab
            :opening-hours="openingHours"
            @opening-hours-changed="openingHoursChanged"
          />
        </v-tab-item>

        <v-tab-item>
          <div class="ma-3">
            <v-alert type="info" text dense class="text-left">
              Here you can set the preferences for notifications you would like
              to receive. Click on the save button at the bottom, when you are
              done.
            </v-alert>
          </div>
          <v-card class="ma-3">
            <v-container>
              <div class="text-left text-body-1">
                Notifications
              </div>
              <v-row align="center">
                <v-col cols="12" lg="6" xl="6">
                  <v-switch
                    v-model="notificationOrderReceive"
                    label="Orders received (recommended)"
                    hint="We will notify you every time you receive a new order from a customer."
                    persistent-hint
                    class="ml-5"
                  ></v-switch>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-switch
                  v-model="notificationOrderReturn"
                  label="Product out of stock (recommended)"
                  hint="We will notify you every time a product's stock falls below a defined limit."
                  persistent-hint
                  class="ml-5"
                ></v-switch>
                <!-- </v-col>
                <v-col cols="12" lg="6" xl="6"> label="Limit:"-->

                <v-slider
                  v-model="stockNotificationValue"
                  track-color="green"
                  :thumb-size="24"
                  thumb-label="always"
                  hint="Threshold value"
                  label="Limit:"
                  persistent-hint
                  :max="100"
                  :min="0"
                  :disabled="notificationOrderReturn === false ? true : false"
                ></v-slider>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <div class="ma-3">
            <v-alert type="info" text dense class="text-left">
              Here you can add and adjust your payment information. You will
              receive your payments to the defined method. Furthermore, you have
              to add at least one payment method in order to be seen by
              customers on the platform.Click on the save button at the bottom,
              when you are done.
            </v-alert>
          </div>
          <v-card height="50vh" class="ma-3">
            <v-container>
              <div class="text-left text-h5">
                PayPal
              </div>
              <v-row align="center" class="ma-3">
                <div class="text-left text-body-1">
                  Please read the text carefully in order to benefit from the
                  seller protection:
                </div>
                <v-btn
                  text
                  href="https://www.paypal.com/us/webapps/mpp/security/seller-protection"
                  target="_blank"
                  class="no-uppercase"
                >
                  Paypal's Seller Protection Privacy
                  <v-icon right>mdi-link-variant</v-icon>
                </v-btn>
              </v-row>
              <!-- <v-btn
                text
                href="https://www.paypal.com/us/webapps/mpp/security/seller-protection"
                target="_blank"
                class="no-uppercase"
              >
                Sign-up to Paypal
              </v-btn> -->

              <!-- <v-hover v-slot="{ hover }">
                <v-card
                  max-width="500px"
                  max-height="100px"
                  :elevation="hover ? 8 : 0"
                  :class="{ 'on-hover': hover }"
                  flat
                  @click="signupPaypal"
                >
                  <v-container>
                    <v-row align="center" class="ma-1">
                      <v-img
                        max-height="70"
                        max-width="90"
                        :src="paypalImageURL"
                      ></v-img>
                      <div class="ml-3">
                        Sign-up to Paypal
                      </div>
                    </v-row>
                  </v-container>
                </v-card>
              </v-hover> -->
              <v-row align="center" class="ma-3">
                <div class="text-left text-body-1">
                  Afterwards, you can connect your PayPal account to your
                  Mysellum store or create a new PayPal account via this link:
                </div>
                <v-btn class="mt-3" @click="signupPaypal">
                  <v-img
                    left
                    src="../../assets/paypal/de-pp-logo-100px.png"
                  ></v-img>
                  <div class="ml-3">
                    Connect to Paypal
                  </div>
                </v-btn>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <div class="ma-3">
            <v-alert type="info" text dense class="text-left">
              Here you can adjust your shipping preferences.
            </v-alert>
          </div>
          <div class="text-h5 text-left">
            Shipping Cost Logic
          </div>
          <v-container>
            <v-row>
              <v-col cols="12" md="4" lg="3">
                <v-radio-group v-model="shippingMethod">
                  <v-radio label="Always Free" value="free"></v-radio>
                  <v-radio label="Fixed price" value="fixed"></v-radio>
                  <v-radio label="With Threshold" value="threshold"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="8" lg="9">
                <v-card v-if="shippingMethod === 'free'" flat>
                  <v-alert type="info" text dense class="text-left">
                    You have chosen free shipping. With this option your
                    customers will never pay shipping costs if they order your
                    products.
                  </v-alert>
                </v-card>
                <v-card v-if="shippingMethod === 'fixed'" flat>
                  <v-alert type="info" text dense class="text-left">
                    You have chosen fixed shipping costs. With this option your
                    customers will always pay the same shipping costs regardless
                    of how much they order.
                  </v-alert>
                  <v-text-field
                    v-model="shippingCosts"
                    label="Price"
                    suffix="€"
                    class="inputShippingCosts"
                    type="number"
                    required
                    :error-messages="shippingCostsErrors"
                    @input="$v.shippingCosts.$touch()"
                    @blur="$v.shippingCosts.$touch()"
                  >
                  </v-text-field>
                </v-card>
                <v-card v-if="shippingMethod === 'threshold'" flat>
                  <v-alert type="info" text dense class="text-left">
                    You have chosen the threshold value variant. With this you
                    can set a minimum order amount from which the delivery costs
                    are free for the customer.
                  </v-alert>
                  <v-text-field
                    v-model="shippingThresholdValue"
                    label="Minimum Order Amount"
                    suffix="€"
                    class="inputShippingThresholdValue"
                    type="number"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="shippingCosts"
                    label="Price"
                    suffix="€"
                    class="inputShippingCosts"
                    type="number"
                  >
                  </v-text-field>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-card flat min-height="600px">
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum
                aliquam libero, non adipiscing dolor urna a orci. Curabitur
                ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
                leo. Nunc sed turpis.
              </p>

              <p>
                Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque
                egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                id tortor. Proin viverra, ligula sit amet ultrices semper,
                ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In
                hac habitasse platea dictumst. Fusce ac felis sit amet ligula
                pharetra condimentum.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat min-height="600px">
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque
                egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum
                aliquam libero, non adipiscing dolor urna a orci. Curabitur
                ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
                leo. Nunc sed turpis.
              </p>

              <p>
                Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque
                egestas, lacus ante convallis tellus, vitae iaculis lacus elit
                id tortor. Proin viverra, ligula sit amet ultrices semper,
                ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In
                hac habitasse platea dictumst. Fusce ac felis sit amet ligula
                pharetra condimentum.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancel">
          {{ $t("storeProfile.editStoreDialog.actions.closeButton") }}
        </v-btn>
        <v-btn color="primary" dark @click="submitEditStore">
          {{ $t("storeProfile.editStoreDialog.actions.saveButton") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="80"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import AddStoreImageDialog from "./AddStoreImageDialog";
import EditStoreDialogDescriptionTextArea from "./DescriptionTextArea";
import OpeningHoursTab from "./editStoreDialogTabs/OpeningHoursTab.vue";
import ShowHelpDialog from "../ShowHelpDialog";

import { mapState, mapActions } from "vuex";

import { storeService } from "../../services";

// eslint-disable-next-line no-unused-vars

import { mapIconList } from "../../helpers";
//console.log(mapIconList);

export default {
  name: "EditStoreDialog",

  components: {
    AddStoreImageDialog: AddStoreImageDialog,
    ShowHelpDialog: ShowHelpDialog,
    EditStoreDialogDescriptionTextArea: EditStoreDialogDescriptionTextArea,
    OpeningHoursTab: OpeningHoursTab,
  },

  mixins: [validationMixin],

  props: {
    value: Boolean,
    profileData: Object,
    mapData: Object,
    paypalSignupLink: String,
    shippingData: Object,
    openingHoursData: Object,
    contactData: Object,
  },

  validations: {
    storeTitle: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(100),
    },
    // storeDescription: {
    //   required,
    //   minLength: minLength(100),
    //   maxLength: maxLength(1000)
    // },
    storeImages: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(10),
    },
    tagsComboBoxModel: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(15),
    },
    city: { required, maxLength: maxLength(20) },
    postcode: { required },
    addressLine1: { required, maxLength: maxLength(40) },
    shippingCosts: { required },
    shippingThresholdValue: { required },
  },

  data() {
    return {
      paypalImageURL: "../../assets/paypal/de-pp-logo-100px.png",

      showAddStoreImageDialog: false,
      overlay: false,

      dataChanged: false,

      //Store Profile
      storeTitle: "",
      storeTitleMin: 10,
      storeTitleMax: 100,
      storeSubtitle: "",
      storeDescription: "",
      storeDescriptionInvalid: true,
      editedHtmlText: "", //Variable for saved html text -> will be saved as store description in the end
      // storeDescriptionMin: 100,
      // storeDescriptionMax: 1000,
      storeImages: [],
      storeImagesMin: 1,
      storeImagesMax: 10,
      imagesTextField: "",
      tagsComboBoxModel: [],
      tagsComboBoxModelMin: 1,
      tagsComboBoxModelMax: 15,
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

      // chosenIcon: "",
      mapIcon: "",
      mapIconList: mapIconList,

      // Shipping
      shippingMethod: "",
      shippingCosts: 0,
      fixedShippingCostsModel: 0,
      shippingThresholdValue: 0,

      // Notifications
      notificationOrderReceive: false,
      notificationOrderReturn: false,
      stockNotificationValue: 0,

      // Opening Hours
      openingHours: {},

      //Settings
      //Store Address
      addressLine1: "",
      postcode: "",
      city: "",
      lat: "",
      lng: "",
      //htmlText: "Hello <strong>this</strong> is a test", //Variable for Input Store Description

      // Contact
      website: "",
      emailAddress: "",
      phoneNumber: "",

      showShowHelpDialog: false,
      helpDialogTitle: "",
      helpDialogMessage: "",

      // paypal
    };
  },

  watch: {
    //Watch show status to initialize data
    show() {
      this.initializeData();
    },
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    profileDataWatcher() {
      return this.profileData;
    },

    storeTitleErrors() {
      const errors = [];
      var title = this.$v.storeTitle;
      if (!title.$dirty) return errors;
      !title.maxLength &&
        errors.push(
          `The store title must be at most ${this.storeTitleMax} characters long.`
        );
      !title.minLength &&
        errors.push(
          `The store title must be at least ${this.storeTitleMin} characters long.`
        );
      !title.required && errors.push("The store title is required.");
      return errors;
    },
    storeTagsErrors() {
      const errors = [];
      let tagsArray = this.$v.tagsComboBoxModel;
      if (!tagsArray.$dirty) return errors;
      !tagsArray.maxLength &&
        errors.push(
          `The store tag list must be at most ${this.tagsComboBoxModelMax} elements long.`
        );
      !tagsArray.minLength &&
        errors.push(
          `The store tag list must be at least ${this.tagsComboBoxModelMin} elements long.`
        );
      !tagsArray.required && errors.push("A store tag is required.");
      return errors;
    },
    storeImagesErrors() {
      const errors = [];
      var imageArray = this.$v.storeImages;
      if (!imageArray.$dirty) return errors;
      !imageArray.maxLength &&
        errors.push(
          `There must be at most ${this.storeImagesMax} images for a store.`
        );
      !imageArray.minLength &&
        errors.push(
          `There must be at least ${this.storeImagesMin} images for a store.`
        );
      !imageArray.required &&
        errors.push("At least one store image is required.");
      return errors;
    },
    // storeDescriptionErrors() {
    //   const errors = [];
    //   //var description = this.$v.storeDescription;
    //   //if (!description.$dirty) return errors;
    //   //console.log(this.numberCharactersInEditor);
    //   if (this.numberCharactersInEditor > 1000) {
    //     errors.push(
    //       `The store description must be at most ${this.storeDescriptionMax} characters long.`
    //     );
    //   }
    //   if (
    //     this.numberCharactersInEditor < 100 &&
    //     this.numberCharactersInEditor > 0
    //   ) {
    //     errors.push(
    //       `The store description must be at least ${this.storeDescriptionMin} characters long.`
    //     );
    //   }
    //   if (this.numberCharactersInEditor == 0) {
    //     errors.push("The store description is required.");
    //   }
    //   return errors;
    // },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required && errors.push("The city is required.");
      !this.$v.city.maxLength &&
        errors.push("The city must be at most 20 characters long.");
      return errors;
    },
    postcodeErrors() {
      const errors = [];
      if (!this.$v.postcode.$dirty) return errors;
      !this.$v.postcode.required && errors.push("Postcode is required.");
      return errors;
    },
    addressLine1Errors() {
      const errors = [];
      if (!this.$v.addressLine1.$dirty) return errors;
      !this.$v.addressLine1.required &&
        errors.push("The addressline is required.");
      !this.$v.addressLine1.maxLength &&
        errors.push("The addressline must be at most 40 characters long.");
      return errors;
    },

    shippingCostsErrors() {
      const errors = [];
      if (!this.$v.shippingCosts.$dirty) return errors;
      !this.$v.shippingCosts.required &&
        errors.push("A value for the shipping costs is required.");
      return errors;
    },
    shippingThresholdValueErrors() {
      const errors = [];
      if (!this.$v.shippingThresholdValue.$dirty) return errors;
      !this.$v.shippingThresholdValue.required &&
        errors.push("A value for the shipping threshold is required.");
      return errors;
    },

    editButtonDisabled() {
      if (this.show === true) {
        if (
          this.storeDescriptionInvalid === false &&
          // this.numberCharactersInEditor >= 100 &&
          // this.numberCharactersInEditor <= 1000 &&
          !this.$v.storeTitle.$invalid &&
          !this.$v.storeImages.$invalid &&
          !this.$v.tagsComboBoxModel.$invalid
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    ...mapState("account", ["user", "loggedIn"]),
  },

  methods: {
    ...mapActions("stores", ["createStore"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    printAddress() {
      console.log(this.addressLine1);
      console.log(this.city);
      console.log(this.storeTitle);
    },

    initializeData() {
      //ProfileData
      if (this.profileData) {
        this.storeTitle = this.profileData.title;
        this.storeSubtitle = "";
        this.storeDescription = this.profileData.description;
        this.tagsComboBoxModel = this.profileData.tags;
        this.storeImages = [...this.profileData.images];
        this.editedHtmlText = this.profileData.description;
        this.shippingMethod = this.shippingData.method;
        this.shippingCosts = this.shippingData.costs;
        this.shippingThresholdValue = this.shippingData.thresholdValue;
        this.openingHours = this.openingHoursData;
      }
      // Contact
      console.log(this.contactData);
      if (this.contactData) {
        this.emailAddress = this.contactData.emailAddress ?? "";
        this.phoneNumber = this.contactData.phoneNumber ?? "";
        this.website = this.contactData.website ?? "";
      }
      // MapData
      if (this.mapData) {
        this.addressLine1 = this.mapData.address.addressLine1;
        this.postcode = this.mapData.address.postcode;
        this.city = this.mapData.address.city;
        this.mapIcon = this.mapData.mapIcon || "";
        this.lat = this.mapData.location.lat;
        this.lng = this.mapData.location.lng;
      }
    },

    showHelp(message) {
      this.helpDialogTitle = "Map Icon";
      this.helpDialogMessage = message;
      this.showShowHelpDialog = true;
    },

    printInputs() {
      console.log(this.storeTitle);
      console.log(this.storeDescription);
      console.log(this.tagsComboBoxModel);
      console.log(this.addressLine1);
      console.log(this.postcode);
      console.log(this.city);
      console.log(this.lat);
      console.log(this.lng);
      console.log(this.storeTitleErrors);
      console.log(this.storeDescriptionErrors);
      console.log(this.storeImagesErrors);
      console.log(this.$v.storeImages.$invalid);
      console.log(this.storeImagesErrors[0]);
      console.log(this.mapIcon);
    },

    submitEditStore: async function() {
      let payload = {
        storeId: this.$route.params.id,
        title: this.storeTitle,
        description: this.editedHtmlText,
        tags: this.tagsComboBoxModel,
        images: this.storeImages,
        address: {
          postcode: this.postcode,
          city: this.city,
          addressLine1: this.addressLine1,
          country: "Germany",
        },
        mapIcon: this.mapIcon,
        location: {
          lat: this.lat,
          lng: this.lng,
        },
        shippingMethod: this.shippingMethod,
        shippingCosts: parseFloat(this.shippingCosts),
        shippingThresholdValue: parseFloat(this.shippingThresholdValue),
        openingHours: this.openingHours,
        contact: {
          emailAddress: this.emailAddress,
          phoneNumber: this.phoneNumber,
          website: this.website,
        },
      };

      //this.$emit("overlay-start");
      this.overlay = true;
      try {
        await storeService.editStore(payload);
      } catch (error) {
        this.overlay = false;
        return;
      }
      this.$emit("edit-store", payload);
      // setTimeout(() => {
      //   this.overlay = false;
      //   //this.$emit("overlay-end");
      //   console.log("Hello");
      // }, 3000);
      this.overlay = false;
      //this.$emit("overlay-end");
      this.addSuccessSnackbar("Store successfully edited!");
      //this.show = false;
    },

    cancel() {
      this.storeTitle = this.profileData.title;
      // this.storeDescription = this.profileData.description;
      this.editedHtmlText = this.profileData.description;
      document.getElementById("editor").innerHTML = this.editedHtmlText;
      this.tagsComboBoxModel = this.profileData.tags;
      this.storeImages = [...this.profileData.images];
      //this.$forceUpdate();
      this.show = false;
    },

    deleteImage(index) {
      this.storeImages.splice(index, 1);
      this.$v.storeImages.$touch();
    },

    addNewImageToArray(newImage) {
      newImage["id"] = this.storeImages.length + 1;
      this.storeImages.push(newImage);
      this.$v.storeImages.$touch();
    },

    getImgSortArrLeftDisabled(index) {
      if (index === 0) {
        return true;
      } else {
        return false;
      }
    },
    getImgSortArrRightDisabled(index) {
      if (index + 1 === this.storeImages.length) {
        return true;
      } else {
        return false;
      }
    },
    sortArrowLeftClick(index) {
      if (index > 0) {
        this.storeImages = this.array_move(this.storeImages, index, index - 1);
      }
    },
    sortArrowRightClick(index) {
      if (index + 1 < this.storeImages.length) {
        this.storeImages = this.array_move(this.storeImages, index, index + 1);
      }
    },
    //Moves elements position from old index to new index
    array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
    },

    openingHoursChanged(openingHours) {
      this.openingHours = openingHours;
    },

    changeDescriptionText(newDescription) {
      this.editedHtmlText = newDescription;
    },

    signupPaypal() {
      const win = window.open(this.paypalSignupLink, "_blank");
      win.focus();
    },
  },
};
</script>

<style>
.inputPostcode input[type="number"] {
  -moz-appearance: textfield;
}
.inputPostcode input::-webkit-outer-spin-button,
.inputPostcode input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.inputShippingCosts input[type="number"] {
  -moz-appearance: textfield;
}
.inputShippingCosts input::-webkit-outer-spin-button,
.inputShippingCosts input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.inputShippingThresholdValue input[type="number"] {
  -moz-appearance: textfield;
}
.inputShippingThresholdValue input::-webkit-outer-spin-button,
.inputShippingThresholdValue input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.editor {
  height: 350px;
}

.no-uppercase {
  text-transform: none;
}

div.my-tabs [role="tab"] {
  justify-content: flex-start;
}
</style>
