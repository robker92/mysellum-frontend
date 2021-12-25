<template>
  <div>
    <div class="text-h5 text-left font-weight-medium mt-3">
      Delivery / Pickup
    </div>
    <v-container>
      <v-alert type="info" text dense class="text-left">
        Please consider: If you choose pickup, you have to go to the store (see
        its address and opening hours) to pick them up.
      </v-alert>

      <v-radio-group
        v-model="radioGroupDelivery"
        @change="
          checkValidation();
          writeOrderInfoToState();
        "
      >
        <v-radio
          :label="
            `Delivery ${
              !deliveryAvailable
                ? '(not available for all products in your cart)'
                : ''
            }`
          "
          value="delivery"
          :disabled="!deliveryAvailable"
        />
        <v-radio
          :label="
            `Pickup ${
              !pickupAvailable
                ? '(not available for all products in your cart)'
                : ''
            }`
          "
          value="pickup"
          :disabled="!pickupAvailable"
        />
      </v-radio-group>
    </v-container>

    <div v-if="radioGroupDelivery === 'delivery'">
      <div class="text-h5 text-left font-weight-medium">
        Addresses
      </div>
      <v-container>
        <v-radio-group
          v-model="radioGroupAddress"
          @change="
            checkValidation();
            writeOrderInfoToState();
          "
        >
          <v-radio
            :label="`Same address for billing`"
            value="sameBillingAddress"
          />
          <v-radio
            :label="`Different billing address`"
            value="differentBillingAddress"
          />
        </v-radio-group>
        <v-row>
          <v-col cols="12" lg="6">
            <v-card>
              <v-container>
                <div class="text-h6 text-left font-weight-medium mb-4">
                  Shipping Address
                </div>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="shippingFirstName"
                      :error-messages="shippingFirstNameErrors"
                      :counter="20"
                      label="First Name*"
                      required
                      dense
                      @input="$v.shippingFirstName.$touch()"
                      @blur="$v.shippingFirstName.$touch()"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="shippingLastName"
                      :error-messages="shippingLastNameErrors"
                      :counter="20"
                      label="Last Name*"
                      required
                      dense
                      @input="$v.shippingLastName.$touch()"
                      @blur="$v.shippingLastName.$touch()"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="shippingAddressLine1"
                      :error-messages="shippingAddressLine1Errors"
                      :counter="40"
                      label="Address Line 1*"
                      required
                      dense
                      @input="$v.shippingAddressLine1.$touch()"
                      @blur="$v.shippingAddressLine1.$touch()"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="shippingPostcode"
                      :error-messages="shippingPostcodeErrors"
                      label="Postcode*"
                      class="inputPostcode"
                      required
                      dense
                      type="number"
                      maxlength="5"
                      oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
                      @input="$v.shippingPostcode.$touch()"
                      @blur="$v.shippingPostcode.$touch()"
                    />
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-text-field
                      v-model="shippingCity"
                      :error-messages="shippingCityErrors"
                      label="City*"
                      required
                      dense
                      @input="$v.shippingCity.$touch()"
                      @blur="$v.shippingCity.$touch()"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <div v-if="radioGroupAddress == 'differentBillingAddress'">
              <v-card>
                <v-container>
                  <div class="text-h6 text-left font-weight-medium mb-4">
                    Billing Address
                  </div>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="billingFirstName"
                        :error-messages="billingFirstNameErrors"
                        :counter="20"
                        label="First Name*"
                        required
                        dense
                        @input="$v.billingFirstName.$touch()"
                        @blur="$v.billingFirstName.$touch()"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="billingLastName"
                        :error-messages="billingLastNameErrors"
                        :counter="20"
                        label="Last Name*"
                        required
                        dense
                        @input="$v.billingLastName.$touch()"
                        @blur="$v.billingLastName.$touch()"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="billingAddressLine1"
                        :error-messages="billingAddressLine1Errors"
                        :counter="40"
                        label="Address Line 1*"
                        required
                        dense
                        @input="$v.billingAddressLine1.$touch()"
                        @blur="$v.billingAddressLine1.$touch()"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field
                        v-model="billingPostcode"
                        :error-messages="billingPostcodeErrors"
                        label="Postcode*"
                        class="inputPostcode"
                        required
                        dense
                        type="number"
                        maxlength="5"
                        oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
                        @input="$v.billingPostcode.$touch()"
                        @blur="$v.billingPostcode.$touch()"
                      />
                    </v-col>
                    <v-col cols="12" sm="8" md="8">
                      <v-text-field
                        v-model="billingCity"
                        :error-messages="billingCityErrors"
                        label="City*"
                        required
                        dense
                        @input="$v.billingCity.$touch()"
                        @blur="$v.billingCity.$touch()"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="radioGroupDelivery === 'pickup'">
      <div class="text-h5 text-left font-weight-medium">
        Billing Address
      </div>
      <v-container>
        <v-card>
          <v-container>
            <div class="text-h6 text-left font-weight-medium mb-4">
              Billing Address
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="billingFirstName"
                  :error-messages="billingFirstNameErrors"
                  :counter="20"
                  label="First Name*"
                  required
                  dense
                  @input="$v.billingFirstName.$touch()"
                  @blur="$v.billingFirstName.$touch()"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="billingLastName"
                  :error-messages="billingLastNameErrors"
                  :counter="20"
                  label="Last Name*"
                  required
                  dense
                  @input="$v.billingLastName.$touch()"
                  @blur="$v.billingLastName.$touch()"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="billingAddressLine1"
                  :error-messages="billingAddressLine1Errors"
                  :counter="40"
                  label="Address Line 1*"
                  required
                  dense
                  @input="$v.billingAddressLine1.$touch()"
                  @blur="$v.billingAddressLine1.$touch()"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="billingPostcode"
                  :error-messages="billingPostcodeErrors"
                  label="Postcode*"
                  class="inputPostcode"
                  required
                  dense
                  type="number"
                  maxlength="5"
                  oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
                  @input="$v.billingPostcode.$touch()"
                  @blur="$v.billingPostcode.$touch()"
                />
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field
                  v-model="billingCity"
                  :error-messages="billingCityErrors"
                  label="City*"
                  required
                  dense
                  @input="$v.billingCity.$touch()"
                  @blur="$v.billingCity.$touch()"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { userService } from "../../services";

