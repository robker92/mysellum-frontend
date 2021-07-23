<template>
  <v-dialog
    v-model="show"
    max-width="60%"
    @keydown.esc="cancel"
    @keyup.enter="submitProduct()"
    @click:outside="cancel"
  >
    <v-card>
      <v-card-title>
        <span class="addProductHeadline">Create Product</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-row>
            <v-col>
              <v-text-field
                v-model="title"
                :counter="30"
                label="Title"
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
                label="Description"
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
              <v-text-field
                v-model="price"
                class="inputPrice"
                :error-messages="priceErrors"
                placeholder="Format: ##.##"
                label="Price"
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
            <v-col>
              <v-file-input
                v-model="image"
                prepend-icon="mdi-camera"
                accept="image/*"
                :label="imageLabel"
                show-size
                truncate-length="15"
                required
                :error-messages="imageErrors"
                @change="getImageBuffer()"
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
                label="Quantity type"
                required
                :error-messages="quantityTypeErrors"
                @input="$v.quantityType.$touch()"
                @blur="$v.quantityType.$touch()"
              ></v-combobox>
            </v-col>
            <v-col>
              <v-text-field
                v-model="quantityValue"
                label="Quantity"
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
              <v-radio-group v-model="radioGroup" mandatory>
                <v-radio label="Delivery only" value="delivery"></v-radio>
                <v-radio label="Pickup only" value="pickup"></v-radio>
                <v-radio
                  label="Pickup and delivery"
                  value="pickupAndDelivery"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="cancel">Close</v-btn>
        <v-btn color="primary" text @click="printData">Print</v-btn>
        <v-btn color="primary" text @click="fill">Fill</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          right
          dark
          :disabled="buttonIsDisabled"
          @click="submitProduct"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//v-model="price"
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import { mapActions } from "vuex";

import { productService, storeService } from "../../services";

const file_size_validation = (file) => {
  if (!file) {
    return true;
  }
  console.log(file);
  console.log(file.size);
  const maxFileSize = 3000000;
  return file.size <= maxFileSize; //4000000 = 4mb
  //return file.size < 100; // 100 = 100byte
};

