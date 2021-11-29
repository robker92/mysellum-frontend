<template>
  <v-container>
    <div v-if="alreadySent === false">
      <div class="text-left text-h5">
        {{ this.$t("forgotPassword.headline") }}
      </div>
      <v-alert border="left" type="info" outlined class="mt-5" dense>
        {{ this.$t("forgotPassword.infoAlert") }}
      </v-alert>

      <v-card class="mt-5 text-center">
        <v-container>
          <v-text-field
            v-model="email"
            prepend-icon="mdi-email"
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
              v-model="birthDate"
              locale="de-de"
              no-title
              first-day-of-week="1"
              @input="birthDateMenu = false"
            ></v-date-picker>
          </v-menu>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              dark
              right
              :disabled="buttonIsDisabled"
              @click="sendResetEmail"
            >
              {{ this.$t("forgotPassword.sendMailButtonLabel") }}
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </div>
    <div v-else>
      <v-row align="center">
        <v-spacer />
        <v-col cols="12" sm="2" md="2" lg="2">
          <v-img src="../assets/undraw-images/undraw_Mail_sent.svg" />
          <!-- <v-icon color="primary">mdi-lock-check</v-icon> -->
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6">
          <div class="text-body-1 text-left">
            {{ this.$t("forgotPassword.successfullySentBody") }}
          </div>
        </v-col>
        <v-spacer />
      </v-row>
    </div>
    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="80"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { userService } from "../services";
import { mapActions } from "vuex";

export default {
  name: "ResendVerificationEmailView",

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    birthDate: { required },
  },

  data() {
    return {
      email: "",
      birthDate: null,
      birthDateMenu: false,
      alreadySent: false,
      overlay: false,
    };
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
          "." +
          this.birthDate.substring(5, 7) +
          "." +
          this.birthDate.substring(0, 4)
        );
      }
    },
  },

  mounted() {
    this.alreadySent = false;
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    async sendResetEmail() {
      let payload = {
        email: this.email,
        birthdate: this.birthDateFormat,
      };
      this.overlay = true;
      try {
        await userService.resendVerificationEmail(payload);
        this.addSuccessSnackbar(this.$t("forgotPassword.sendMailSuccess"));
        this.alreadySent = true;
      } catch (error) {
        let msg;
        if (error.response.data.type === "whileSending") {
          msg = this.$t("forgotPassword.sendMailWhileSendingError");
        } else if (error.response.data.type === "notFound") {
          msg = this.$t("forgotPassword.sendMailNotFoundError");
        } else {
          msg = this.$t("forgotPassword.sendMailOtherError");
        }
        this.addErrorSnackbar(msg);
        //this.addErrorSnackbar("Error while sending the password reset mail!");
      }
      this.overlay = false;
    },
  },
};
</script>

<style></style>
