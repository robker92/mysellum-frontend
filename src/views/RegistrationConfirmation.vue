<template>
  <div>
    <v-container>
      <div class="text-h5 mb-5">
        Thank you for your registration!
      </div>
      <div class="text-body-1 mb-2">
        We would like to welcome you on board of <strong>xx</strong>.
      </div>
      <div class="text-body-1">
        Please verify your e-mail address. We have sent you an e-mail containing
        a verification code.
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { userService } from "../services";

export default {
  name: "RegistrationConfirmationView",

  computed: {},

  data() {
    return {
      email: ""
    };
  },

  async mounted() {
    let confirmationToken = this.$route.params.confirmationToken;
    //let response;
    if (confirmationToken !== undefined) {
      console.log(confirmationToken);
      let response = await userService.confirmRegistration({
        token: confirmationToken
      });
      //when the confirmation was successful, push the router to home
      if (response.success === true) {
        this.$router.push({ name: "Home" });
        this.addSuccessSnackbar("Your registration was successful!");
      }
    }
  },

  methods: {
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"])
  }
};
</script>

<style></style>
