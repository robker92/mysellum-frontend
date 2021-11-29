<template>
  <div>
    <v-container v-if="pageState === 'idle'">
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="6">
          <v-img src="../assets/image_sheep.jpg" />
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6">
          <div class="text-h5 mb-5">
            {{ $t("registrationVerification.header") }}
          </div>
          <div class="text-body-1 mb-2">
            {{ $t("registrationVerification.body1") }}
          </div>
          <div class="text-body-1">
            {{ $t("registrationVerification.body2") }}
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="pageState === 'failure'">
      <div class="text-h5 mb-5">
        We are sorry, but an error occurred during the verification process or
        the token expired already.
      </div>
      <div class="text-body-1 mb-2">
        Please try to refresh the page or resend the verification e-mail.
      </div>
      <!-- <v-btn
        class="mt-2"
        outline
        color="primary"
        @click="resendVerificationMail"
      >
        <v-icon dark left color="white">
          mdi-email
        </v-icon>
        Resend
      </v-btn> -->
    </v-container>

    <v-container v-if="pageState === 'success'">
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="6">
          <div class="text-h5 mb-5">
            Your e-mail was successfully verified!
          </div>
          <div class="text-body-1">
            If you have questions or if you need support, feel free to contact
            us anytime via our contact form. Also, please see the footer for
            further information.
          </div>
          <div class="text-body-1 mb-2">
            Enjoy our platform :)
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6">
          <v-img src="../assets/image_squirrel.jpg" />
        </v-col>
      </v-row>
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

    // resendVerificationMail() {
    //   // TODO
    //   console.log(`Resend verification e-mail!`);
    // },
  },
};
</script>

<style></style>
