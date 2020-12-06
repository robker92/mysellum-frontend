<template>
  <v-dialog
    v-model="show"
    max-width="400px"
    @keydown.esc="cancel"
    @click:outside="cancel"
  >
    <!--  <div style="background:transparent;color:transparent">
      <v-btn color="pink" fab dark small>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div> -->
    <v-card>
      <!--  <v-btn color="pink" fab dark small absolute top right>
        <v-icon>mdi-close</v-icon>
      </v-btn> -->
      <v-card-title>
        <span class="addProductHeadline">Add Product</span>
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
                @input="checkPriceFormat"
                placeholder="Format: ##.##"
                label="Price"
                required
                :prefix="pricePrefix"
                type="number"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="image"
                label="Image"
                required
                :error-messages="imageErrors"
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="indigo" text @click="cancel">Close</v-btn>
        <v-btn color="indigo" text @click="printData">Print</v-btn>
        <v-spacer />
        <v-btn
          color="indigo"
          right
          dark
          @click="submitProduct"
          :disabled="buttonIsDisabled"
          >Save</v-btn
        >
        <!--  <v-btn
          v-else
          color="indigo"
          right
          dark
          @click="submitProduct"
          :disabled="buttonIsDisabled"
          >Edit</v-btn
        > -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//v-model="price"
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import { mapActions } from "vuex";

import { storeService } from "../services";

export default {
  name: "AddProductDialog",

  props: {
    value: Boolean,
    productToEdit: Object
  },

  mixins: [validationMixin],

  validations: {
    title: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(30)
    },
    description: {
      required,
      minLength: minLength(20),
      maxLength: maxLength(200)
    },
    price: { required },
    image: { required },
    quantityType: { required },
    quantityValue: { required }
  },

  data() {
    return {
      dialog: false,
      title: "",
      description: "",
      price: "",
      pricePrefix: "€ ",
      image: "",
      quantityType: "Kilograms",
      quantityTypeItems: ["Kilograms", "Grams", "Pieces"],
      quantityValue: ""
    };
  },

  watch: {
    productToEdit: function(newVal) {
      if (newVal != null) {
        this.title = newVal.title;
        this.description = newVal.description;
        this.price = newVal.price;
        this.image = newVal.imgSrc;
        this.quantityType = newVal.quantityType;
        this.quantityValue = newVal.quantityValue;
      }
    }
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
    imageErrors() {
      const errors = [];
      if (!this.$v.image.$dirty) return errors;
      !this.$v.image.required &&
        errors.push("An image of the product is required.");
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
        !this.$v.image.$invalid &&
        !this.$v.quantityType.$invalid &&
        !this.$v.quantityValue.$invalid
      ) {
        //Register User with input data
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    submitProduct: async function() {
      var payload = {
        storeId: this.$route.params.id,
        title: this.title,
        description: this.description,
        imgSrc: this.image,
        price: this.price,
        currency: "EUR",
        currencySymbol: "€",
        //datetime: new Date(),
        quantityType: this.quantityType,
        quantityValue: this.quantityValue
      };
      if (this.productToEdit == null) {
        //Add new product
        this.$emit("overlay-start");
        var newProduct = await storeService.addProduct(payload);
        this.$emit("add-new-product", newProduct.product);
        this.$emit("overlay-end");
        this.addSuccessSnackbar("Product was successfully added!");
      } else if (this.productToEdit != null) {
        //Edit existing product
        this.$emit("overlay-start");
        console.log(this.productToEdit.productId);
        payload["productId"] = this.productToEdit.productId;
        var updatedProduct = await storeService.editProduct(payload);
        this.$emit("update-product", updatedProduct.product);
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
    cancel() {
      this.$v.$reset();
      this.title = "";
      this.description = "";
      this.price = "";
      this.image = "";
      this.quantityType = "Kilograms";
      this.quantityValue = "";
      this.$emit("productToEdit-to-null");
      this.show = false;
    },
    printData() {
      console.log(this.productToEdit);
      console.log(this.description);
      console.log(this.image);
      console.log(this.productToEdit.imgSrc);
      console.log(this.quantityType);
      console.log(this.quantityValue);
    }
  }
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
