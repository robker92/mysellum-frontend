<template>
  <v-dialog
    v-model="show"
    max-width="60%"
    @keydown.esc="cancel"
    @keyup.enter="submitProduct()"
    @click:outside="cancel"
  >
    <ShowHelpDialog
      v-model="showShowHelpDialog"
      :title="helpDialogTitle"
      :text="helpDialogMessage"
    />
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title v-if="!modeEdit">
          {{ $t("storeProfile.productDialog.headlineCreate") }}
        </v-toolbar-title>
        <v-toolbar-title v-else>
          {{ $t("storeProfile.productDialog.headlineEdit") }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- <v-card-title>
        <span class="addProductHeadline">Create Product</span>
      </v-card-title> -->
      <v-card-text>
        <v-container fluid class="ma-0 pa-0 mt-3">
          <v-row>
            <v-col>
              <v-text-field
                v-model="title"
                :counter="30"
                :label="$t('storeProfile.productDialog.title.label')"
                required
                :error-messages="titleErrors"
                @input="$v.title.$touch()"
                @blur="$v.title.$touch()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="description"
                :counter="200"
                :label="$t('storeProfile.productDialog.description.label')"
                :placeholder="
                  $t('storeProfile.productDialog.description.placeholder')
                "
                rows="2"
                auto-grow
                required
                :error-messages="descriptionErrors"
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="longDescription"
                :counter="1000"
                :label="$t('storeProfile.productDialog.longDescription.label')"
                :placeholder="
                  $t('storeProfile.productDialog.longDescription.placeholder')
                "
                rows="2"
                auto-grow
                required
                :error-messages="longDescriptionErrors"
                @input="$v.longDescription.$touch()"
                @blur="$v.longDescription.$touch()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="price"
                class="inputPrice"
                :error-messages="priceErrors"
                placeholder="Format: ##.##"
                :label="$t('storeProfile.productDialog.price.label')"
                required
                :prefix="pricePrefix"
                type="number"
                @input="
                  checkPriceFormat;
                  $v.price.$touch();
                "
                @blur="$v.price.$touch()"
              />
            </v-col>
            <!-- @change="getImageBuffer()" -->
            <!-- @change="onFileChange($event)" -->
            <!-- @input="$v.image.$touch()" -->
            <v-col>
              <v-file-input
                v-model="image"
                prepend-icon="mdi-camera"
                accept="image/*"
                :label="$t('storeProfile.productDialog.image.label')"
                show-size
                truncate-length="15"
                required
                :error-messages="imageErrors"
                @change="onFileChange($event)"
                @input="$v.image.$touch()"
                @blur="$v.image.$touch()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-combobox
                v-model="quantityType"
                :items="quantityTypeItems"
                :label="$t('storeProfile.productDialog.quantityType.label')"
                required
                :error-messages="quantityTypeErrors"
                @input="$v.quantityType.$touch()"
                @blur="$v.quantityType.$touch()"
              ></v-combobox>
            </v-col>
            <v-col>
              <v-text-field
                v-model="quantityValue"
                :label="$t('storeProfile.productDialog.quantityValue.label')"
                class="inputQuantityValue"
                required
                type="number"
                :error-messages="quantityValueErrors"
                @input="$v.quantityValue.$touch()"
                @blur="$v.quantityValue.$touch()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="text-h6 text-left">
                {{
                  $t("storeProfile.productDialog.distributionOptions.headline")
                }}:
              </div>
              <!-- <v-radio-group v-model="radioGroup" mandatory>
                <v-radio
                  :label="
                    $t(
                      'storeProfile.productDialog.distributionOptions.radios.deliveryOnly'
                    )
                  "
                  value="delivery"
                ></v-radio>
                <v-radio
                  :label="
                    $t(
                      'storeProfile.productDialog.distributionOptions.radios.pickupOnly'
                    )
                  "
                  value="pickup"
                ></v-radio>
                <v-radio
                  :label="
                    $t(
                      'storeProfile.productDialog.distributionOptions.radios.pickupAndDelivery'
                    )
                  "
                  value="pickupAndDelivery"
                ></v-radio>
              </v-radio-group> -->

              <v-checkbox
                v-model="deliveryCheckbox"
                :label="
                  $t(
                    'storeProfile.productDialog.distributionOptions.deliveryCheckbox'
                  )
                "
                hide-details
                :error-messages="distributionErrors"
                @change="
                  $v.deliveryCheckbox.$touch();
                  checkboxesTouched = true;
                "
              ></v-checkbox>
              <v-checkbox
                v-model="pickupCheckbox"
                :label="
                  $t(
                    'storeProfile.productDialog.distributionOptions.pickupCheckbox'
                  )
                "
                :error-messages="distributionErrors"
                @change="
                  $v.pickupCheckbox.$touch();
                  checkboxesTouched = true;
                "
              ></v-checkbox>
            </v-col>

            <!-- Date Info -->
            <v-col>
              <div class="text-h6 text-left">
                {{ $t("storeProfile.productDialog.info.headline") }}:
              </div>

              <v-row>
                <v-col cols="12" xs="4" sm="4" md="3" lg="3" xl="3">
                  <div class="text-body-2 text-left mt-5">
                    {{ $t("storeProfile.productDialog.info.createdLabel") }}:
                  </div>
                </v-col>
                <v-col>
                  <div
                    v-if="datetimeCreated"
                    class="text-body-2 text-left mt-5"
                  >
                    {{ datetimeCreated }}
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xs="4" sm="4" md="3" lg="3" xl="3">
                  <div class="text-body-2 text-left">
                    {{ $t("storeProfile.productDialog.info.editedLabel") }}:
                  </div>
                </v-col>
                <v-col>
                  <div v-if="datetimeEdited" class="text-body-2 text-left">
                    {{ datetimeEdited }}
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <!-- <v-col cols="12" xs="4" sm="4" md="3" lg="3" xl="3">
                  <div class="text-body-2 text-left">
                    {{ $t("storeProfile.productDialog.info.activeLabel") }}:
                  </div>
                </v-col>
                <v-col> -->
                <!-- <div v-if="datetimeEdited" class="text-body-2 text-left">
                    {{ datetimeEdited }}
                    :label="`Switch 1: ${switch1.toString()}`"
                  </div> -->
                <v-switch
                  v-model="activeSwitch"
                  :label="$t('storeProfile.productDialog.info.activeLabel')"
                  append-icon="mdi-information"
                  @click:append="
                    showHelp(
                      'Product Activation Switch',
                      'Using the switch you can control if a product can be seen and purchased by customers.'
                    )
                  "
                ></v-switch>
                <!-- </v-col> -->
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn color="primary" text @click="cancel">Close</v-btn> -->
        <v-btn color="primary" text @click="printData">Print</v-btn>
        <v-btn color="primary" text @click="fill">Fill</v-btn>
        <v-spacer />
        <v-btn color="primary" text @click="cancel">
          {{ $t("storeProfile.productDialog.actions.closeButton") }}
        </v-btn>
        <v-btn
          color="primary"
          right
          :dark="!buttonIsDisabled"
          :disabled="buttonIsDisabled"
          @click="submitProduct"
        >
          {{ $t("storeProfile.productDialog.actions.saveButton") }}
          <!-- <v-icon>mdi-content-save</v-icon> -->
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { mapActions } from "vuex";
import ShowHelpDialog from "../ShowHelpDialog";
import { productService } from "../../services";

import {
  getDateFormatDDMMYYYY,
  getTimeFromIsoDate,
  getImgBase64,
} from "../../helpers";

const file_size_validation = (file) => {
  // console.log(file);
  if (!file) {
    return true;
  }
  // console.log(file);
  // console.log(file.size);
  const maxFileSize = 3000000;
  return file.size <= maxFileSize; //4000000 = 4mb
  //return file.size < 100; // 100 = 100byte
};

const checked = (value) => {
  return value === true;
};

export default {
  name: "AddProductDialog",

  components: {
    ShowHelpDialog: ShowHelpDialog,
  },

  mixins: [validationMixin],

  props: {
    value: Boolean,
    productToEdit: Object,
  },

  validations: {
    title: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(30),
    },
    description: {
      required,
      minLength: minLength(20),
      maxLength: maxLength(200),
    },
    longDescription: {
      maxLength: maxLength(1000),
    },
    price: { required },
    image: { required, file_size_validation },
    quantityType: { required },
    quantityValue: { required },
    deliveryCheckbox: {
      checked: checked,
    },
    pickupCheckbox: {
      checked: checked,
    },
  },

  data() {
    return {
      dialog: false,
      modeEdit: false,
      title: "",
      description: "",
      longDescription: "",
      price: "",
      pricePrefix: "€ ",
      image: null,
      imageBuffer: "",
      imageDetails: {},
      quantityType: "Kilograms",
      quantityTypeItems: ["Kilograms", "Grams", "Pieces"],
      quantityValue: "",
      radioGroup: "delivery",
      deliveryCheckbox: false,
      pickupCheckbox: false,
      checkboxesTouched: false,
      datetimeCreated: "",
      datetimeEdited: "",
      activeSwitch: false,

      // Help Dialog
      showShowHelpDialog: false,
      helpDialogTitle: "",
      helpDialogMessage: "",
    };
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
    titleErrors() {
      const errors = [];
      var title = this.$v.title;
      if (!title.$dirty) return errors;
      !title.maxLength &&
        errors.push(
          this.$t("storeProfile.productDialog.title.errors.maxLength")
        );
      !title.minLength &&
        errors.push(
          this.$t("storeProfile.productDialog.title.errors.minLength")
        );
      !title.required &&
        errors.push(
          this.$t("storeProfile.productDialog.title.errors.required")
        );
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.maxLength &&
        errors.push(
          this.$t("storeProfile.productDialog.description.errors.maxLength")
        );
      !this.$v.description.minLength &&
        errors.push(
          this.$t("storeProfile.productDialog.description.errors.minLength")
        );
      !this.$v.description.required &&
        errors.push(
          this.$t("storeProfile.productDialog.description.errors.required")
        );
      return errors;
    },
    longDescriptionErrors() {
      const errors = [];
      if (!this.$v.longDescription.$dirty) return errors;
      !this.$v.longDescription.maxLength &&
        errors.push(
          this.$t("storeProfile.productDialog.longDescription.errors.maxLength")
        );
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.required &&
        errors.push(
          this.$t("storeProfile.productDialog.price.errors.required")
        );
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.image.$dirty) return errors;
      !this.$v.image.required &&
        errors.push(
          this.$t("storeProfile.productDialog.image.errors.required")
        );
      !this.$v.image.file_size_validation &&
        errors.push(
          this.$t("storeProfile.productDialog.image.errors.fileSize")
        );
      return errors;
    },
    quantityTypeErrors() {
      const errors = [];
      if (!this.$v.quantityType.$dirty) return errors;
      !this.$v.quantityType.required &&
        errors.push(
          this.$t("storeProfile.productDialog.quantityType.errors.required")
        );
      return errors;
    },
    quantityValueErrors() {
      const errors = [];
      if (!this.$v.quantityValue.$dirty) return errors;
      !this.$v.quantityValue.required &&
        errors.push(
          this.$t("storeProfile.productDialog.quantityValue.errors.required")
        );
      return errors;
    },
    distributionErrors() {
      const errors = [];

      if (!this.$v.pickupCheckbox.$dirty && !this.$v.deliveryCheckbox.$dirty)
        return errors;
      // if (this.$v.pickupCheckbox.checked || this.$v.deliveryCheckbox.checked)
      //   return errors;
      if (
        !this.$v.pickupCheckbox.checked &&
        !this.$v.deliveryCheckbox.checked &&
        this.checkboxesTouched
      ) {
        errors.push("You have to choose either delivery or pick-up.");
      }
      return errors;
    },
    buttonIsDisabled() {
      if (
        !this.$v.title.$invalid &&
        !this.$v.description.$invalid &&
        !this.$v.longDescription.$invalid &&
        !this.$v.price.$invalid &&
        !this.$v.image.$invalid &&
        !this.$v.quantityType.$invalid &&
        !this.$v.quantityValue.$invalid &&
        (!this.$v.deliveryCheckbox.$invalid || !this.$v.pickupCheckbox.$invalid)
      ) {
        // Button is not disabled
        return false;
      } else {
        return true;
      }
    },
  },

  watch: {
    productToEdit: function(newVal) {
      if (newVal !== null) {
        console.log(newVal);
        this.modeEdit = true;
        this.title = newVal.title;
        this.description = newVal.description;
        this.longDescription = newVal.longDescription;
        this.price = newVal.price;
        this.imageBuffer = newVal.imgSrc;
        this.imageDetails = newVal.imageDetails;
        this.image = {
          buffer: newVal.imgSrc,
          size: newVal.imageDetails.size,
          originalname: newVal.imageDetails.originalname,
          name: newVal.imageDetails.name,
        };
        //this.image = newVal.imgSrc;
        this.pickupCheckbox = newVal.pickup;
        this.deliveryCheckbox = newVal.delivery;
        this.activeSwitch = newVal.active;
        // this.delivery = newVal.delivery;
        // this.pickup = newVal.pickup;
        this.quantityType = newVal.quantityType;
        this.quantityValue = newVal.quantityValue;
        // this.setRadioGroup(newVal.delivery, newVal.pickup);
        this.datetimeCreated =
          getDateFormatDDMMYYYY(newVal.datetimeCreated) +
          " " +
          getTimeFromIsoDate(newVal.datetimeCreated);
        this.datetimeEdited = newVal.datetimeAdjusted
          ? getDateFormatDDMMYYYY(newVal.datetimeAdjusted) +
            " " +
            getTimeFromIsoDate(newVal.datetimeAdjusted)
          : "/";
      }
    },
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    submitProduct: async function() {
      let payload = {
        storeId: this.$route.params.id,
        title: this.title,
        description: this.description,
        longDescription: this.longDescription,
        imgSrc: this.imageBuffer,
        imageDetails: this.imageDetails,
        price: this.price,
        currency: "EUR",
        currencySymbol: "€",
        quantityType: this.quantityType,
        quantityValue: this.quantityValue,
        delivery: this.deliveryCheckbox,
        pickup: this.pickupCheckbox,
        active: this.activeSwitch,
        stockAmount: 1,
      };

      if (this.productToEdit === null) {
        //Add new product
        console.log("details");
        console.log(payload.imageDetails);
        this.$emit("overlay-start");
        //let newProduct;
        let response;
        try {
          response = await productService.createProduct(payload);
        } catch (error) {
          this.$emit("overlay-end");
          return;
        }
        this.$emit("add-new-product", response.product);
        this.$emit("overlay-end");
        this.addSuccessSnackbar("Product was successfully added!");
        //
      } else if (this.productToEdit !== null) {
        //Edit existing product
        console.log(this.productToEdit._id);
        this.$emit("overlay-start");
        //console.log(this.productToEdit.productId);
        payload["_id"] = this.productToEdit._id;
        let response;
        try {
          response = await productService.editProduct(payload);
        } catch (error) {
          this.$emit("overlay-end");
          return;
        }

        this.$emit("update-product", response.product);
        this.$emit("recalculate-max-price");
        this.$emit("overlay-end");
        this.addSuccessSnackbar("Product was successfully edited!");
      }
      this.cancel();
    },

    checkPriceFormat() {
      //test.substr(test.indexOf(".")+1,2)
      if (this.price.indexOf(".") == -1) {
        console.log(this.price.indexOf("."));
        console.log(this.price);
        //this.price = this.price + ".00";
      }
    },

    async onFileChange(file) {
      console.log(file);
      if (!file) {
        this.image = null;
        this.imageBuffer = "";
        this.imageDetails = {};
        return;
      }

      let buffer;
      try {
        buffer = await getImgBase64(file);
        // const result = await storeService.getImageBuffer(this.image);
        // buffer = result.buffer;
        // console.log(buffer);
      } catch (error) {
        return;
      }

      this.imageBuffer = buffer;
      this.imageDetails = {
        size: file.size,
        originalname: file.name,
        name: file.name,
      };
    },

    showHelp(title, message) {
      this.helpDialogTitle = title;
      this.helpDialogMessage = message;
      this.showShowHelpDialog = true;
    },

    cancel() {
      this.$v.$reset();
      this.title = "";
      this.description = "";
      this.longDescription = "";
      this.price = "";
      this.image = null;
      this.imageBuffer = "";
      this.imageDetails = {};
      this.quantityType = "Kilograms";
      this.quantityValue = "";
      this.imageBuffer = "";
      this.radioGroup = "delivery";
      this.pickupCheckbox = false;
      this.deliveryCheckbox = false;
      this.activeSwitch = false;
      this.modeEdit = false;
      this.helpDialogTitle = "";
      this.helpDialogMessage = "";
      this.$emit("productToEdit-to-null");
      this.show = false;
    },

    fill() {
      this.title = "Product 1";
      this.description = "Test Test Test Test Test ";
      this.longDescription =
        "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ";
      this.price = "1.50";
      this.pricePrefix = "€ ";
      this.quantityType = "Kilograms";
      this.quantityValue = "2";
      this.deliveryCheckbox = true;
      this.activeSwitch = true;
    },

    printData() {
      console.log(this.productToEdit);
      console.log(this.description);
      console.log(this.longDescription);
      console.log(this.image);
      console.log(this.productToEdit.imgSrc);
      console.log(this.quantityType);
      console.log(this.quantityValue);
      console.log(this.pickupCheckbox);
      console.log(this.deliveryCheckbox);
      console.log(this.activeSwitch);
    },
  },
};
</script>

<style>
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.inputQuantityValue input[type="number"] {
  -moz-appearance: textfield;
}
.inputQuantityValue input::-webkit-outer-spin-button,
.inputQuantityValue input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
