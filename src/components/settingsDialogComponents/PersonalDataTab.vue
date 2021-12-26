<template>
  <v-card class="ma-3">
    <v-container>
      <v-row class="mt-3">
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="email"
            prepend-icon="mdi-email"
            :error-messages="emailErrors"
            :label="$t('registerDialog.emailField') + '*'"
            required
            dense
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="phoneNumber"
            prepend-icon="mdi-phone"
            :error-messages="phoneNumberErrors"
            :label="$t('registerDialog.phoneNumberField') + '*'"
            required
            dense
            @input="$v.phoneNumber.$touch()"
            @blur="$v.phoneNumber.$touch()"
          />
        </v-col>
      </v-row>
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
    </v-container>
  </v-card>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "PersonalDataTab",

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    phoneNumber: { required },
    city: { required, minLength: minLength(3), maxLength: maxLength(20) },
    postcode: { required },
    addressLine1: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(40),
    },
  },

  props: {
    userData: Object,
  },

  data() {
    return {
      email: "",
      phoneNumber: "",

      // Location
      addressLine1: "",
      postcode: "",
      city: "",
    };
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push(this.$t("registerDialog.emailFieldValidError"));
      !this.$v.email.required &&
        errors.push(this.$t("registerDialog.emailFieldRequiredError"));
      return errors;
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phoneNumber.$dirty) return errors;
      !this.$v.phoneNumber.required &&
        errors.push(this.$t("registerDialog.phoneNumberFieldRequiredError"));
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required &&
        errors.push(this.$t("registerDialog.cityFieldRequiredError"));
      !this.$v.city.minLength &&
        errors.push(this.$t("registerDialog.cityFieldMinLengthError"));
      !this.$v.city.maxLength &&
        errors.push(this.$t("registerDialog.cityFieldLengthError"));
      return errors;
    },
    postcodeErrors() {
      const errors = [];
      if (!this.$v.postcode.$dirty) return errors;
      !this.$v.postcode.required &&
        errors.push(this.$t("registerDialog.postcodeFieldRequiredError"));
      return errors;
    },
    addressLine1Errors() {
      const errors = [];
      if (!this.$v.addressLine1.$dirty) return errors;
      !this.$v.addressLine1.required &&
        errors.push(this.$t("registerDialog.addressLine1FieldRequiredError"));
      !this.$v.addressLine1.minLength &&
        errors.push(this.$t("registerDialog.cityFieldMinLengthError"));
      !this.$v.addressLine1.maxLength &&
        errors.push(this.$t("registerDialog.addressLine1FieldLengthError"));
      return errors;
    },
  },

  watch: {
    userData: function(newVal) {
      if (newVal !== null) {
        console.log(newVal);
        this.email = newVal.email;
        this.phoneNumber = newVal.phoneNumber;

        // Location
        this.addressLine1 = newVal.addressLine1;
        this.postcode = newVal.postcode;
        this.city = newVal.city;
      }
    },
    email: function(newVal) {
      if (newVal) {
        this.validatePersonalData();
      }
    },
    phoneNumber: function(newVal) {
      if (newVal) {
        this.validatePersonalData();
      }
    },
    addressLine1: function(newVal) {
      if (newVal) {
        this.validatePersonalData();
      }
    },
    postcode: function(newVal) {
      if (newVal) {
        this.validatePersonalData();
      }
    },
    city: function(newVal) {
      if (newVal) {
        this.validatePersonalData();
      }
    },
  },

  methods: {
    validatePersonalData() {
      if (
        !this.$v.email.$invalid &&
        !this.$v.phoneNumber.$invalid &&
        !this.$v.city.$invalid &&
        !this.$v.postcode.$invalid &&
        !this.$v.addressLine1.$invalid
      ) {
        // Personal Data is valid
        this.$emit("personal-data-validation", true);
        return;
      } else {
        // not valid
        this.$emit("personal-data-validation", false);
        return;
      }
    },
  },
};
</script>

<style></style>
