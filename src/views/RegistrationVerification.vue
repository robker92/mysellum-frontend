<template>
  <div>
    <v-container v-if="pageLoading === true">
      <v-progress-circular indeterminate size="80"></v-progress-circular>
    </v-container>

    <v-container v-if="pageLoading === false && pageState === 'idle'">
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="6">
          <v-img src="../assets/image_sheep.jpg" />
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6">
          <div class="text-h5 mb-5">
            {{ $t("registrationVerification.idle.header") }}
          </div>
          <div class="text-body-1 mb-2">
            {{ $t("registrationVerification.idle.body1") }}
          </div>
          <div class="text-body-1">
            {{ $t("registrationVerification.idle.body2") }}
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="pageLoading === false && pageState === 'failure'">
      <v-card flat height="50"/>
      <div class="text-h5 mb-5">
        {{ $t("registrationVerification.failure.header") }}
      </div>
      <div class="text-body-1 mb-2">
        {{ $t("registrationVerification.failure.body1") }}
      </div>
    </v-container>

    <v-container v-if="pageLoading === false && pageState === 'success'">
      <v-row>
        <v-col cols="12" sm="6" md="6" lg="6">
          <div class="text-h5 mb-5">
            {{ $t("registrationVerification.success.header") }}
          </div>
          <div class="text-body-1">
            {{ $t("registrationVerification.success.body1") }}
          </div>
          <div class="text-body-1 mb-2">
            {{ $t("registrationVerification.success.body2") }}
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
      pageLoading: true,
      verificationSuccess: false,
      pageState: "",
    };
  },

  computed: {},

  async mounted() {
    let verificationToken = this.$route.params.verificationToken;

    if (verificationToken === undefined) {
      this.pageState = "idle";
      this.pageLoading = false;
      return;
    }

    try {
      await this.verifyRegistration(verificationToken);
    } catch (error) {
      this.pageState = "failure";
      this.pageLoading = false;
      return;
    }

    this.pageState = "success";
    this.pageLoading = false;
    return;
  },

  methods: {
    ...mapActions("account", ["verifyRegistration"]),
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
  },
};
</script>

<style></style>
