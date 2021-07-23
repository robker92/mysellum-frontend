<template>
  <div>
    <!-- <v-app-bar app elevate-on-scroll scroll-target="#scrolling-techniques-7"> -->
    <!-- <v-app-bar-nav-icon class="hidden-md-and-up" /> -->
    <v-app-bar app color="grey lighten-3" elevate-on-scroll>
      <router-link
        :to="{
          name: 'Home',
          params: { locale: $i18n.locale },
        }"
      >
        <v-img
          :src="require('@/assets/mysellum_logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
        />
      </router-link>
      <router-link
        :to="{
          name: 'Home',
          params: { locale: $i18n.locale },
        }"
        style="text-decoration: none; color: inherit;"
      >
        <v-toolbar-title>Mysellum</v-toolbar-title>
      </router-link>
      <!-- <v-btn @click="createDevData">Create Dev Data</v-btn> -->
      <v-spacer />

      <RegisterDialog v-model="showRegisterDialog" />
      <LoginDialog v-model="showLoginDialog" />
      <CreateStoreDialog v-model="showCreateStoreDialog" />
      <SettingsDialog v-model="showSettingsDialog" />

      <!-- <v-card
      width="25%"
      color="grey lighten-3"
      height="50px"
      class=""
      flat
      dense
    >
      <v-text-field
        v-model="searchTerm"
        append-icon="mdi-magnifyundhLLO ICH LIEBE DICH SO SEHR
        clear-icon="mdi-close-circle" HALLO HALLO
        class="pt-3"
        clearable
        label="Search for store"
        type="text"
        dense
        @click:append="searchForTerm"
      ></v-text-field>
    </v-card> -->

      <LanguageSwitcher class="ml-2" />

      <!-- <v-menu
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
                  {{ this.user.name.firstName }} {{ this.user.name.lastName }}
                </v-list-item-title>

                <v-list-item-subtitle>{{
                  $t("header.userMenu.userSubtitle")
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider v-if="loggedIn == true"></v-divider>
-->
      <!-- LOGIN -->
      <!--  <v-list nav>
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
-->
      <!-- REGISTER -->
      <!--   <v-list-item
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

           -->
      <!-- CREATE STORE -->
      <!--    <v-list-item
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

          -->
      <!-- YOUR STORE -->
      <!--    <v-list-item
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

         -->
      <!-- STORE ORDER OVERVIEW -->
      <!--      <v-list-item
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

        -->
      <!-- SETTINGS -->
      <!--   <v-list-item @click="showSettingsDialog = true">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title>{{
                  $t("header.userMenu.settings")
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

         -->
      <!-- LOGOUT -->
      <!--    <v-list-item
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
      </v-menu> -->

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
          color="green"
          :content="this.productCounter"
          :value="this.productCounter"
          offset-x="21"
          offset-y="15"
        >
          <v-btn
            dark
            tile
            text
            class="rounded-xl"
            color="primary"
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
        color="primary"
        class="rounded-xl mr-1 ml-2"
        tile
        @click="navDrawer = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="navDrawer" temporary right fixed>
      <v-list>
        <v-list-item v-if="loggedIn == true" @click="printCart">
          <v-list-item-avatar color="indigo">
            <v-icon large color="white">mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content class="text-left">
            <v-list-item-title>
              {{ this.user.name.firstName }} {{ this.user.name.lastName }}
            </v-list-item-title>

            <v-list-item-subtitle>{{
              $t("header.userMenu.userSubtitle")
            }}</v-list-item-subtitle>
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

        <!-- FAVORITE STORES -->
        <v-list-item
          v-if="loggedIn == true"
          :to="{
            name: `FavoriteStores`,
          }"
        >
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>Favorite Stores</v-list-item-title>
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
            params: { id: user.ownedStoreId },
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
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="text-left">
            <v-list-item-title>Order Overview</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

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
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import RegisterDialog from "../RegisterDialog";
import LoginDialog from "../LoginDialog";
import CreateStoreDialog from "../CreateStoreDialog";
import SettingsDialog from "../SettingsDialog";

import LanguageSwitcher from "../LanguageSwitcher";

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
          await this.updateCart({
            email: this.user.email,
            cart: this.shoppingCart,
          });
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
