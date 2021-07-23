<template>
  <div>
    <v-container v-if="pageState === 'idle'">
      <div class="text-h5 mb-5">
        {{ $t("registrationVerification.header") }}
      </div>
      <div class="text-body-1 mb-2">
        {{ $t("registrationVerification.body1") }}
      </div>
      <div class="text-body-1">
        {{ $t("registrationVerification.body2") }}
      </div>
    </v-container>

    <v-container v-if="pageState === 'failure'">
      <div class="text-h5 mb-5">
        We are sorry, but an error occurred during the verification process or
        the token expired already.
      </div>
      <div class="text-body-1 mb-2">
        Please try to refresh the page or resend the verification e-mail.
      </div>
      <v-btn @click="resendVerificationMail">
        <v-icon dark left color="primary">
          mdi-email
        </v-icon>
        Resend
      </v-btn>
    </v-container>

    <v-container v-if="pageState === 'success'">
      <div class="text-h5 mb-5">
        Your e-mail verification was successful!
      </div>
      <div class="text-body-1 mb-2">
        Enjoy our platform :)
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegistrationVerificationView",

  data() {
    return {
      email: "",
      verificationSuccess: false,
      pageState: "",
    };
  },

  computed: {},

  async mounted() {
    let verificationToken = this.$route.params.verificationToken;

    if (verificationToken === undefined) {
      this.pageState = "idle";
      return;
    }

    try {
      await this.verifyRegistration(verificationToken);
    } catch (error) {
      console.log(error);
      // let msg;
      // if (error.response.data.type === "verification") {
      //   msg = this.$t("registrationVerification.verifyRegVerificationError");
      // } else {
      //   msg = this.$t("registrationVerification.verifyRegOtherError");
      // }
      // this.addErrorSnackbar(msg);
      this.pageState = "failure";
      return;
    }
    // when the confirmation was successful, push the router to home
    // this.$router.push({ name: "Home" });
    // this.addSuccessSnackbar(
    //   this.$t("registrationVerification.verifyRegSuccess")
    // );
    this.pageState = "success";
    return;
  },

  methods: {
    ...mapActions("account", ["verifyRegistration"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),

    resendVerificationMail() {
      // TODO
      console.log(`Resend verification e-mail!`);
    },
  },
};
</script>

<style></style>