export default {
  name: "AddProductDialog",

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
    price: { required },
    image: { required, file_size_validation },
    quantityType: { required },
    quantityValue: { required },
    delivery2: { required },
    isDelivery: {
      delivery: (val) => val === true,
    },
    isPickup: {
      pickup: (val) => val === true,
    },
    checkboxDelivery: {
      checked(val) {
        return val;
      },
    },
    checkboxPickup: {
      checked(val) {
        return val;
      },
    },
  },

  data() {
    return {
      dialog: false,
      title: "",
      description: "",
      price: "",
      pricePrefix: "€ ",
      image: null,
      imageLabel: "Upload Image*",
      imageBuffer: "",
      imageDetails: {},
      quantityType: "Kilograms",
      quantityTypeItems: ["Kilograms", "Grams", "Pieces"],
      quantityValue: "",
      radioGroup: "delivery",
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
        errors.push("The product title must be at most 30 characters long.");
      !title.minLength &&
        errors.push("The product title must be at least 5 characters long.");
      !title.required && errors.push("The product title is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.maxLength &&
        errors.push(
          "The product description must be at most 1000 characters long."
        );
      !this.$v.description.minLength &&
        errors.push(
          "The product description must be at least 20 characters long."
        );
      !this.$v.description.required &&
        errors.push("The product description is required.");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.required && errors.push("The price is required.");
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.image.$dirty) return errors;
      !this.$v.image.required &&
        errors.push("An image of the product is required.");
      !this.$v.image.file_size_validation &&
        errors.push("The image is too large");
      return errors;
    },
    quantityTypeErrors() {
      const errors = [];
      if (!this.$v.quantityType.$dirty) return errors;
      !this.$v.quantityType.required &&
        errors.push("The quantity type of the product is required.");
      return errors;
    },
    quantityValueErrors() {
      const errors = [];
      if (!this.$v.quantityValue.$dirty) return errors;
      !this.$v.quantityValue.required &&
        errors.push("The quantity value of the product is required.");
      return errors;
    },
    buttonIsDisabled() {
      if (
        !this.$v.title.$invalid &&
        !this.$v.description.$invalid &&
        !this.$v.price.$invalid &&
        //!this.$v.image.$invalid &&
        !this.$v.quantityType.$invalid &&
        !this.$v.quantityValue.$invalid
      ) {
        //Register User with input data
        return false;
      } else {
        return true;
      }
    },
  },

  watch: {
    productToEdit: function(newVal) {
      if (newVal !== null) {
        this.title = newVal.title;
        this.description = newVal.description;
        this.price = newVal.price;
        this.imageLabel = "Update Image*";
        this.imageBuffer = newVal.imgSrc;
        this.imageDetails = newVal.imageDetails;
        this.image = {
          buffer: newVal.imgSrc,
          size: newVal.imageDetails.size,
          originalname: newVal.imageDetails.originalname,
          name: newVal.imageDetails.name,
        };
        //this.image = newVal.imgSrc;
        this.delivery = newVal.delivery;
        this.pickup = newVal.pickup;
        this.quantityType = newVal.quantityType;
        this.quantityValue = newVal.quantityValue;
        this.setRadioGroup(newVal.delivery, newVal.pickup);
      }
    },
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    submitProduct: async function() {
      let pickup = false;
      let delivery = false;
      if (this.radioGroup === "pickupAndDelivery") {
        pickup = true;
        delivery = true;
      }
      if (this.radioGroup === "delivery") {
        delivery = true;
      }
      if (this.radioGroup === "pickup") {
        pickup = true;
      }
      //console.log(this.image);
      let payload = {
        storeId: this.$route.params.id,
        title: this.title,
        description: this.description,
        imgSrc: this.imageBuffer,
        imageDetails: this.imageDetails,
        price: this.price,
        currency: "EUR",
        currencySymbol: "€",
        //datetime: new Date(),
        quantityType: this.quantityType,
        quantityValue: this.quantityValue,
        delivery: delivery,
        pickup: pickup,
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
        //payload["_id"] = response.product._id;
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

    async getImageBuffer() {
      let result;
      if (!this.image) {
        return;
      }
      try {
        result = await storeService.getImageBuffer(this.image);
      } catch (error) {
        console.log(error);
        return;
      }
      //console.log(buffer);
      this.imageBuffer = result.buffer;
      this.imageDetails = result.imageDetails;
      console.log(this.imageDetails);
    },

    setRadioGroup(delivery, pickup) {
      if (delivery === true && pickup === true) {
        this.radioGroup = "pickupAndDelivery";
        return;
      }
      if (delivery === true && pickup === false) {
        this.radioGroup = "delivery";
        return;
      }
      if (delivery === false && pickup === true) {
        this.radioGroup = "pickup";
        return;
      }
    },

    cancel() {
      this.$v.$reset();
      this.title = "";
      this.description = "";
      this.price = "";
      this.image = null;
      this.imageBuffer = "";
      this.imageDetails = {};
      this.imageLabel = "Upload Image*";
      this.quantityType = "Kilograms";
      this.quantityValue = "";
      this.imageBuffer = "";
      this.radioGroup = "delivery";
      this.$emit("productToEdit-to-null");
      this.show = false;
    },

    fill() {
      this.title = "Product 1";
      this.description = "Test Test Test Test Test ";
      this.price = "1.50";
      this.pricePrefix = "€ ";
      this.quantityType = "Kilograms";
      this.quantityValue = "2";
    },

    printData() {
      console.log(this.productToEdit);
      console.log(this.description);
      console.log(this.image);
      console.log(this.productToEdit.imgSrc);
      console.log(this.quantityType);
      console.log(this.quantityValue);
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
