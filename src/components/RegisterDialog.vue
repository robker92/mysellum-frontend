<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="registrationHeadline">{{
          $t("registerDialog.dialogTitle")
        }}</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="firstName"
                :error-messages="firstNameErrors"
                :counter="20"
                :label="$t('registerDialog.firstNameField') + '*'"
                required
                @input="$v.firstName.$touch()"
                @blur="$v.firstName.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="lastName"
                :error-messages="lastNameErrors"
                :counter="20"
                :label="$t('registerDialog.lastNameField') + '*'"
                required
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                prepend-icon="mdi-email"
                v-model="email"
                :error-messages="emailErrors"
                :label="$t('registerDialog.emailField') + '*'"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-menu
                v-model="birthDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :label="$t('registerDialog.birthdateField') + '*'"
                    prepend-icon="mdi-calendar"
                    readonly
                    :value="birthDateFormat"
                    :error-messages="birthDateErrors"
                    @input="$v.birthDate.$touch()"
                    @blur="$v.birthDate.$touch()"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  locale="de-de"
                  v-model="birthDate"
                  no-title
                  @input="birthDateMenu = false"
                  first-day-of-week="1"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                prepend-icon="mdi-lock-question"
                v-model="password"
                :error-messages="passwordErrors"
                :label="$t('registerDialog.passwordField') + '*'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                prepend-icon="mdi-lock-question"
                v-model="passwordConfirmation"
                :error-messages="passwordConfirmationErrors"
                :label="$t('registerDialog.passwordConfField') + '*'"
                :append-icon="
                  showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="showPasswordConfirmation ? 'text' : 'password'"
                required
                @input="$v.passwordConfirmation.$touch()"
                @blur="$v.passwordConfirmation.$touch()"
                @click:append="
                  showPasswordConfirmation = !showPasswordConfirmation
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="addressLine1"
                :error-messages="addressLine1Errors"
                :counter="40"
                :label="$t('registerDialog.addressLine1Field') + '*'"
                required
                @input="$v.addressLine1.$touch()"
                @blur="$v.addressLine1.$touch()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field
                v-model="postcode"
                :error-messages="postcodeErrors"
                :label="$t('registerDialog.postcodeField') + '*'"
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
                :counter="20"
                :label="$t('registerDialog.cityField') + '*'"
                required
                @input="$v.city.$touch()"
                @blur="$v.city.$touch()"
              />
            </v-col>
          </v-row>
          <v-checkbox
            v-model="checkboxTermsConditions"
            :error-messages="checkboxTermsConditionsErrors"
            :label="$t('registerDialog.checkboxTermsConditions') + '*'"
            required
            @change="$v.checkboxTermsConditions.$touch()"
            @blur="$v.checkboxTermsConditions.$touch()"
          ></v-checkbox>
        </v-container>
        <small>* {{ $t("registerDialog.requiredFieldDescription") }}</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="fill">Fill</v-btn>
        <v-btn color="blue darken-1" text @click="cancel">{{
          $t("registerDialog.closeButton")
        }}</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="submitRegistration"
          :disabled="buttonIsDisabled"
          >{{ $t("registerDialog.submitButton") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/*
  <v-row>
    <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
  </v-row>
*/
//import axios from 'axios'
//import userServices from "../services/userServices";

import { mapActions } from "vuex";

import {
  required,
  maxLength,
  email,
  minLength,
  sameAs
} from "vuelidate/lib/validators";
//import passwordValidator from './customValidators/passwordValidator'
import { helpers } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

const passwordRegexValidation = helpers.regex(
  "password",
  /(?=.*[$&+,:;=_?@#|'<>.^*()%!-])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
);

export default {
  name: "RegisterDialog",

  mixins: [validationMixin],

  validations: {
    firstName: { required, maxLength: maxLength(20) },
    lastName: { required, maxLength: maxLength(20) },
    email: { required, email },
    birthDate: { required },
    password: {
      required,
      passwordRegexValidation,
      minLength: minLength(8),
      maxLength: maxLength(40)
    },
    passwordConfirmation: {
      required,
      passwordRegexValidation,
      minLength: minLength(8),
      maxLength: maxLength(40),
      sameAsPassword: sameAs("password")
    },
    city: { required, maxLength: maxLength(20) },
    postcode: { required },
    addressLine1: { required, maxLength: maxLength(40) },
    checkboxTermsConditions: {
      checked(val) {
        return val;
      }
    },
    select: { required }
    // checkbox: {
    //   checked(val) {
    //     return val;
    //   }
    // }
  },

  props: {
    value: Boolean
  },

  data() {
    return {
      dialog: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      showPassword: false,
      passwordConfirmation: "",
      showPasswordConfirmation: false,
      birthDate: null,
      birthDateMenu: false,
      checkboxTermsConditions: false,
      //Address
      addressLine1: "",
      addressLine2: "",
      city: "",
      postcode: "",
      country: "",
      state: "",

      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false
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
    } /*
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },*/,
    // selectErrors() {
    //   const errors = [];
    //   if (!this.$v.select.$dirty) return errors;
    //   !this.$v.select.required && errors.push("Item is required.");
    //   return errors;
    // },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.maxLength &&
        errors.push(this.$t("registerDialog.firstNameFieldLengthError"));
      !this.$v.firstName.required &&
        errors.push(this.$t("registerDialog.firstNameFieldRequiredError"));
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.maxLength &&
        errors.push(this.$t("registerDialog.lastNameFieldLengthError"));
      !this.$v.lastName.required &&
        errors.push(this.$t("registerDialog.lastNameFieldRequiredError"));
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push(this.$t("registerDialog.emailFieldValidError"));
      !this.$v.email.required &&
        errors.push(this.$t("registerDialog.emailFieldRequiredError"));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push(this.$t("registerDialog.passwordFieldRequiredError"));
      !this.$v.password.passwordRegexValidation &&
        errors.push(this.$t("registerDialog.passwordFieldRegexError"));
      !this.$v.password.minLength &&
        errors.push(
          this.$t("registerDialog.passwordFieldMinLengthError", { n: 8 })
        );
      !this.$v.password.maxLength &&
        errors.push(
          this.$t("registerDialog.passwordFieldMaxLengthError", { n: 40 })
        );
      return errors;
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.passwordConfirmation.$dirty) return errors;
      !this.$v.passwordConfirmation.required &&
        errors.push(this.$t("registerDialog.passwordConfFieldRequiredError"));
      !this.$v.passwordConfirmation.passwordRegexValidation &&
        errors.push(this.$t("registerDialog.passwordConfFieldRegexError"));
      !this.$v.passwordConfirmation.minLength &&
        errors.push(this.$t("registerDialog.passwordConfFieldMinLengthError"), {
          n: 8
        });
      !this.$v.password.maxLength &&
        errors.push(
          this.$t("registerDialog.passwordConfFieldMaxLengthError", { n: 40 })
        );
      !this.$v.passwordConfirmation.sameAsPassword &&
        errors.push(this.$t("registerDialog.passwordConfFieldIdenticalError"));
      return errors;
    },
    birthDateErrors() {
      const errors = [];
      if (!this.$v.birthDate.$dirty) return errors;
      !this.$v.birthDate.required &&
        errors.push(this.$t("registerDialog.birthdateFieldRequiredError"));
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required &&
        errors.push(this.$t("registerDialog.cityFieldRequiredError"));
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
      !this.$v.addressLine1.maxLength &&
        errors.push(this.$t("registerDialog.addressLine1FieldLengthError"));
      return errors;
    },

    checkboxTermsConditionsErrors() {
      const errors = [];
      if (!this.$v.checkboxTermsConditions.$dirty) return errors;
      !this.$v.checkboxTermsConditions.checked &&
        errors.push(
          this.$t("registerDialog.checkboxTermsConditionsRequiredError")
        );
      return errors;
    },
    birthDateFormat() {
      if (this.birthDate == null) {
        return this.birthDate;
      } else {
        return (
          this.birthDate.substring(8, 10) +
          "-" +
          this.birthDate.substring(5, 7) +
          "-" +
          this.birthDate.substring(0, 4)
        );
      }
    },
    buttonIsDisabled() {
      if (
        !this.$v.firstName.$invalid &&
        !this.$v.lastName.$invalid &&
        !this.$v.email.$invalid &&
        !this.$v.birthDate.$invalid &&
        !this.$v.password.$invalid &&
        !this.$v.passwordConfirmation.$invalid &&
        !this.$v.addressLine1.$invalid &&
        !this.$v.postcode.$invalid &&
        !this.$v.city.$invalid &&
        !this.$v.checkboxTermsConditions.$invalid
      ) {
        //Register User with input data
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    ...mapActions("account", ["register"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    //handleAvailabilityRequest: async function (event) {
    submitRegistration: async function() {
      /*
      if (
        !this.$v.firstName.$invalid &&
        !this.$v.lastName.$invalid &&
        !this.$v.email.$invalid &&
        !this.$v.birthDate.$invalid &&
        !this.$v.password.$invalid &&
        !this.$v.passwordConfirmation.$invalid &&
        !this.$v.addressLine1.$invalid &&
        !this.$v.postcode.$invalid &&
        !this.$v.city.$invalid
      ) {
        //Register User with input data
        this.show = false
      } else {
        this.$v.$touch()
      }
      */
      var user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        birthdate: this.birthDateFormat(),
        password: this.password,
        city: this.city,
        postcode: this.postcode,
        addressLine1: this.addressLine1
      };
      console.log(user);
      //await userServices.registerUser(requestBody);
      let response = await this.register(user);
      if (response.success === true) {
        //this.addSuccessSnackbar("Successfully registered!");
        this.show = false;
        this.$router.push({ name: "RegistrationConfirmation" });
      } else {
        //use response message
        this.addErrorSnackbar("Registration was unsuccessful!");
      }
    },

    cancel() {
      this.show = false;
      this.$v.$reset();

      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.showPassword = false;
      this.passwordConfirmation = "";
      this.showPasswordConfirmation = false;
      this.birthDate = null;
      this.birthDateMenu = false;
      //Address
      this.addressLine1 = "";
      this.city = "";
      this.postcode = "";
    },

    fill() {
      this.firstName = "TestFirstName";
      this.lastName = "TestLastName";
      this.email = "TestEmail@web.de";
      this.password = "TestPassword1!";
      this.passwordConfirmation = "TestPassword1!";
      this.birthDate = "1997-12-09";
      //Address
      this.addressLine1 = "TestAddressLine2";
      this.city = "TestCity";
      this.postcode = 12345;
      this.$v.$touch();
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
