<template>
  <v-container>
    <v-radio-group v-model="radioGroupAddress" @change="checkValidation()">
      <v-radio :label="`Same address for billing`" value="sameBillingAddress" />
      <v-radio
        :label="`Different billing address`"
        value="differentBillingAddress"
      />
    </v-radio-group>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card flat>
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
                @input="
                  $v.shippingFirstName.$touch();
                  checkValidation();
                "
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
                @input="
                  $v.shippingLastName.$touch();
                  checkValidation();
                "
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
                @input="
                  $v.shippingAddressLine1.$touch();
                  checkValidation();
                "
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
                type="number"
                maxlength="5"
                oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
                @input="
                  $v.shippingPostcode.$touch();
                  checkValidation();
                "
                @blur="$v.shippingPostcode.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="8" md="8">
              <v-text-field
                v-model="shippingCity"
                :error-messages="shippingCityErrors"
                label="City*"
                required
                @input="
                  $v.shippingCity.$touch();
                  checkValidation();
                "
                @blur="$v.shippingCity.$touch()"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <div v-if="radioGroupAddress == 'differentBillingAddress'">
          <v-card flat>
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
                  @input="
                    $v.billingFirstName.$touch();
                    checkValidation();
                  "
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
                  @input="
                    $v.billingLastName.$touch();
                    checkValidation();
                  "
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
                  @input="
                    $v.billingAddressLine1.$touch();
                    checkValidation();
                  "
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
                  type="number"
                  maxlength="5"
                  oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
                  @input="
                    $v.billingPostcode.$touch();
                    checkValidation();
                  "
                  @blur="$v.billingPostcode.$touch()"
                />
              </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-text-field
                  v-model="billingCity"
                  :error-messages="billingCityErrors"
                  label="City*"
                  required
                  @input="
                    $v.billingCity.$touch();
                    checkValidation();
                  "
                  @blur="$v.billingCity.$touch()"
                />
              </v-col>
            </v-row>
            <!-- </v-container> -->
          </v-card>
        </div>
      </v-col>
    </v-row>

    <div class="text-h6 text-left font-weight-medium ma-4">
      Payment Method
    </div>
    <v-row>
      <v-col cols="12" xl="2">
        <v-radio-group
          v-model="radioGroupPayment"
          @change="
            checkValidation();
            writeOrderInfoToState();
          "
        >
          <v-radio :label="`Paypal`" value="paypalPayment" />
          <v-radio :label="`Credit Card`" value="creditCardPayment" />
          <v-radio :label="`Payment on invoice`" value="invoicePayment">
            <h3 v-if="radioGroupPayment == 'invoicePayment'">Test</h3>
          </v-radio>
          <v-radio
            :label="`Cash payment`"
            value="cashPayment"
            :disabled="true"
          />
        </v-radio-group>
      </v-col>

      <v-col v-if="radioGroupPayment == 'creditCardPayment'" cols="12" xl="10">
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="creditCardName"
                  label="Name on Card*"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="creditCardNumber"
                  label="Card Number*"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="creditCardExpiryDate"
                  label="Expiry Date*"
                  required
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="creditCardSecurityCode"
                  label="Security Code*"
                  required
              /></v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-btn @click="print">Print Data</v-btn>
    <v-btn @click="fill">Fill Data</v-btn>
    <v-btn @click="writeOrderInfoToState()">save</v-btn>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { userService } from "../../services";

import {
  required,
  maxLength
  //   email,
  //   minLength,
  //   sameAs
} from "vuelidate/lib/validators";
//import AddressInput from "../components/AddressInput";
import { validationMixin } from "vuelidate";

export default {
  name: "ShoppingCartCheckout",

  mixins: [validationMixin],

  components: {
    //AddressInput
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
    billingAddressLine1: { required, maxLength: maxLength(40) }
  },

  data() {
    return {
      radioGroupAddress: "sameBillingAddress",
      radioGroupPayment: "",

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

      //Credit Card Payment
      creditCardName: "",
      creditCardNumber: "",
      creditCardExpiryDate: "",
      creditCardSecurityCode: ""
    };
  },

  async mounted() {
    if (this.loggedIn == true) {
      let response = await userService.getSingleUser(this.user.email);
      console.log(response);
      this.shippingFirstName = response.firstName;
      this.shippingLastName = response.lastName;
      this.shippingAddressLine1 = response.addressLine1;
      this.shippingPostcode = response.postcode;
      this.shippingCity = response.city;
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

    checkInputFields() {
      if (
        //Shipping
        !this.$v.shippingFirstName.$invalid &&
        !this.$v.shippingLastName.$invalid &&
        !this.$v.shippingAddressLine1.$invalid &&
        !this.$v.shippingPostcode.$invalid &&
        !this.$v.shippingCity.$invalid
      ) {
        if (this.radioGroupAddress == "sameBillingAddress") {
          return false;
        } else if (
          //Billing
          !this.$v.billingFirstName.$invalid &&
          !this.$v.billingLastName.$invalid &&
          !this.$v.billingAddressLine1.$invalid &&
          !this.$v.billingPostcode.$invalid &&
          !this.$v.billingCity.$invalid
        ) {
          return false;
        } else {
          return true;
        }
        //Information valid
      } else {
        return true;
      }
    },
    checkRadioButtons() {
      return this.radioGroupPayment != "" ? false : true;
    },
    buttonIsDisabled() {
      if (this.checkInputFields == false && this.checkRadioButtons == false) {
        this.$emit("enable-step2-continue-button");
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    ...mapActions("order", ["saveOrderDataToState"]),

    fill() {
      this.shippingFirstName = "Test";
      this.shippingLastName = "Customer";
      this.shippingAddressLine1 = "Elias-Holl-Straße 54";
      this.shippingPostcode = "85049";
      this.shippingCity = "Ingolstadt";

      //Billing Address
      this.billingFirstName = "Test";
      this.billingLastName = "Customer";
      this.billingAddressLine1 = "Elias-Holl-Straße 54";
      this.billingPostcode = "85049";
      this.billingCity = "Ingolstadt";
    },
    print() {
      console.log(this.radioGroupAddress);
      console.log(this.radioGroupPayment);
      console.log(this.user);
      console.log(this.loggedIn);
      console.log(this.shippingAddressLine1);
    },
    printTest(value) {
      console.log("hi");
      this.shippingAddressLine1 = value;
    },

    checkValidation() {
      if (this.checkInputFields == false && this.checkRadioButtons == false) {
        this.$emit("step2-continue-button", false);
      } else {
        this.$emit("step2-continue-button", true);
      }
    },

    writeOrderInfoToState() {
      let orderData = {
        shippingAddress: {
          firstName: this.shippingFirstName,
          lastName: this.shippingLastName,
          addressLine1: this.shippingAddressLine1,
          city: this.shippingCity,
          postcode: this.shippingPostcode,
          country: "DE"
        },
        payment: this.radioGroupPayment
      };
      if (this.radioGroupAddress == "sameBillingAddress") {
        orderData.billingAddress = orderData.shippingAddress;
      } else {
        orderData.billingAddress = {
          firstName: this.billingFirstName,
          lastName: this.billingFirstName,
          addressLine1: this.billingAddressLine1,
          city: this.billingCity,
          postcode: this.billingPostcode,
          country: "DE"
        };
      }

      this.saveOrderDataToState(orderData);
    }
  }
};
</script>

<style></style>
