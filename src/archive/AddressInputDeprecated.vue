<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="addressLine1"
          :error-messages="addressLine1Errors"
          :counter="30"
          label="Address Line 1*"
          required
          @input="touchAddressLine1"
          @blur="touchAddressLine1"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2" md="2">
        <v-text-field
          v-model="postcode"
          :error-messages="postcodeErrors"
          label="Postcode*"
          class="inputPostcode"
          required
          type="number"
          maxlength="5"
          oninput="if(Number(this.value.length) > Number(this.maxLength)) this.value = this.value.substring(0,this.value.length-1);"
          @input="$v.postcode.$touch()"
          @blur="$v.postcode.$touch()"
        />
      </v-col>
      <v-col cols="12" sm="10" md="10">
        <v-text-field
          v-model="city"
          :error-messages="cityErrors"
          label="City*"
          required
          @input="$v.city.$touch()"
          @blur="$v.city.$touch()"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//oninput="test()"
//@input="$v.addressLine1.$touch()"
import {
  required
  //   maxLength,
  //   email,
  //   minLength,
  //   sameAs
} from "vuelidate/lib/validators";
//import { helpers } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  name: "AddressInput",

  mixins: [validationMixin],

  props: {
    propAddressLine1: String,
    propPostcode: String,
    propCity: String
  },

  validations: {
    city: { required },
    postcode: { required },
    addressLine1: { required }
  },
  data() {
    return {
      //Address
      addressLine1: this.propAddressLine1,
      addressLine2: "",
      city: "",
      postcode: "",
      country: "",
      state: ""
    };
  },
  computed: {
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required && errors.push("City is required.");
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
      !this.$v.addressLine1.required && errors.push("Addressline is required.");
      return errors;
    }
  },
  methods: {
    fill() {
      //Address
      this.addressLine1 = "TestAddressLine2";
      this.city = "TestCity";
      this.postcode = 12345;
      this.$v.$touch();
    },
    touchAddressLine1() {
      this.$v.addressLine1.$touch();
      this.$emit("change-addressLine1", this.addressLine1);
    },
    testfct() {
      console.log("test");
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