import {
  required,
  maxLength,
  //   email,
  //   minLength,
  //   sameAs
} from "vuelidate/lib/validators";
//import AddressInput from "../components/AddressInput";
import { validationMixin } from "vuelidate";

export default {
  name: "ShoppingCartCheckout",

  components: {
    //AddressInput
  },

  mixins: [validationMixin],

  props: {
    pickupAvailable: Boolean,
    deliveryAvailable: Boolean,
  },

  validations: {
    shippingFirstName: { required, maxLength: maxLength(20) },
    shippingLastName: { required, maxLength: maxLength(20) },
    shippingCity: { required, maxLength: maxLength(20) },
    shippingPostcode: { required },
    shippingAddressLine1: { required, maxLength: maxLength(40) },

    billingFirstName: { required, maxLength: maxLength(20) },
    billingLastName: { required, maxLength: maxLength(20) },
    billingCity: { required },
    billingPostcode: { required },
    billingAddressLine1: { required, maxLength: maxLength(40) },
  },

  data() {
    return {
      radioGroupAddress: "sameBillingAddress",
      radioGroupDelivery: "delivery",

      // Shipping Address
      shippingFirstName: "",
      shippingLastName: "",
      shippingAddressLine1: "",
      shippingPostcode: "",
      shippingCity: "",

      //Billing Address
      billingFirstName: "",
      billingLastName: "",
      billingAddressLine1: "",
      billingPostcode: "",
      billingCity: "",
    };
  },

  watch: {
    shippingFirstName: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    shippingLastName: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    shippingAddressLine1: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    shippingPostcode: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    shippingCity: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    billingFirstName: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    billingLastName: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    billingAddressLine1: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    billingPostcode: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
    billingCity: function(newVal) {
      if (newVal) {
        this.inputChangedRoutine();
      }
    },
  },

  async mounted() {
    if (this.loggedIn == true) {
      console.log(this.user.email);
      let response;
      try {
        response = await userService.getSingleUser();
      } catch (error) {
        console.log(error);
        // TODO emit event which blocks the further process
        return;
      }

      console.log(response);
      this.shippingFirstName = response.user.firstName;
      this.shippingLastName = response.user.lastName;
      this.shippingAddressLine1 = response.user.addressLine1;
      this.shippingPostcode = response.user.postcode;
      this.shippingCity = response.user.city;

      // this.emptyOrderDataSuccess();
      this.writeOrderInfoToState();
      // this.checkValidation();

      return;
    }
  },

  computed: {
    ...mapState("account", ["user", "loggedIn"]),
    //Shipping
    shippingFirstNameErrors() {
      const errors = [];
      if (!this.$v.shippingFirstName.$dirty) return errors;
      !this.$v.shippingFirstName.maxLength &&
        errors.push("First name must be at most 20 characters long.");
      !this.$v.shippingFirstName.required &&
        errors.push("First name is required.");
      return errors;
    },
    shippingLastNameErrors() {
      const errors = [];
      if (!this.$v.shippingLastName.$dirty) return errors;
      !this.$v.shippingLastName.maxLength &&
        errors.push("Last name must be at most 20 characters long.");
      !this.$v.shippingLastName.required &&
        errors.push("Last name is required.");
      return errors;
    },
    shippingCityErrors() {
      const errors = [];
      if (!this.$v.shippingCity.$dirty) return errors;
      !this.$v.shippingCity.required && errors.push("City is required.");
      return errors;
    },
    shippingPostcodeErrors() {
      const errors = [];
      if (!this.$v.shippingPostcode.$dirty) return errors;
      !this.$v.shippingPostcode.required &&
        errors.push("Postcode is required.");
      return errors;
    },
    shippingAddressLine1Errors() {
      const errors = [];
      if (!this.$v.shippingAddressLine1.$dirty) {
        return errors;
      }
      if (!this.$v.shippingAddressLine1.required) {
        errors.push("Addressline is required.");
      }
      if (!this.$v.shippingAddressLine1.maxLength) {
        errors.push("The address line must be at most 40 characters long.");
      }
      return errors;
    },

    //Billing
    billingFirstNameErrors() {
      const errors = [];
      if (!this.$v.billingFirstName.$dirty) return errors;
      !this.$v.billingFirstName.maxLength &&
        errors.push("First name must be at most 20 characters long.");
      !this.$v.billingFirstName.required &&
        errors.push("First name is required.");
      return errors;
    },
    billingLastNameErrors() {
      const errors = [];
      if (!this.$v.billingLastName.$dirty) return errors;
      !this.$v.billingLastName.maxLength &&
        errors.push("Last name must be at most 20 characters long.");
      !this.$v.billingLastName.required &&
        errors.push("Last name is required.");
      return errors;
    },
    billingCityErrors() {
      const errors = [];
      if (!this.$v.billingCity.$dirty) return errors;
      !this.$v.billingCity.required && errors.push("City is required.");
      return errors;
    },
    billingPostcodeErrors() {
      const errors = [];
      if (!this.$v.billingPostcode.$dirty) return errors;
      !this.$v.billingPostcode.required && errors.push("Postcode is required.");
      return errors;
    },
    billingAddressLine1Errors() {
      const errors = [];
      if (!this.$v.billingAddressLine1.$dirty) return errors;
      !this.$v.billingAddressLine1.required &&
        errors.push("Addressline is required.");
      !this.$v.billingAddressLine1.maxLength &&
        errors.push("The address line must be at most 40 characters long.");
      return errors;
    },

    checkShippingAddressValid() {
      if (
        //Shipping
        !this.$v.shippingFirstName.$invalid &&
        !this.$v.shippingLastName.$invalid &&
        !this.$v.shippingAddressLine1.$invalid &&
        !this.$v.shippingPostcode.$invalid &&
        !this.$v.shippingCity.$invalid
      ) {
        // address is valid
        return true;
      } else {
        // not valid
        return false;
      }
    },

    checkBillingAddressValid() {
      if (
        //Shipping
        !this.$v.billingFirstName.$invalid &&
        !this.$v.billingLastName.$invalid &&
        !this.$v.billingAddressLine1.$invalid &&
        !this.$v.billingPostcode.$invalid &&
        !this.$v.billingCity.$invalid
      ) {
        // address is valid
        return true;
      } else {
        // not valid
        return false;
      }
    },

    checkInputFieldsValid() {
      if (this.radioGroupDelivery === "delivery") {
        if (this.checkShippingAddressValid) {
          // shipping address valid
          if (this.radioGroupAddress === "sameBillingAddress") {
            return true;
          } else if (
            //Billing
            this.checkBillingAddressValid
          ) {
            // billing address is also valid
            return true;
          } else {
            // not valid
            return false;
          }
        } else {
          // not valid
          return false;
        }
      } else {
        if (
          //Billing
          this.checkBillingAddressValid
        ) {
          return true;
        } else {
          return false;
        }
      }
    },

    checkValidation() {
      if (this.checkInputFieldsValid) {
        this.$emit("step2-continue-button", false);
        return false;
      } else {
        console.log(`hi`);
        this.writeOrderInfoToState();
        this.$emit("step2-continue-button", true);
        return true;
      }
    },

    checkRadioButtons() {
      return this.radioGroupPayment != "" ? false : true;
    },
  },

  methods: {
    ...mapActions("order", ["saveOrderDataToState", "emptyOrderDataSuccess"]),

    inputChangedRoutine() {
      this.writeOrderInfoToState();
      // this.checkValidation();
    },

    getShippingAddress() {
      return {
        firstName: this.shippingFirstName,
        lastName: this.shippingLastName,
        addressLine1: this.shippingAddressLine1,
        city: this.shippingCity,
        postcode: this.shippingPostcode,
        country: "DE",
      };
    },

    getBillingAddress() {
      return {
        firstName: this.billingFirstName,
        lastName: this.billingFirstName,
        addressLine1: this.billingAddressLine1,
        city: this.billingCity,
        postcode: this.billingPostcode,
        country: "DE",
      };
    },

    writeOrderInfoToState() {
      let orderData;
      if (this.radioGroupDelivery === "delivery") {
        orderData = {
          deliveryMethod: "delivery",
          shippingAddress: this.getShippingAddress(),
        };
        if (this.radioGroupAddress === "sameBillingAddress") {
          orderData.billingAddress = orderData.shippingAddress;
        } else {
          orderData.billingAddress = this.getBillingAddress();
        }
      } else if (this.radioGroupDelivery === "pickup") {
        orderData = {
          deliveryMethod: "pickup",
          billingAddress: this.getBillingAddress(),
        };
      }
      console.log(orderData);
      this.saveOrderDataToState(orderData);
    },
  },
};
</script>

<style></style>
