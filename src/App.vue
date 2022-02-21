<template>
  <v-app>
    <Header />

    <v-main>
      <v-container fluid>
        <div>
          <v-alert
            type="error"
            outlined
            text
            dense
            elevation="3"
            transition="slide-x-transition"
          >
            Please note: This page is currently under construction. All content
            is for testing, development and demo purposes.
          </v-alert>

          <v-alert
            v-for="(alert, index) in alertArray"
            :key="index"
            :type="alert.type"
            outlined
            text
            dense
            dismissible
            elevation="3"
            transition="slide-x-transition"
          >
            {{ alert.message }}
          </v-alert>

          <v-snackbar
            v-model="computedShowSnackbar"
            :color="snackbarObjct.type"
            outlined
            text
            bottom
            left
            shaped
            :timeout="computedTimeout"
            transition="slide-x-transition"
          >
            {{ snackbarObjct.message }}
            <template v-slot:action="{ attrs }">
              <v-btn
                icon
                :color="snackbarObjct.closeButtonColor"
                v-bind="attrs"
                @click="closeSnack()"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>

          <!-- Alert Testing:
          <v-btn @click="addSuccessAlert()">Success</v-btn>
          <v-btn @click="addErrorAlert()">Error</v-btn>
          <v-btn @click="removeAlert()">Remove</v-btn>
          <v-btn @click="print()">Print</v-btn>
          <v-btn @click="addSuccessSnack()">SnackbarSucc</v-btn>
          <v-btn @click="addErrorSnack()">SnackbarErr</v-btn>
          <v-btn @click="clearSnack()">Snackbar clear</v-btn> -->
        </div>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-card flat height="500" class=""/>

    <Footer />
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer2";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },

  data: () => ({}),

  computed: {
    ...mapState("alert", ["alertArray"]),
    ...mapState("snackbar", ["snackbarObjct"]),

    computedShowSnackbar: {
      get() {
        return this.snackbarObjct.showSnackbar;
      },
      set() {
        this.closeSnack();
      },
    },

    computedTimeout: {
      get() {
        if (this.snackbarObjct.timeout != "") {
          return this.snackbarObjct.timeout;
        } else {
          return 5000;
        }
      },
    },
  },

  methods: {
    ...mapActions("alert", ["successAlert", "errorAlert", "clearAlert"]),
    ...mapActions("snackbar", [
      "addSuccessSnackbar",
      "addErrorSnackbar",
      "addCloseSnackbar",
    ]),

    addSuccessAlert() {
      this.successAlert("Successfully logged in!");
      setTimeout(() => {
        this.clearAlert();
      }, 5000);
    },

    addErrorAlert() {
      this.errorAlert("Unsuccessfully logged in!");
      setTimeout(() => {
        this.clearAlert();
      }, 5000);
    },

    removeAlert() {
      this.clearAlert();
    },

    //Snackbar
    addSuccessSnack() {
      this.addSuccessSnackbar("Successfully logged in!");
    },

    addErrorSnack() {
      this.addErrorSnackbar("Log in attempt failed!");
    },

    closeSnack() {
      this.addCloseSnackbar();
    },

    print() {
      console.log(this.alertArray);
    },
  },
};
</script>

<style>
.test {
  z-index: 999;
}
</style>
