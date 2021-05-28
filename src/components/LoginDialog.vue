<template>
  <v-dialog v-model="show" max-width="400px" @click:outside="cancel">
    <v-card>
      <v-card-title>
        <span class="loginHeadline">{{ $t("loginDialog.dialogTitle") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid class="ma-0 pa-0">
          <v-row>
            <v-col>
              <v-text-field
                prepend-icon="mdi-email"
                v-model="email"
                :error-messages="emailErrors"
                :label="$t('loginDialog.emailField') + '*'"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                @keyup.enter.native="submitLogin"
              />
              <v-text-field
                prepend-icon="mdi-lock-question"
                v-model="password"
                :error-messages="passwordErrors"
                :label="$t('loginDialog.passwordField') + '*'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                @click:append="showPassword = !showPassword"
                @keyup.enter.native="submitLogin"
              />
            </v-col>
          </v-row>
          <div class="text-left ml-8 text-caption">
            <router-link
              :to="{
                name: 'ForgotPassword',
                params: { locale: $i18n.locale }
              }"
              v-on:click.native="cancel"
            >
              {{ $t("loginDialog.forgotPasswordLabel") }}
            </router-link>
          </div>
        </v-container>
        <div class="text-right text-caption">
          * {{ $t("loginDialog.requiredFieldDescription") }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">{{
          $t("loginDialog.closeButton")
        }}</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="submitLogin"
          :disabled="buttonIsDisabled"
          >{{ $t("loginDialog.submitButton") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//import { mapActions, mapGetters } from "vuex";
import { mapActions, mapState } from "vuex";

import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "LoginDialog",

  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required }
  },
  props: {
    value: Boolean
  },

  data() {
    return {
      dialog: false,

      email: "",
      password: "",
      showPassword: false
    };
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
        errors.push(this.$t("loginDialog.emailFieldValidError"));
      !this.$v.email.required &&
        errors.push(this.$t("loginDialog.emailFieldRequiredError"));
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push(this.$t("loginDialog.passwordFieldRequiredError"));
      return errors;
    },

    buttonIsDisabled() {
      if (!this.$v.email.$invalid && !this.$v.password.$invalid) {
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    ...mapActions("account", ["login", "logout"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    submitLogin: async function() {
      var credentials = {
        email: this.email,
        password: this.password
      };

      try {
        await this.login(credentials);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        let msg;
        if (error.response.data.type === "incorrect") {
          msg = this.$t("loginDialog.submitLoginIncorrectError");
        } else if (error.response.data.type === "verification") {
          msg = this.$t("loginDialog.submitLoginVerificationError");
        } else {
          msg = this.$t("loginDialog.submitLoginOtherError");
        }
        this.addErrorSnackbar(msg);
        return;
      }
      this.addSuccessSnackbar(this.$t("loginDialog.submitLoginSuccess"));
      this.cancel();
    },

    cancel() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
      this.showPassword = false;
      this.show = false;
    },

    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    }
  }
};
</script>

<style></style>
