<template>
  <!-- <v-app-bar app elevate-on-scroll scroll-target="#scrolling-techniques-7"> -->
  <!-- <v-app-bar-nav-icon class="hidden-md-and-up" /> -->
  <v-app-bar app color="grey lighten-3" elevate-on-scroll>
    <router-link
      :to="{
        name: 'Home',
        params: { locale: $i18n.locale }
      }"
    >
      <v-img
        :src="require('@/assets/logo.png')"
        class="mr-5"
        contain
        height="48"
        width="48"
        max-width="48"
      />
    </router-link>

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer />

    <!--     <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <router-link :to="{ name: 'Search' }">
      <v-btn id="myButton3" color="accent">Search</v-btn>
    </router-link>
    <v-btn
      v-if="loggedIn == false"
      color="accent"
      @click.stop="showRegisterDialog = true"
      >Register</v-btn
    >
    <v-btn
      v-if="loggedIn == false"
      color="accent"
      @click.stop="showLoginDialog = true"
      >Login</v-btn
    >
    <v-btn v-if="loggedIn == true" color="accent" @click.stop="logoutUser()"
      >Logout</v-btn
    > -->

    <!--     <v-btn
      v-if="loggedIn == true"
      color="accent"
      @click.stop="showCreateStoreDialog = true"
      >Create Store</v-btn
    > -->

    <!--     <v-btn-toggle rounded>
      <v-btn rounded @click.stop="printCart()">
        <v-icon>mdi-account-details</v-icon>
      </v-btn>
      <v-btn rounded @click.stop="printCart()">
        <v-icon dark>mdi-cart</v-icon>
        Cart
      </v-btn>
    </v-btn-toggle> -->

    <RegisterDialog v-model="showRegisterDialog" />
    <LoginDialog v-model="showLoginDialog" />
    <CreateStoreDialog v-model="showCreateStoreDialog" />
    <SettingsDialog v-model="showSettingsDialog" />

    <v-card
      width="25%"
      color="grey lighten-3"
      height="50px"
      class=""
      flat
      dense
    >
      <v-text-field
        v-model="searchTerm"
        append-icon="mdi-magnify"
        clear-icon="mdi-close-circle"
        class="pt-3"
        clearable
        label="Search for store"
        type="text"
        dense
        @click:append="searchForTerm"
      ></v-text-field>
    </v-card>

    <LanguageSwitcher class="ml-2" />

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-bottom="13"
      offset-y
      left
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          width="60px"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          text
          tile
          class="rounded-xl ml-2"
        >
          <v-icon large v-if="loggedIn == true">mdi-account-details</v-icon>
          <v-icon large v-else>mdi-format-list-bulleted</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item v-if="loggedIn == true">
            <v-list-item-avatar color="indigo">
              <v-icon large color="white">mdi-account</v-icon>
            </v-list-item-avatar>

            <v-list-item-content class="text-left">
              <v-list-item-title>
                {{ this.user.name.firstName }}{{ this.user.name.lastName }}
              </v-list-item-title>

              <v-list-item-subtitle>{{
                $t("header.userMenu.userSubtitle")
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider v-if="loggedIn == true"></v-divider>

        <!-- LOGIN -->
        <v-list nav>
          <v-list-item
            v-if="loggedIn == false"
            @click="
              showLoginDialog = true;
              menu = false;
            "
          >
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>{{
                $t("header.userMenu.loginButton")
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- REGISTER -->
          <v-list-item
            v-if="loggedIn == false"
            @click="
              showRegisterDialog = true;
              menu = false;
            "
          >
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>{{
                $t("header.userMenu.registerButton")
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- CREATE STORE -->
          <v-list-item
            v-if="loggedIn == true && checkOwnedStoreId === false"
            @click="
              showCreateStoreDialog = true;
              menu = false;
            "
          >
            <v-list-item-icon>
              <v-icon>mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>{{
                $t("header.userMenu.openStoreButton")
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- YOUR STORE -->
          <v-list-item
            v-if="loggedIn == true && checkOwnedStoreId"
            :to="{
              name: `StoreProfile`,
              params: { locale: $i18n.locale, id: user.ownedStoreId }
            }"
            @click="menu = false"
          >
            <v-list-item-icon>
              <v-icon>mdi-store</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>
                {{ $t("header.userMenu.yourStoreButton") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!--    <v-list-item
            v-if="loggedIn == true && user.ownedStoreId == ''"
            @click="printCart"
          >
            <v-list-item-icon>
              <v-icon>mdi-text-box-search</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>{{
                $t("header.userMenu.yourOrdersButton")
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <!-- STORE ORDER OVERVIEW-->
          <v-list-item
            v-if="loggedIn == true && checkOwnedStoreId"
            :to="{
              name: `StoreOrderOverview`,
              params: { locale: $i18n.locale, id: user.ownedStoreId }
            }"
            @click="menu = false"
          >
            <v-list-item-icon>
              <v-icon>mdi-file-document</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>Order Overview</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-list-item
            v-if="loggedIn == true && user.ownedStoreId != ''"
            @click="printCart"
          >
            <v-list-item-icon>
              <v-icon>mdi-text-box-search</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>Your Received Orders</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <!-- SETTINGS -->
          <v-list-item @click="showSettingsDialog = true">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>{{
                $t("header.userMenu.settings")
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- LOGOUT -->
          <v-list-item
            v-if="loggedIn == true"
            @click="
              logoutUser();
              menu = false;
            "
          >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-left">
              <v-list-item-title>{{
                $t("header.userMenu.logoutButton")
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <!-- CART BUTTON -->
    <div
      v-if="
        loggedIn === false || (loggedIn === true && checkOwnedStoreId === false)
      "
      class="ml-2"
    >
      <v-badge
        overlap
        color="green"
        :content="this.productCounter"
        :value="this.productCounter"
      >
        <v-btn
          dark
          tile
          class="rounded-xl"
          color="primary"
          :to="{ name: 'ShoppingCart' }"
          @click.stop="printCart()"
        >
          <v-icon dark>mdi-cart</v-icon>
          {{ $t("header.cartButton") }}
        </v-btn>
      </v-badge>
    </div>

    <!-- RECEIVED ORDERS BUTTON -->
    <div v-if="loggedIn === true && checkOwnedStoreId" class="ml-2">
      <v-badge
        overlap
        color="green"
        :content="checkProductCounter"
        :value="checkProductCounter"
      >
        <v-btn
          dark
          tile
          class="rounded-xl"
          color="primary"
          :to="{ name: 'ShoppingCart' }"
          @click.stop="printCart()"
        >
          <v-icon dark>mdi-text-box-search-outline</v-icon>
          {{ $t("header.receivedOrdersButton") }}
        </v-btn>
      </v-badge>
    </div>
  </v-app-bar>
</template>

<script>
//import { mapGetters, mapState, mapActions } from "vuex";
import { mapState, mapActions } from "vuex";

import RegisterDialog from "../RegisterDialog";
import LoginDialog from "../LoginDialog";
import CreateStoreDialog from "../CreateStoreDialog";
import SettingsDialog from "../SettingsDialog";

import LanguageSwitcher from "../LanguageSwitcher";

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
      showCreateStoreDialog: false,
      showSettingsDialog: false,
      userLoggedIn: false,
      menu: false,
      group: "",
      searchTerm: ""
    };
  },

  components: {
    RegisterDialog,
    LoginDialog,
    CreateStoreDialog,
    SettingsDialog,
    LanguageSwitcher: LanguageSwitcher
  },

  computed: {
    // getJwtToken() {
    //   var jwtToken = localStorage.getItem('access_token')
    //   if (jwtToken) {
    //     //this.userLoggedIn = true
    //   }
    //   return true
    // }, v-if="status.loggedIn == false"
    ...mapState("account", [
      "user",
      "loggedIn",
      "shoppingCart",
      "productCounter"
    ]),
    checkOwnedStoreId: {
      get() {
        if (
          this.user.ownedStoreId === "" ||
          typeof this.user.ownedStoreId === "undefined"
        ) {
          return false;
        } else return true;
      }
    },
    checkProductCounter: {
      get() {
        // if (this.loggedIn === false) {
        //   return 0;
        // } else {
        //   console.log(this.productCounter);
        //   return this.productCounter;
        // }
        return this.productCounter;
      }
    }

    //...mapState("shoppingCart", ["shoppingCart", "productCounter"])
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
    ...mapActions("snackbar", ["addSuccessSnackbar", "addErrorSnackbar"]),
    ...mapActions("account", ["logout", "updateCart"]),

    async logoutUser() {
      //console.log(status);
      //console.log(this.$store.state.account.status);
      // console.log("@test submit");
      // console.log(this.info);
      // console.log(this.loggedIn);
      // console.log("now logout");
      if (this.shoppingCart.length > 0) {
        try {
          await this.updateCart({
            email: this.user.email,
            cart: this.shoppingCart
          });
        } catch (error) {
          //console.log(error);
        }
      }
      this.logout();
      //this.addSuccessSnackbar("Successfully logged out!");
      // console.log(this.loggedIn);
    },
    searchForTerm() {
      console.log(this.searchTerm);
    },
    printCart() {
      console.log(this.user.shoppingCart);
      console.log(this.user.productCounter);
      console.log(this.productCounter);
    }
    // checkProductCounter() {
    //   if (this.loggedIn === false) {
    //     return 0;
    //   } else {
    //     console.log(this.productCounter);
    //     return this.productCounter;
    //   }
    // }
    // openNavDrawer() {
    //   this.$emit("open-nav-drawer");
    // }
  }
};
</script>

<style></style>
