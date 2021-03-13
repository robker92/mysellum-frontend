<template>
  <v-dialog v-model="show" max-width="90%">
    <ShowHelpDialog
      v-model="showShowHelpDialog"
      :title="helpDialogTitle"
      :text="helpDialogMessage"
    />
    <v-card flat v-if="show === true">
      <v-card-title>
        <span class="dialogHeadline">
          Create a Store
        </span>
        <v-spacer />
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-stepper v-model="e6" vertical class="elevation-0">
          <v-stepper-step
            :complete="e6 > 1"
            step="1"
            :editable="e6 > 1"
            complete-icon="mdi-close"
          >
            General Information
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card class="ma-1 mb-4" color="grey lighten-4">
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

            <EditStoreDialogDescriptionTextArea
              :storeDescriptionInput="storeDescription"
              v-on:description-text-changed="changeDescriptionText"
              v-on:description-valid="storeDescriptionInvalid = false"
              v-on:description-invalid="storeDescriptionInvalid = true"
              class="mb-4"
            />

            <v-card class="ma-1">
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

            <v-btn color="primary" @click="e6 = 2" :disabled="continue1Disabled"
              >Continue</v-btn
            >
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2" :editable="e6 > 2">
            Enter the Address
          </v-stepper-step>

          <v-stepper-content step="2">
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
                <v-col cols="12" xs="6" sm="6" md="6" lg="6" xl="6">
                  <v-select
                    :items="mapIconList"
                    v-model="mapIcon"
                    :prepend-icon="'mdi-' + mapIcon"
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
            <v-btn color="primary" @click="e6 = 3" :disabled="continue2Disabled"
              >Continue</v-btn
            >
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3" :editable="e6 > 3">
            Upload your Images
          </v-stepper-step>

          <v-stepper-content step="3">
            <StoreImagesArea
              :mode="this.StoreImagesAreaMode.CREATE"
              v-on:set-store-images-array="setStoreImagesArray"
              v-on:disable-continue-button-3="disableContinueButton3"
              v-on:enable-continue-button-3="enableContinueButton3"
            />
            <v-btn color="primary" @click="e6 = 4" :disabled="continue3Disabled"
              >Continue</v-btn
            >
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 4" step="4" :editable="e6 > 4">
            Payment Methods
          </v-stepper-step>

          <v-stepper-content step="4">
            <v-card color="grey lighten-1" class="mb-12" height="50px"></v-card>
            <v-btn color="primary" @click="e6 = 5">Continue</v-btn>
            <v-btn text @click="printInputs">Print</v-btn>
            <v-btn color="primary" @click="submitCreation">Create Store</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 5" step="5" :editable="e6 > 5">
            Products (optional)
          </v-stepper-step>

          <v-stepper-content step="5">
            <v-btn color="primary" @click="submitCreation">Create</v-btn>
            <v-btn text @click="printInputs">Print</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
//<v-btn text @click="e6 = e6 - 1">Cancel</v-btn>
//<small>Summarize if needed</small>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import ShowHelpDialog from "./ShowHelpDialog";
import { mapIconList } from "../helpers";
import { mapState, mapActions } from "vuex";
import EditStoreDialogDescriptionTextArea from "./editStoreDialogComponents/DescriptionTextArea";
import StoreImagesArea from "./editStoreDialogComponents/StoreImagesArea";

import { StoreImagesAreaMode } from "./editStoreDialogComponents/StoreImagesAreaMode";

import { storeService } from "../services";

export default {
  name: "CreateStoreDialog",

  props: {
    value: Boolean
  },
  mixins: [validationMixin],

  components: {
    EditStoreDialogDescriptionTextArea: EditStoreDialogDescriptionTextArea,
    ShowHelpDialog: ShowHelpDialog,
    StoreImagesArea: StoreImagesArea
  },

  validations: {
    storeTitle: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(100)
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

  data() {
    return {
      //dialog: false,
      e6: 1,
      storeTitle: "",
      storeTitleMin: 10,
      storeTitleMax: 100,
      storeSubtitle: "",
      storeDescription: "",
      storeDescriptionInvalid: true,
      editedHtmlText: "", //Variable for saved html text -> will be saved as store description in the end
      storeImages: [],
      continue3Disabled: true,
      StoreImagesAreaMode: StoreImagesAreaMode,
      imagesTextField: "",
      tagsComboBoxModel: [],
      tagsComboBoxModelMin: 1,
      tagsComboBoxModelMax: 15,
      showShowHelpDialog: false,
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
      addressLine1: "",
      postcode: "",
      city: "",
      mapIconList: mapIconList,
      mapIcon: "",
      helpDialogTitle: "",
      helpDialogMessage: ""
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
    ...mapState("account", ["user", "loggedIn"]),

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

    continue1Disabled() {
      if (this.show === true) {
        if (
          this.storeDescriptionInvalid === false &&
          !this.$v.storeTitle.$invalid &&
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

    continue2Disabled() {
      if (this.show === true) {
        if (
          !this.$v.addressLine1.$invalid &&
          !this.$v.postcode.$invalid &&
          !this.$v.city.$invalid &&
          this.mapIcon
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  },

  methods: {
    ...mapActions("account", ["setOwnedStoreId"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    printInputs() {
      console.log(this.storeTitle);
      console.log(this.storeDescription);
      console.log(this.editedHtmlText);
      console.log(this.tagsComboBoxModel);
      console.log(this.addressLine1);
      console.log(this.postcode);
      console.log(this.city);
      console.log(this.lat);
      console.log(this.lng);

      console.log(this.storesImages);
    },

    submitCreation: async function() {
      var payload = {
        userEmail: this.user.email,
        title: this.storeTitle,
        subtitle: this.storeSubtitle,
        description: this.editedHtmlText,
        tags: this.tagsComboBoxModel,
        images: this.storesImages,
        address: {
          postcode: this.postcode,
          city: this.city,
          addressLine1: this.addressLine1,
          country: "Germany"
        },
        mapIcon: this.mapIcon
      };
      console.log(payload);

      let storeId;
      try {
        const response = await storeService.createStore(payload);
        storeId = response.storeId;
      } catch (error) {
        console.log(error);
        return;
      }
      //this.createStore(payload);

      this.setOwnedStoreId(storeId);
      this.addSuccessSnackbar("Store successfully created!");
      this.show = false;
      this.cancel;
    },

    cancel() {
      this.show = false;
    },

    closeDialog() {
      this.show = false;
    },

    // description:
    changeDescriptionText(newDescription) {
      this.editedHtmlText = newDescription;
    },

    showHelp(message) {
      console.log(message);
      //this.chosenIcon = "fish";
      console.log(this.mapIcon);
      this.helpDialogTitle = "Title";
      this.helpDialogMessage = message;
      this.showShowHelpDialog = true;
    },

    setStoreImagesArray(storeImages) {
      this.storesImages = storeImages;
    },

    disableContinueButton3() {
      this.continue3Disabled = true;
    },
    enableContinueButton3() {
      this.continue3Disabled = false;
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
</style>
