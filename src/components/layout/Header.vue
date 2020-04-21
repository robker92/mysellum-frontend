<template>
  <v-app-bar app fixed>
    <v-app-bar-nav-icon class="hidden-md-and-up" />
    <v-toolbar-title>Title</v-toolbar-title>
    <v-img
      :src="require('@/assets/logo.png')"
      class="mr-5"
      contain
      height="48"
      width="48"
      max-width="48"
      @click="$vuetify.goTo(0)"
    />
    <!-- 
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          flat
          @click="onClick($event, item)"
    >{{ link.text }}</v-btn>-->

    <v-btn @click="$router.push('home')">Home</v-btn>
    <v-btn @click="$router.push('about')">About</v-btn>
    <v-btn @click="$router.push('storeprofile')">Profile</v-btn>
    <v-btn
      v-if="this.loggedIn == false"
      color="accent"
      @click.stop="showRegisterDialog = true"
    >Register</v-btn>
    <v-btn v-if="this.loggedIn == false" color="accent" @click.stop="showLoginDialog = true">Login</v-btn>
    <v-btn v-if="this.loggedIn == true" color="accent" @click.stop="logoutUser()">Logout</v-btn>
    <RegisterDialog v-model="showRegisterDialog" />
    <LoginDialog v-model="showLoginDialog" />
    <v-spacer />
    <v-text-field
      append-icon="mdi-magnify"
      flat
      hide-details
      solo-inverted
      style="max-width: 300px;"
    />
    <v-spacer />
    <v-badge overlap color="green" :content="this.counter" :value="this.counter">
      <v-btn small fab dark color="indigo" @click.stop="printCart()">
        <v-icon dark>mdi-cart-outline</v-icon>
      </v-btn>
    </v-badge>
  </v-app-bar>
</template>

<script>
//import { mapGetters, mapState, mapActions } from "vuex";
import { mapState, mapActions } from "vuex";

import RegisterDialog from "../RegisterDialog";
import LoginDialog from "../LoginDialog";

export default {
  name: "Header",
  data() {
    return {
      links: [
        {
          href: "#!",
          icon: "mdi-twitter"
        }
      ],
      showRegisterDialog: false,
      showLoginDialog: false,
      userLoggedIn: false
    };
  },
  components: {
    RegisterDialog,
    LoginDialog
  },
  computed: {
    // getJwtToken() {
    //   var jwtToken = localStorage.getItem('access_token')
    //   if (jwtToken) {
    //     //this.userLoggedIn = true
    //   }
    //   return true
    // }, v-if="status.loggedIn == false"
    ...mapState("account", ["user", "loggedIn"]),
    ...mapState("shoppingCart", ["productsInCart", "counter"])
    // ...mapGetters("account", {
    //   info: "loginInfo"
    // })
    // eslint-disable-next-line vue/return-in-computed-property
  },
  created() {
    // reset login status
    //v-if="status.loggedIn == true"
    // console.log(status.loggedIn);
    // console.log("now logout");
    // this.logout();
    // console.log(status.loggedIn);
  },
  methods: {
    ...mapActions("account", ["logout"]),
    logoutUser() {
      //console.log(status);
      //console.log(this.$store.state.account.status);
      // console.log("@test submit");
      // console.log(this.info);

      // console.log(this.loggedIn);
      // console.log("now logout");
      this.logout();
      // console.log(this.loggedIn);
    },
    printCart() {
      console.log(this.productsInCart);
      console.log(this.counter);
    }
  }
};
</script>

<style></style>
