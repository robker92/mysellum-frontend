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
            <v-col cols="12" sm="4" md="4" lg="4">
              <v-text-field
                v-model="firstName"
                :error-messages="firstNameErrors"
                :counter="20"
                :label="$t('registerDialog.firstNameField') + '*'"
                required
                dense
                @input="$v.firstName.$touch()"
                @blur="$v.firstName.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
              <v-text-field
                v-model="lastName"
                :error-messages="lastNameErrors"
                :counter="20"
                :label="$t('registerDialog.lastNameField') + '*'"
                required
                dense
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
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
                    dense
                    :value="birthdateFormatted"
                    :error-messages="birthDateErrors"
                    @input="$v.birthDate.$touch()"
                    @blur="$v.birthDate.$touch()"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="birthDate"
                  locale="de-de"
                  no-title
                  first-day-of-week="1"
                  @input="birthDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

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

          <v-row> </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock-question"
                :error-messages="passwordErrors"
                :label="$t('registerDialog.passwordField') + '*'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                required
                dense
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="passwordConfirmation"
                prepend-icon="mdi-lock-question"
                :error-messages="passwordConfirmationErrors"
                :label="$t('registerDialog.passwordConfField') + '*'"
                :append-icon="
                  showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'
                "
                :type="showPasswordConfirmation ? 'text' : 'password'"
                required
                dense
                @input="$v.passwordConfirmation.$touch()"
                @blur="$v.passwordConfirmation.$touch()"
                @click:append="
                  showPasswordConfirmation = !showPasswordConfirmation
                "
              />
            </v-col>
          </v-row>
          <v-row class="mt-3">
            <v-col>
              <v-text-field
                v-model="addressLine1"
                :error-messages="addressLine1Errors"
                :counter="40"
                :label="$t('registerDialog.addressLine1Field') + '*'"
                required
                dense
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
                dense
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
                dense
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
          <!-- <v-autocomplete
            id="googleAddressAutocomplete"
            ref="myid"
            v-model="addressAutocompleteModel"
            label="Address Autocomplete"
            hide-no-data
            :items="itemsAutocomplete"
            :search-input.sync="addressAutocompleteSearch"
          />
          <input
            id="googleAddressAutocomplete2"
            ref="myid2"
            placeholder="Enter your address"
            onFocus="geolocate()"
            type="text"
          /> -->
        </v-container>
        <small>* {{ $t("registerDialog.requiredFieldDescription") }}</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="fill">Fill</v-btn>
        <v-btn color="primary" text @click="cancel">{{
          $t("registerDialog.closeButton")
        }}</v-btn>
        <v-btn
          color="primary"
          :disabled="buttonIsDisabled"
          @click="submitRegistration"
          >{{ $t("registerDialog.submitButton") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { userService } from "../services";

import {
  required,
  maxLength,
  email,
  minLength,
  sameAs,
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
    phoneNumber: { required },
    birthDate: { required },
    password: {
      required,
      passwordRegexValidation,
      minLength: minLength(8),
      maxLength: maxLength(40),
    },
    passwordConfirmation: {
      required,
      passwordRegexValidation,
      minLength: minLength(8),
      maxLength: maxLength(40),
      sameAsPassword: sameAs("password"),
    },
    city: { required, minLength: minLength(3), maxLength: maxLength(20) },
    postcode: { required },
    addressLine1: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(40),
    },
    checkboxTermsConditions: {
      checked(val) {
        return val;
      },
    },
    select: { required },
  },

  props: {
    value: Boolean,
  },

  data() {
    return {
      dialog: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
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
      checkbox: false,

      itemsAutocomplete: [],
      addressAutocompleteModel: null,
      addressAutocompleteSearch: null,
      autocomplete: null,
      service: null,
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
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phoneNumber.$dirty) return errors;
      !this.$v.phoneNumber.required &&
        errors.push(this.$t("registerDialog.phoneNumberFieldRequiredError"));
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
          n: 8,
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
    checkboxTermsConditionsErrors() {
      const errors = [];
      if (!this.$v.checkboxTermsConditions.$dirty) return errors;
      !this.$v.checkboxTermsConditions.checked &&
        errors.push(
          this.$t("registerDialog.checkboxTermsConditionsRequiredError")
        );
      return errors;
    },
    birthdateFormatted() {
      if (this.birthDate == null) {
        return this.birthDate;
      } else {
        return (
          this.birthDate.substring(8, 10) +
          "." +
          this.birthDate.substring(5, 7) +
          "." +
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
        !this.$v.phoneNumber.$invalid &&
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
    },
  },
  watch: {
    value() {
      // this.$nextTick(function() {
      //   console.log("changed");
      //   let refs = this.$refs;
      //   console.log(refs.myid3);
      //   var autocompleteInput = document.querySelector(
      //     "#googleAddressAutocomplete2"
      //   );
      //   // eslint-disable-next-line no-undef
      //   this.autocomplete = new google.maps.places.Autocomplete(
      //     //this.$refs.myid2,
      //     /** @type {!HTMLInputElement} */ (autocompleteInput),
      //     { types: ["geocode"] }
      //   );
      //   this.autocomplete.setFields(["address_component"]);
      // });
    },
    async addressAutocompleteSearch() {
      if (this.addressAutocompleteSearch === "") {
        this.itemsAutocomplete = [];
      }
      console.log(this.addressAutocompleteSearch);
      let result = await this.service.getQueryPredictions(
        {
          input: this.addressAutocompleteSearch,
        },
        this.callbackFct
      );
      console.log(result);
    },
  },

  mounted() {
    // eslint-disable-next-line no-undef
    // this.service = new google.maps.places.AutocompleteService();
  },

  methods: {
    //...mapActions("account", ["register"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    async getAutocompleteItems(evt) {
      console.log(evt);
      console.log(this.addressAutocompleteSearch);
      let result = await this.service.getQueryPredictions(
        {
          input: this.addressAutocompleteSearch,
        },
        this.callbackFct
      );
      console.log(result);
    },

    callbackFct(predictions, status) {
      console.log(predictions);
      console.log(status);
      this.itemsAutocomplete = [];
      for (var i = 0; i < predictions.length; i++) {
        this.itemsAutocomplete.unshift(predictions[i].description);
      }
      console.log("hi2");
    },

    submitRegistration: async function() {
      console.log(this.birthdateFormatted);
      let user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        birthdate: this.birthdateFormatted,
        password: this.password,
        city: this.city,
        postcode: this.postcode.toString(),
        addressLine1: this.addressLine1,
      };
      
      try {
        await userService.register(user);
      } catch (errorMsg) {
        this.addErrorSnackbar(errorMsg);
        return;
      }

      this.cancel();
      this.$router.push({ name: "RegistrationVerification" });
    },

    cancel() {
      this.show = false;
      this.$v.$reset();

      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.phoneNumber = "";
      this.showPassword = false;
      this.passwordConfirmation = "";
      this.showPasswordConfirmation = false;
      this.birthDate = null;
      this.birthDateMenu = false;
      this.checkboxTermsConditions = false;
      //Address
      this.addressLine1 = "";
      this.city = "";
      this.postcode = "";
    },

    fill() {
      this.firstName = "TestFirstName";
      this.lastName = "TestLastName";
      this.email = "TestEmail@web.de";
      this.phoneNumber = "0049 10101010";
      this.password = "TestPassword1!";
      this.passwordConfirmation = "TestPassword1!";
      this.birthDate = "1997-12-09";
      //Address
      this.addressLine1 = "TestAddressLine2";
      this.city = "TestCity";
      this.postcode = 12345;
      this.checkboxTermsConditions = true;
      this.$v.$touch();
    },

    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // eslint-disable-next-line no-undef
          const circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy,
          });
          this.autocomplete.setBounds(circle.getBounds());
        });
      }
    },
  },
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

.pac-container:after {
  /* Disclaimer: not needed to show 'powered by Google' if also a Google Map is shown */

  background-image: none !important;
  height: 0px;
}
</style>
