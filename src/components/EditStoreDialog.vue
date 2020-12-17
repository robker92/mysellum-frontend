<template>
  <v-dialog v-model="show" max-width="85%" @click:outside="cancel">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Edit Your Store</v-toolbar-title>
      </v-toolbar>
      <v-tabs>
        <v-tab>
          <v-icon left>
            mdi-store
          </v-icon>
          Store Profile
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-map-marker-radius
          </v-icon>
          Location
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-bell-ring
          </v-icon>
          Notifications
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-credit-card-outline
          </v-icon>
          Payment
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-lock
          </v-icon>
          Security
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-cog
          </v-icon>
          Settings
        </v-tab>

        <!--       <v-card-title>
        <span class="text-h5">Edit Your Store</span>
      </v-card-title> -->
        <v-tab-item>
          <!-- <div class="text-h6 text-left ml-3">Store Profile:</div> -->
          <v-card class="ma-3">
            <v-container>
              <div class="text-caption text-left grey--text text--darken-1">
                Images*
              </div>

              <!--    <div
                class="text-caption text-left grey--text text--darken-1 mx-0"
              >       <v-btn
            @click.stop="showAddStoreImageDialog = true"
            fab
            absolute
            top
            right
            dark
            color="pink"
            >
            <v-icon>mdi-plus</v-icon>
            </v-btn> -->
              <AddStoreImageDialog
                v-model="showAddStoreImageDialog"
                v-on:add-store-image="addNewImageToArray"
              />

              <v-row>
                <v-col
                  v-for="(img, index) in this.storeImages"
                  :key="index"
                  cols="12"
                  xs="6"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card flat tile>
                    <v-img :src="img.src" height="200px" class="grey lighten-2">
                      <v-btn
                        icon
                        outlined
                        absolute
                        top
                        left
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
                    <v-card-title>{{ img.title }}</v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="12" xs="6" sm="6" md="4" lg="3">
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
                      <v-btn xLarge dark color="grey lighten-1">
                        <v-icon xLarge>mdi-plus</v-icon>
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
                @input="$v.storeTitle.$touch()"
                @blur="$v.storeTitle.$touch()"
                label="Store Title*"
                required
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
                @input="$v.tagsComboBoxModel.$touch()"
                @blur="$v.tagsComboBoxModel.$touch()"
                label="Store Tags*"
                multiple
                chips
                deletable-chips
              />
            </v-container>
          </v-card>

          <!--           <v-card class="ma-3" max-width="95%">
            <v-container>
              <v-textarea
                v-model="storeDescription"
                :counter="1000"
                label="Store Description*"
                required
              />
            </v-container>
          </v-card> -->

          <v-card class="ma-3">
            <v-container>
              <div
                class="text-caption text-left grey--text text--darken-1 mx-0"
              >
                Store Description*
              </div>
              <v-row class="mx-0 mb-3">
                <v-card flat class="mr-3 my-1">
                  <v-item-group>
                    <v-btn @click="setFormat('italic')">
                      <v-icon>mdi-format-italic</v-icon>
                    </v-btn>
                    <v-btn @click="setFormat('bold')">
                      <v-icon>mdi-format-bold</v-icon>
                    </v-btn>
                    <v-btn @click="setFormat('underline')">
                      <v-icon>mdi-format-underline</v-icon>
                    </v-btn>
                  </v-item-group>
                </v-card>

                <v-card flat class="mr-3 my-1">
                  <v-item-group>
                    <v-btn @click="setFormat('justifyCenter')">
                      <v-icon>mdi-format-align-center</v-icon>
                    </v-btn>
                    <v-btn @click="setFormat('justifyLeft')">
                      <v-icon>mdi-format-align-left</v-icon>
                    </v-btn>
                    <v-btn @click="setFormat('justifyRight')">
                      <v-icon>mdi-format-align-right</v-icon>
                    </v-btn>
                    <v-btn @click="setFormat('justifyFull')">
                      <v-icon>mdi-format-align-justify</v-icon>
                    </v-btn>
                  </v-item-group>
                </v-card>

                <!--                 <v-card flat class="mr-3 my-1">
                  <v-item-group>
                    <v-btn @click="setFormat('createLink')">
                      <v-icon>mdi-link-variant-plus</v-icon>
                    </v-btn>
                    <v-btn @click="setFormat('unlink')">
                      <v-icon>mdi-link-variant-minus</v-icon>
                    </v-btn>
                  </v-item-group>
                </v-card> -->

                <v-card flat class="mr-3 my-1">
                  <v-item-group>
                    <v-btn @click="setFormat('insertUnorderedList')">
                      <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-btn>
                    <v-btn @click="setFormat('insertOrderedList')">
                      <v-icon>mdi-format-list-numbered</v-icon>
                    </v-btn>
                  </v-item-group>
                </v-card>

                <v-card flat class="mr-3 my-1">
                  <v-item-group>
                    <v-btn @click="fontSizeFunction('addition')">
                      <v-icon>mdi-format-font-size-increase</v-icon>
                    </v-btn>
                    <v-btn @click="fontSizeFunction('subtraction')">
                      <v-icon>mdi-format-font-size-decrease</v-icon>
                    </v-btn>
                  </v-item-group>
                </v-card>

                <v-spacer />
                <v-card flat class="my-1">
                  <v-item-group>
                    <!-- <v-btn @click="setFormat('removeFormat')">
                      <v-icon>mdi-format-clear</v-icon>
                    </v-btn> -->
                    <v-btn @click="setFormat('undo')">
                      <v-icon>mdi-undo</v-icon>
                    </v-btn>
                  </v-item-group>
                </v-card>
              </v-row>

              <!-- <v-btn @click="printInputs()">Print</v-btn> -->
              <div
                id="editor"
                ref="editor"
                class="editor pa-0"
                contenteditable
                v-html="storeDescription"
                @input="onInput"
                autocorrection="off"
                autocomplete="off"
                onkeypress="setTimeout(function() { var height = document.getElementById('editor').scrollHeight; console.log(height); if(height > 350){document.getElementById('editor').style.height = height+'px';}}, 0)"
                onpaste="setTimeout(function() { var height = document.getElementById('editor').scrollHeight; console.log(height); if(height > 350){document.getElementById('editor').style.height = height+'px';}}, 0)"
              />
              <div v-if="show" class="text-caption text-right">
                <div
                  v-if="
                    numberCharactersInEditor <= storeDescriptionMax &&
                      numberCharactersInEditor >= storeDescriptionMin
                  "
                >
                  {{ numberCharactersInEditor }} / {{ storeDescriptionMax }}
                </div>
                <div v-else class="red--text">
                  {{ numberCharactersInEditor }} / {{ storeDescriptionMax }}
                </div>
              </div>
              <div
                v-if="$v.storeDescription.$invalid"
                class="text-body-2 red--text"
              >
                {{ storeDescriptionErrors[0] }}
              </div>
            </v-container>
          </v-card>

          <v-container>
            <v-btn color="indigo" text @click="cancel">Close</v-btn>
            <v-btn
              color="indigo"
              dark
              @click="submitEditStore"
              :disabled="editButtonDisabled"
              >Save</v-btn
            >
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <!-- <div class="text-h6 text-left ml-3">Store Address:</div> -->
          <v-card class="ma-3">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="addressLine1"
                    :counter="40"
                    label="Address Line 1*"
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
                    label="Postcode*"
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
                    label="City*"
                    :counter="20"
                    required
                    :error-messages="cityErrors"
                    @input="$v.city.$touch()"
                    @blur="$v.city.$touch()"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="lat" label="Latitude*" required />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="lng" label="Longitude*" required />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                  <v-select
                    :items="mapIconList"
                    v-model="chosenIcon"
                    :prepend-icon="'mdi-' + chosenIcon"
                    append-outer-icon="mdi-information"
                    @click:append-outer="
                      showHelp(
                        'Choose an icon that most accurately symbolizes your store. This will be used to display it on the map.'
                      )
                    "
                    label="Choose your map icon"
                    menu-props="auto"
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
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card class="ma-3">
            <v-container>
              <div class="text-left text-body-1">
                Receive a notification if...
              </div>
              <v-switch
                v-model="notificationOrderReceive"
                label="an order is received."
                hint="test test test test test"
                persistent-hint
                class="ml-5"
              ></v-switch>
              <v-switch
                v-model="notificationOrderReturn"
                label="a return is submitted."
                class="ml-5"
              ></v-switch>
              <v-row align="center">
                <v-col cols="12" lg="2" xl="2">
                  <div>
                    an order is received.
                  </div>
                </v-col>
                <v-col cols="12" lg="10" xl="10">
                  <v-switch
                    v-model="notificationOrderReceive"
                    class="ml-5"
                  ></v-switch>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" lg="2" xl="2">
                  <div>
                    a return is submitted.
                  </div>
                </v-col>
                <v-col cols="12" lg="10" xl="10">
                  <v-switch
                    v-model="notificationOrderReturn"
                    class="ml-5"
                  ></v-switch>
                </v-col>
              </v-row>
              <v-switch>
                <template v-slot:label>
                  <span>Label text</span>
                </template>
              </v-switch>
              <v-switch
                class="v-input--reverse v-input--expand"
                hint="This label matches most of the examples in the Material Design documentation."
                persistent-hint
              >
                <template v-slot:label>
                  Expanded + reversed label
                </template>
              </v-switch>
            </v-container>
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
        <v-btn color="indigo" text @click="cancel">Close</v-btn>
        <v-btn color="indigo" dark @click="submitEditStore">Save</v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="80"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>

