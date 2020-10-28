<template>
  <!-- <v-app-bar app elevate-on-scroll scroll-target="#scrolling-techniques-7"> -->
  <!-- <v-app-bar-nav-icon class="hidden-md-and-up" /> -->
  <v-app-bar app color="white" elevate-on-scroll>
    <router-link :to="{ name: 'Home' }">
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

    <v-spacer></v-spacer>

    <v-btn icon>
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
    >
    <RegisterDialog v-model="showRegisterDialog" />
    <LoginDialog v-model="showLoginDialog" />
    <v-btn
      v-if="loggedIn == true"
      color="accent"
      @click.stop="showCreateStoreDialog = true"
      >Create Store</v-btn
    >
    <CreateStoreDialog v-model="showCreateStoreDialog" />

    <router-link :to="{ name: 'ShoppingCart' }">
      <v-badge
        overlap
        color="green"
        :content="checkProductCounter()"
        :value="checkProductCounter()"
      >
        <v-btn small fab dark color="indigo" @click.stop="printCart()">
          <v-icon dark>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
    </router-link>

    <div class="text-left">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-bottom="20"
        offset-y
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="indigo" dark v-bind="attrs" v-on="on" rounded>
            <v-icon>mdi-account-details</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item v-if="loggedIn == true">
              <v-list-item-avatar color="indigo">
                <v-icon large color="white">mdi-account</v-icon>
              </v-list-item-avatar>

              <v-list-item-content class="text-left">
                <v-list-item-title
                  >{{ this.user.address.firstName
                  }}{{ this.user.address.lastName }}</v-list-item-title
                >
                <v-list-item-subtitle>Logged In</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider v-if="loggedIn == true"></v-divider>

          <v-list nav>
            <!--          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          > -->
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
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
                <v-list-item-title>Register</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="
                showCreateStoreDialog = true;
                menu = false;
              "
            >
              <v-list-item-icon>
                <v-icon>mdi-store</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title>Open your own store</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="printCart">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-left">
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- </v-list-item-group> -->
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>

  <!-- <v-app-bar
    app
    color="#6A76AB"
    dark
    prominent
    shrink-on-scroll
    src="../../assets/header_appbar1.jpg"
    fade-img-on-scroll
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      ></v-img>
    </template>

    <router-link :to="{ name: 'Home' }">
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
    <v-spacer></v-spacer>
    <router-link :to="{ name: 'ShoppingCart' }">
      <v-badge
        overlap
        color="green"
        :content="checkProductCounter()"
        :value="checkProductCounter()"
      >
        <v-btn small fab dark color="indigo" @click.stop="printCart()">
          <v-icon dark>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
    </router-link>
    <v-app-bar-nav-icon @click="openNavDrawer"></v-app-bar-nav-icon>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-bottom="20"
      offset-y
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="indigo" dark v-bind="attrs" v-on="on" rounded>
          <v-icon>mdi-account-details</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon large color="green">mdi-account</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                >{{ this.user.address.firstName
                }}{{ this.user.address.lastName }}</v-list-item-title
              >
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Register</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-store</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Open your own store</v-list-item-title>
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
      </v-card>
    </v-menu>

    <template v-slot:extension>
      <div align-with-title>
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
        >
        <RegisterDialog v-model="showRegisterDialog" />
        <LoginDialog v-model="showLoginDialog" />
        <v-btn
          v-if="loggedIn == true"
          color="accent"
          @click.stop="showCreateStoreDialog = true"
          >Create Store</v-btn
        >
        <CreateStoreDialog v-model="showCreateStoreDialog" />
      </div>
    </template>
  </v-app-bar> -->
</template>

<script>
//import { mapGetters, mapState, mapActions } from "vuex";
import { mapState, mapActions } from "vuex";

import RegisterDialog from "../RegisterDialog";
import LoginDialog from "../LoginDialog";
import CreateStoreDialog from "../CreateStoreDialog";

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
      userLoggedIn: false,
      menu: false,
      group: ""
    };
  },
  components: {
    RegisterDialog,
    LoginDialog,
    CreateStoreDialog
  },
  computed: {
    // getJwtToken() {
    //   var jwtToken = localStorage.getItem('access_token')
    //   if (jwtToken) {
    //     //this.userLoggedIn = true
    //   }
    //   return true
    // }, v-if="status.loggedIn == false"
    ...mapState("account", ["user", "loggedIn"])
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
      console.log(this.user.shoppingCart);
      console.log(this.user.productCounter);
    },
    checkProductCounter() {
      if (this.loggedIn == false) {
        return 0;
      } else {
        return this.user.productCounter;
      }
    },
    openNavDrawer() {
      this.$emit("open-nav-drawer");
    }
  }
};
</script>

<style></style>
