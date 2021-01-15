<template>
  <v-dialog v-model="show" max-width="70%" @keydown.esc="cancel">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Product Availability Notification</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row v-if="emailSendingSuccess" align="center" class="mt-1">
            <v-alert dense text type="success">
              Thank you! We will notify you as soon as the product is available
              again.
            </v-alert>
          </v-row>
          <v-row v-if="emailSendingError" align="center" class="mt-1">
            <v-alert dense text type="error">
              We are sorry, an error occurred while registering your e-mail
              address. Please try again.
            </v-alert>
          </v-row>

          <v-row v-if="loggedIn === false" class="mt-2">
            <v-text-field
              v-model="email"
              label="Email Address"
              clearable
              :error-messages="emailErrors"
              @keyup.enter="registerEmail()"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            >
              <template v-slot:append-outer>
                <v-btn
                  color="primary"
                  dark
                  small
                  :disabled="buttonIsDisabled"
                  @click="registerEmail()"
                  >Send
                </v-btn>
              </template>
            </v-text-field>
          </v-row>

          <v-row v-else>
            <v-btn color="primary" dark small @click="registerEmail()"
              >Notify me
            </v-btn>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" dark @click="close">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//
// eslint-disable-next-line no-unused-vars
import { userService, notifService } from "../services";

import { mapState } from "vuex";

import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
//
export default {
  name: "ProductAvailabilityNotificationDialog",

  mixins: [validationMixin],

  validations: {
    email: { required, email }
  },

  data() {
    return {
      //dialog: false
      email: "",
      emailSendingSuccess: false,
      emailSendingError: false
    };
  },

  props: {
    value: Boolean,
    productId: String,
    storeId: String
  },

  computed: {
    ...mapState("account", ["user", "loggedIn"]),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
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

    buttonIsDisabled() {
      if (!this.$v.email.$invalid) {
        //Register User with input data
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    async registerEmail() {
      console.log(this.productId);
      console.log(this.storeId);
      console.log(this.email);
      let email;
      if (this.loggedIn === true) {
        email = this.user.email;
      } else {
        email = this.email;
      }
      let payload = {
        email: email,
        storeId: this.storeId,
        productId: this.productId
      };
      try {
        await notifService.rgstrPrdctAvNotif(payload);
      } catch (error) {
        this.emailSendingError = true;
        return;
      }
      this.emailSendingSuccess = true;
    },
    close() {
      console.log(this.loggedIn);
      this.mail = "";
      this.show = false;
    }
  }
};
</script>

<style></style>
