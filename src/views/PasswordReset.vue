<template>
  <v-container>
    <v-container v-if="alreadyReset === false">
      <v-row
        v-if="passwordResetTokenValid === true"
        align="center"
        justify="center"
      >
        <v-col>
          <div class="text-left text-h5">
            {{ this.$t("passwordReset.headline") }}
          </div>
          <v-alert border="left" type="info" outlined class="mt-5" dense>
            {{ this.$t("passwordReset.infoAlert") }}
          </v-alert>

          <v-card class="mt-5">
            <v-container>
              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock-question"
                :error-messages="passwordErrors"
                :label="$t('registerDialog.passwordField') + '*'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                @click:append="showPassword = !showPassword"
              />
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
                @input="$v.passwordConfirmation.$touch()"
                @blur="$v.passwordConfirmation.$touch()"
                @click:append="
                  showPasswordConfirmation = !showPasswordConfirmation
                "
              />
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  dark
                  right
                  :disabled="buttonIsDisabled"
                  @click="resetPassword"
                >
                  {{ this.$t("passwordReset.resetPasswordButtonLabel") }}
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else align="center" justify="center">
        <v-alert
          border="left"
          type="error"
          outlined
          max-width="60%"
          class="mt-5"
          dense
        >
          {{ this.$t("passwordReset.checkInvalidError") }}
        </v-alert>
      </v-row>
    </v-container>

    <v-container v-else>
      <v-row align="center">
        <v-spacer />
        <v-col>
          <div text-body-1>
            {{ this.$t("passwordReset.successfullyChangedBody") }}
          </div>
        </v-col>
        <v-col cols="12" sm="2" md="2" lg="2">
          <v-img src="../assets/undraw-images/undraw_authentication.svg" />
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>

    <v-overlay v-model="overlay">
      <v-progress-circular indeterminate size="80"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { userService } from "../services";
import { mapActions } from "vuex";

import {
  required,
  maxLength,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

import { helpers } from "vuelidate/lib/validators";

const passwordRegexValidation = helpers.regex(
  "password",
  /(?=.*[$&+,:;=_?@#|'<>.^*()%!-])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
);

export default {
  name: "PasswordResetView",

  mixins: [validationMixin],

  validations: {
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
  },

  data() {
    return {
      password: "",
      showPassword: false,
      passwordConfirmation: "",
      showPasswordConfirmation: false,
      resetToken: "",

      alreadyReset: false,
      passwordResetTokenValid: false, //check if token is valid
      overlay: false,
    };
  },

  computed: {
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
    buttonIsDisabled() {
      if (!this.$v.$password && !this.$v.passwordConfirmation.$invalid) {
        //Register User with input data
        return false;
      } else {
        return true;
      }
    },
  },

  async mounted() {
    this.resetToken = this.$route.params.resetToken;
    try {
      await userService.checkResetToken(this.resetToken);
      this.passwordResetTokenValid = true;
    } catch (error) {
      //this.resetFailMessage = error.response.data.message;
    }
    this.alreadyReset = false;
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    async resetPassword() {
      this.overlay = true;
      var data = {
        token: this.resetToken,
        password: this.password,
      };
      try {
        await userService.resetPassword(data);
        this.addSuccessSnackbar(this.$t("passwordReset.successfullyChanged"));
        this.alreadyReset = true;
      } catch (error) {
        let msg;
        if (error.response.data.type === "failure") {
          msg = this.$t("passwordReset.resetFailureError");
        } else {
          msg = this.$t("passwordReset.resetOtherError");
        }
        this.addErrorSnackbar(msg);
      }
      this.overlay = false;
    },
  },
};
</script>

<style></style>