<script>
//<v-btn text @click="e6 = e6 - 1">Cancel</v-btn>
//<small>Summarize if needed</small>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import AddStoreImageDialog from "../components/AddStoreImageDialog";
import { mapState, mapActions } from "vuex";

import { storeService } from "../services";

// eslint-disable-next-line no-unused-vars
import { mapIconList } from "../helpers";
console.log(mapIconList);

export default {
  name: "EditStoreDialog",

  components: {
    AddStoreImageDialog: AddStoreImageDialog
  },

  props: {
    value: Boolean,
    profileData: Object,
    mapData: Object
  },

  mixins: [validationMixin],

  validations: {
    storeTitle: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(100)
    },
    storeDescription: {
      required,
      minLength: minLength(100),
      maxLength: maxLength(1000)
    },
    storeImages: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(10)
    },
    tagsComboBoxModel: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(15)
    },
    city: { required, maxLength: maxLength(20) },
    postcode: { required },
    addressLine1: { required, maxLength: maxLength(40) }
  },

  watch: {
    profileData: function(newVal) {
      if (newVal != null) {
        console.log(newVal);
        this.storeTitle = newVal.title;
        this.storeSubtitle = "";
        this.storeDescription = newVal.description;
        this.tagsComboBoxModel = newVal.tags;
        this.storeImages = [...newVal.images];
        this.editedHtmlText = newVal.description;
      }
    },
    mapData: function(newVal) {
      if (newVal != null) {
        console.log(newVal);
        this.addressLine1 = newVal.address.addressLine1;
        this.postcode = newVal.address.postalCode;
        this.city = newVal.address.city;
        this.lat = newVal.location.lat;
        this.lng = newVal.location.lng;
      }
    }
  },

  data() {
    return {
      showAddStoreImageDialog: false,
      overlay: false,

      //Store Profile
      storeTitle: "",
      storeTitleMin: 10,
      storeTitleMax: 100,
      storeSubtitle: "",
      storeDescription: "",
      storeDescriptionMin: 100,
      storeDescriptionMax: 1000,
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
        "Beer"
      ],
      chosenIcon: {},
      mapIconList: mapIconList,
      // iconList: [
      //   "fish",
      //   "barn",
      //   "bottle-wine",
      //   "glass-mug-variant",
      //   "glass-mug"
      // ],

      //Notifications
      notificationOrderReceive: false,
      notificationOrderReturn: false,

      //Settings
      //Store Address
      addressLine1: "",
      postcode: "",
      city: "",
      lat: "",
      lng: "",
      //htmlText: "Hello <strong>this</strong> is a test", //Variable for Input Store Description
      editedHtmlText: "" //Variable for saved html text -> will be saved as store description in the end
    };
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    numberCharactersInEditor: {
      get() {
        if (this.show == true) {
          return new DOMParser().parseFromString(
            this.editedHtmlText,
            "text/html"
          ).body.innerText.length;
        } else {
          return 0;
        }
      }
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
      var tagsArray = this.$v.tagsComboBoxModel;
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
    storeDescriptionErrors() {
      const errors = [];
      //var description = this.$v.storeDescription;
      //if (!description.$dirty) return errors;
      //console.log(this.numberCharactersInEditor);
      if (this.numberCharactersInEditor > 1000) {
        errors.push(
          `The store description must be at most ${this.storeDescriptionMax} characters long.`
        );
      }
      if (
        this.numberCharactersInEditor < 100 &&
        this.numberCharactersInEditor > 0
      ) {
        errors.push(
          `The store description must be at least ${this.storeDescriptionMin} characters long.`
        );
      }
      if (this.numberCharactersInEditor == 0) {
        errors.push("The store description is required.");
      }
      return errors;
    },
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

    editButtonDisabled() {
      if (this.show == true) {
        if (
          this.numberCharactersInEditor >= 100 &&
          this.numberCharactersInEditor <= 1000 &&
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
    ...mapState("account", ["user", "loggedIn"])
  },
  methods: {
    ...mapActions("stores", ["createStore"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    showHelp(message) {
      console.log(message);
      //this.chosenIcon = "fish";
      console.log(this.chosenIcon);
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
    },

    submitEditStore: async function() {
      console.log(this.addressLine1);
      var payload = {
        storeId: this.$route.params.id,
        title: this.storeTitle,
        description: this.editedHtmlText,
        tags: this.tagsComboBoxModel,
        images: this.storeImages,
        address: {
          postcode: this.postcode,
          city: this.city,
          addressLine1: this.addressLine1,
          country: "Germany"
        },
        location: {
          lat: this.lat,
          lng: this.lng
        }
      };
      //this.$emit("overlay-start");
      this.overlay = true;
      await storeService.editStore(payload);
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
      console.log(this.profileData);
      this.storeTitle = this.profileData.title;
      this.storeDescription = this.profileData.description;
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
      console.log(this.storeImages);
    },

    setFormat(command) {
      document.execCommand(command, false, "");
    },

    onInput(e) {
      this.editedHtmlText = e.target.innerHTML;
      this.$v.storeDescription.$touch();
    },

    // testFunction2() {
    //   //console.log(document.getElementById("editor").text().length);
    //   console.log(this.$refs.editor.innerText.length);
    //   console.log(this.numberCharactersInEditor);
    // },

    // testFunction() {
    //   //console.log(e.target.innerHTML)
    //   console.log(window.getSelection());
    //   var selection = window.getSelection();
    //   var currentFontSize = window
    //     .getComputedStyle(selection.anchorNode.parentElement, null)
    //     .getPropertyValue("font-size");
    //   console.log(
    //     window
    //       .getComputedStyle(selection.anchorNode.parentElement, null)
    //       .getPropertyValue("font-size")
    //   );

    //   document.execCommand(
    //     "fontSize",
    //     false,
    //     this.fontSizeTranslation(currentFontSize) + 1
    //   );

    //   console.log(
    //     window
    //       .getComputedStyle(selection.anchorNode.parentElement, null)
    //       .getPropertyValue("font-size")
    //   );
    //   //console.log(window.getComputedStyle(e));
    // },

    fontSizeFunction(type) {
      var selection = window.getSelection();
      var currentFontSize = window
        .getComputedStyle(selection.anchorNode.parentElement, null)
        .getPropertyValue("font-size");
      console.log(currentFontSize);
      var newFontSize;
      if (type == "addition") {
        newFontSize = this.fontSizeTranslation(currentFontSize) + 1;
      } else if (type == "subtraction") {
        newFontSize = this.fontSizeTranslation(currentFontSize) - 1;
      }
      document.execCommand("fontSize", false, newFontSize);
    },

    fontSizeTranslation(pxSize) {
      if (pxSize == "10px") {
        return 1;
      } else if (pxSize == "13px") {
        return 2;
      } else if (pxSize == "16px") {
        return 3;
      } else if (pxSize == "18px") {
        return 4;
      } else if (pxSize == "24px") {
        return 5;
      } else if (pxSize == "32px") {
        return 6;
      } else if (pxSize == "48px") {
        return 7;
      }
    }
  }
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

.editor {
  height: 350px;
}

/* Reversed input variant https://codepen.io/alanaktion/pen/OJPQKdx */
.v-input--reverse .v-input__slot {
  flex-direction: row-reverse;
  justify-content: flex-end;
  .v-application--is-ltr & {
    .v-input--selection-controls__input {
      margin-right: 0;
      margin-left: 8px;
    }
  }
  .v-application--is-rtl & {
    .v-input--selection-controls__input {
      margin-left: 0;
      margin-right: 8px;
    }
  }
}

/*  Bonus "expand" variant */
.v-input--expand .v-input__slot {
  /*justify-content: space-between; */
  .v-label {
    display: block;
    flex: 1;
  }
}
</style>
