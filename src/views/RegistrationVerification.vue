<template>
  <div>
    <v-container>
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
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegistrationVerificationView",

  computed: {},

  data() {
    return {
      email: ""
    };
  },

  async mounted() {
    let verificationToken = this.$route.params.verificationToken;
    //let response;
    if (verificationToken !== undefined) {
      //console.log(verificationToken);
      try {
        await this.verifyRegistration(verificationToken);
      } catch (error) {
        //console.log(error);
        let msg;
        if (error.response.data.type === "verification") {
          msg = this.$t("registrationVerification.verifyRegVerificationError");
        } else {
          msg = this.$t("registrationVerification.verifyRegOtherError");
        }
        this.addErrorSnackbar(msg);
        return;
      }
      //when the confirmation was successful, push the router to home
      this.$router.push({ name: "Home" });
      this.addSuccessSnackbar(
        this.$t("registrationVerification.verifyRegSuccess")
      );
    }
  },

  methods: {
    ...mapActions("account", ["verifyRegistration"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"])
  }
};
</script>

<style></style>
