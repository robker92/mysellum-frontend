<template>
  <div>
    <v-container v-if="alreadySent === false">
      <div class="text-left text-h5">
        {{ this.$t("forgotPassword.headline") }}
      </div>
      <v-alert
        border="left"
        type="info"
        outlined
        max-width="60%"
        class="mt-5"
        dense
      >
        {{ this.$t("forgotPassword.infoAlert") }}
      </v-alert>

      <v-card class="mt-5" max-width="60%">
        <v-container>
          <v-text-field
            prepend-icon="mdi-email"
            v-model="email"
            :error-messages="emailErrors"
            :label="$t('loginDialog.emailField') + '*'"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />

          <v-menu
            v-model="birthDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
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

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              dark
              right
              @click="sendResetEmail"
              :disabled="buttonIsDisabled"
            >
              {{ this.$t("forgotPassword.sendMailButtonLabel") }}
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-container>
    <v-container v-else>
      <div text-body-1>
        E-Mail was successfully sent! Please check your mailbox and follow the
        contained link to reset your password.
      </div>
    </v-container>
    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="80"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { userService } from "../services";
import { mapActions } from "vuex";

export default {
  name: "ForgotPasswordView",

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    birthDate: { required }
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push(this.$t("loginDialog.emailFieldValidError"));
      !this.$v.email.required &&
        errors.push(this.$t("loginDialog.emailFieldRequiredError"));
      return errors;
    },
    birthDateErrors() {
      const errors = [];
      if (!this.$v.birthDate.$dirty) return errors;
      !this.$v.birthDate.required &&
        errors.push(this.$t("registerDialog.birthdateFieldRequiredError"));
      return errors;
    },
    buttonIsDisabled() {
      if (!this.$v.email.$invalid && !this.$v.birthDate.$invalid) {
        //Register User with input data
        return false;
      } else {
        return true;
      }
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
    }
  },

  data() {
    return {
      email: "",
      birthDate: null,
      birthDateMenu: false,
      alreadySent: false,
      overlay: false
    };
  },

  mounted() {
    this.alreadySent = false;
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    async sendResetEmail() {
      let payload = {
        email: this.email,
        birthdate: this.birthDateFormat
      };
      this.overlay = true;
      let response = await userService.sendResetPasswordMail(payload);
      console.log(response);
      if (response.success === true) {
        this.addSuccessSnackbar(
          "E-Mail was successfully sent to your address."
        );
        this.alreadySent = true;
      } else {
        this.addErrorSnackbar("Error while sending the password reset mail!");
      }
      this.overlay = false;
    }
  }
};
</script>

<style></style>