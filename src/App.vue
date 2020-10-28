<template>
  <v-app>
    <Header />

    <!-- <v-navigation-drawer v-model="navDrawer" absolute temporary right>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer> -->

    <v-main>
      <v-container fluid>
        <v-container>
          <!--           <transition-group name="slide-x-transition">
            <v-alert
              v-for="(alert, index) in alertArray"
              v-bind:key="index"
              :type="alert.type"
              outlined
              text
              dense
              dismissible
              elevation="3"
            >
              {{ alert.message }}
            </v-alert>
          </transition-group> -->
          <v-alert
            v-for="(alert, index) in alertArray"
            v-bind:key="index"
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

          <!--  <transition-group name="slide-x-transition">
            <v-snackbar
              v-for="(snack, index) in snackbarArray"
              v-bind:key="index"
              :value="1"
              :color="snack.type"
              outlined
              text
              top
              shaped
              timeout="5000"
              transition="slide-x-transition"
            >
              {{ snack.message }}
              <template v-slot:action="{ attrs }">
                <v-btn
                  icon
                  :color="snack.closeButtonColor"
                  v-bind="attrs"
                  @click="removeSnackbarByIndex(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
          </transition-group> -->

          <v-snackbar
            v-model="computedShowSnackbar"
            :color="snackbarObjct.type"
            outlined
            text
            top
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

          Alert Testing:
          <v-btn @click="addSuccessAlert()">Success</v-btn>
          <v-btn @click="addErrorAlert()">Error</v-btn>
          <v-btn @click="removeAlert()">Remove</v-btn>
          <v-btn @click="print()">Print</v-btn>
          <v-btn @click="addSuccessSnackbar()">SnackbarSucc</v-btn>
          <v-btn @click="addErrorSnackbar()">SnackbarErr</v-btn>
          <v-btn @click="clearSnack()">Snackbar clear</v-btn>
        </v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
//<Footer />
import { mapState, mapActions } from "vuex";
import { setLoader } from "./helpers";

//import HelloWorld from './components/HelloWorld'
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer2";

export default {
  name: "App",

  components: {
    //HelloWorld
    Header,
    Footer
  },

  data: () => ({
    //navDrawer: false,
    //alertArray: [],
    //showAlert: false
    //showSnackbar: false
  }),

  computed: {
    ...mapState("alert", ["alertArray"]),
    ...mapState("snackbar", ["snackbarObjct"]),
    computedShowSnackbar: {
      get() {
        return this.snackbarObjct.showSnackbar;
      },
      set() {
        this.closeSnackbar();
      }
    },
    computedTimeout: {
      get() {
        if (this.snackbarObjct.timeout != "") {
          return this.snackbarObjct.timeout;
        } else {
          return 5000;
        }
      }
    }
  },

  methods: {
    ...mapActions("alert", ["successAlert", "errorAlert", "clearAlert"]),
    ...mapActions("snackbar", [
      "successSnackbar",
      "errorSnackbar",
      "closeSnackbar"
    ]),

    setGoogleMapLoader() {
      setLoader();
    },
    //Alert
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
    addSuccessSnackbar() {
      this.successSnackbar("Successfully logged in!");
    },
    addErrorSnackbar() {
      // if (this.snackbarObjct.showSnackbar == true) {
      //   this.closeSnackbar();
      // }
      this.errorSnackbar("Log in attempt failed!");
    },
    closeSnack() {
      this.closeSnackbar();
    },
    print() {
      console.log(this.alertArray);
    }
  },
  beforeMount() {
    this.setGoogleMapLoader();
  }
};
</script>

<style>
.test {
  z-index: 999;
}
</style>
