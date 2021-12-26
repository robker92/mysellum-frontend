<template>
  <div>
    <v-app-bar app color="grey lighten-3" elevate-on-scroll>
      <router-link
        :to="{
          name: 'Home',
        }"
      >
        <v-img
          :src="require('@/assets/mysellum_text_green.png')"
          class="my-2"
          contain
          width="180"
        />
      </router-link>
      <v-spacer />

      <RegisterDialog v-model="showRegisterDialog" />
      <LoginDialog v-model="showLoginDialog" />
      <CreateStoreDialog v-model="showCreateStoreDialog" />
      <SettingsDialog v-model="showSettingsDialog" />

      <LanguageSwitcher class="ml-2" />

      <!-- CART BUTTON -->
      <div
        v-if="
          loggedIn === false ||
            (loggedIn === true && checkOwnedStoreId === false)
        "
        class=""
      >
        <v-badge
          overlap
          :color="mysellum_main_green_name"
          :content="productCounter"
          :value="productCounter"
          offset-x="21"
          offset-y="15"
        >
          <v-btn
            dark
            tile
            text
            class="rounded-xl"
            color="grey darken-4"
            :to="{ name: 'ShoppingCart' }"
            @click.stop="printCart()"
          >
            <v-icon dark>mdi-cart</v-icon>
            <!-- {{ $t("header.cartButton") }} -->
          </v-btn>
        </v-badge>
      </div>

      <!-- RECEIVED ORDERS BUTTON -->
      <!-- <div v-if="loggedIn === true && checkOwnedStoreId" class="ml-2">
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
      </div> -->
      <v-app-bar-nav-icon
        color="grey darken-4"
        class="rounded-xl mr-1 ml-2"
        tile
        @click="navDrawer = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="navDrawer" temporary right fixed>
      <v-list>
        <v-list-item v-if="loggedIn == true" @click="printCart">
          <v-list-item-avatar color="primary">
            <v-icon large color="white">mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                {{ user.name.firstName }} {{ user.name.lastName }}
              </div>
            </v-list-item-title>

            <v-list-item-subtitle>
              <div class="grey--text text--darken-2 text-body-2">
                {{ $t("header.userMenu.userSubtitle") }}
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider v-if="loggedIn == true"></v-divider>

      <!-- LOGIN -->
      <v-list nav dense>
        <v-list-item
          v-if="loggedIn == false"
          @click="
            showLoginDialog = true;
            menu = false;
          "
        >
          <v-list-item-icon>
            <v-icon color="grey darken-4">mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                {{ $t("header.userMenu.loginButton") }}
              </div>
            </v-list-item-title>
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
            <v-icon color="grey darken-4">mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                {{ $t("header.userMenu.registerButton") }}
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- FAVORITE STORES -->
        <v-list-item
          v-if="loggedIn == true"
          :to="{
            name: `FavoriteStores`,
          }"
        >
          <v-list-item-icon>
            <v-icon color="grey darken-4">mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                Favorite Stores
              </div>
            </v-list-item-title>
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
            <v-icon color="grey darken-4">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                {{ $t("header.userMenu.openStoreButton") }}
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- YOUR STORE -->
        <v-list-item
          v-if="loggedIn == true && checkOwnedStoreId"
          :to="{
            name: `StoreProfile`,
            params: { id: user.ownedStoreId },
          }"
          @click="menu = false"
        >
          <v-list-item-icon>
            <v-icon color="grey darken-4">mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                {{ $t("header.userMenu.yourStoreButton") }}
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- STORE ORDER OVERVIEW-->
        <v-list-item
          v-if="loggedIn == true && checkOwnedStoreId"
          :to="{
            name: `StoreOrderOverview`,
            params: { locale: $i18n.locale, id: user.ownedStoreId },
          }"
          @click="menu = false"
        >
          <v-list-item-icon>
            <v-icon color="grey darken-4">mdi-file-document</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                Order Overview
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- SETTINGS -->
        <v-list-item @click="showSettingsDialog = true">
          <v-list-item-icon>
            <v-icon color="grey darken-4">mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                {{ $t("header.userMenu.settings") }}
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-spacer />
        <!-- LOGOUT -->
        <v-list-item
          v-if="loggedIn == true"
          @click="
            logoutUser();
            menu = false;
          "
        >
          <v-list-item-icon>
            <v-icon color="grey darken-4">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>
              <div class="grey--text text--darken-4 text-body-1">
                {{ $t("header.userMenu.logoutButton") }}
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import RegisterDialog from "../RegisterDialog";
import LoginDialog from "../LoginDialog";
import CreateStoreDialog from "../CreateStoreDialog";
import SettingsDialog from "../settingsDialogComponents/SettingsDialog";

import LanguageSwitcher from "../LanguageSwitcher";
import { MysellumColors } from "../../helpers";
import { createDevDataService } from "../../services";

export default {
  name: "Header",

  components: {
    RegisterDialog,
    LoginDialog,
    CreateStoreDialog,
    SettingsDialog,
    LanguageSwitcher: LanguageSwitcher,
  },
  data() {
    return {
      navDrawer: false,
      links: [
        {
          href: "#!",
          icon: "mdi-twitter",
        },
      ],
      showRegisterDialog: false,
      showLoginDialog: false,
      showCreateStoreDialog: false,
      showSettingsDialog: false,
      userLoggedIn: false,
      menu: false,
      group: "",
      searchTerm: "",

      // Colors
      mysellum_main_green_name: MysellumColors.MYSELLUM_MAIN_GREEN_NAME,
    };
  },

  computed: {
    ...mapState("account", [
      "user",
      "loggedIn",
      "shoppingCart",
      "productCounter",
    ]),

    checkOwnedStoreId: {
      get() {
        if (
          this.user.ownedStoreId === "" ||
          typeof this.user.ownedStoreId === "undefined"
        ) {
          return false;
        } else return true;
      },
    },

    checkProductCounter: {
      get() {
        return this.productCounter;
      },
    },
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
      if (this.shoppingCart.length > 0) {
        try {
          await this.updateCart(this.shoppingCart);
        } catch (error) {
          console.log(error);
        }
      }
      this.logout();
      if (this.$route.name !== "Home") {
        this.$router.push({ name: "Home" });
      }
    },

    searchForTerm() {
      console.log(this.searchTerm);
    },

    printCart() {
      console.log(this.user.shoppingCart);
      console.log(this.user.productCounter);
      console.log(this.productCounter);
    },
    async createDevData() {
      await createDevDataService();
    },
  },
};
</script>

<style></style>
