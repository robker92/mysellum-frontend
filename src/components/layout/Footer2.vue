<template>
  <v-footer dark padless color="primary">
    <v-container fluid style="width: 100%">
      <v-btn
        class="mx-2"
        dark
        absolute
        top
        right
        fab
        small
        color="primary"
        @click="$vuetify.goTo(0)"
      >
        <v-icon dark>
          mdi-chevron-up
        </v-icon>
      </v-btn>

      <v-card flat tile color="primary">
        <v-container>
          <!-- <v-card-text style="width: 85%" class="text-center"> -->
          <!-- <v-container fluid style="width: 85%" color="primary"> -->

          <!-- <v-card tile class="indigo lighten-1 white--text" width="90%" flat> -->
          <!-- <v-container>
        <v-row>
          <div class="text-left" v-for="(listItem, i) in aboutList" :key="i">
            <router-link :to="{ name: 'Home' }" :style="linkStyle">{{
              listItem
            }}</router-link>
          </div>
        </v-row>
        </v-container> -->

          <!-- <v-container fluid> -->
          <v-row dense justify="center">
            <v-col cols="12" xs="12" sm="6" md="3" lg="3" xl="3">
              <v-list dense color="primary">
                <v-list-item>
                  <v-list-item-content class="text-left">
                    <v-list-item-title
                      ><strong>Über:</strong></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(listItem, i) in aboutList"
                  :key="i"
                  :to="{ name: listItem.viewName }"
                >
                  <v-list-item-content class="text-left">
                    <v-list-item-title>{{ listItem.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" xs="12" sm="6" md="3" lg="3" xl="3">
              <v-list dense color="primary">
                <v-list-item>
                  <v-list-item-content class="text-left">
                    <v-list-item-title
                      ><strong>Community:</strong></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(listItem, i) in communityList"
                  :key="i"
                  @click="printData"
                >
                  <v-list-item-content class="text-left">
                    <v-list-item-title>{{ listItem }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" xs="12" sm="6" md="3" lg="3" xl="3">
              <v-list dense color="primary">
                <v-list-item>
                  <v-list-item-content class="text-left">
                    <v-list-item-title
                      ><strong>Ladeneigentümer:</strong></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(listItem, i) in storeOwnerList"
                  :key="i"
                  @click="printData"
                >
                  <v-list-item-content class="text-left">
                    <v-list-item-title>{{ listItem }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12" xs="12" sm="6" md="3" lg="3" xl="3">
              <v-list dense color="primary">
                <v-list-item>
                  <v-list-item-content class="text-left">
                    <v-list-item-title
                      ><strong>Unterstützung:</strong></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(listItem, i) in supportList"
                  :key="i"
                  @click="printData"
                >
                  <v-list-item-content class="text-left">
                    <v-list-item-title>{{ listItem }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <!-- </v-card-text> -->
        </v-container>
      </v-card>

      <v-card flat color="primary">
        <v-container>
          <v-row align="center" class="text-caption">
            <v-col cols="12" lg="8" xl="8">
              <div class="white--text text-left">
                © {{ new Date().getFullYear() }} -
                <strong>Mysellum GmbH, </strong> All rights reserved ·
                <router-link :to="{ name: 'DataPrivacy' }" :style="linkStyle"
                  >Datenschutz</router-link
                >
                ·
                <router-link :to="{ name: 'TermsOfUse' }" :style="linkStyle"
                  >Nutzungsbedingungen</router-link
                >
                ·
                <router-link :to="{ name: 'Impressum' }" :style="linkStyle"
                  >Impressum</router-link
                >
              </div>
            </v-col>
            <v-col cols="12" lg="4" xl="4">
              <v-btn
                v-for="item in items"
                :key="item.icon"
                class="mx-4 white--text"
                icon
                :href="item.href"
                target="_blank"
              >
                <v-icon size="24px">
                  {{ item.icon }}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </v-footer>
</template>

<script>
//import LanguageSwitcher from "../LanguageSwitcherDeprecated";
//import { i18n } from "../../main.js";

export default {
  components: {
    //LanguageSwitcher: LanguageSwitcher
  },
  data: () => ({
    //currentLocale: i18n.locale,
    //currentLocale: this.$router.currentRoute.params.locale,
    //currentLocale: this.$route.query.locale,
    aboutList: [
      { title: "So funktioniert Mysellum", viewName: "About" },
      { title: "FAQ", viewName: "FAQ" },
      { title: "Kontakt", viewName: "CustomerContact" },
    ],
    communityList: [
      "Vielfalt & Zugehörigkeit",
      "Partner von Title",
      "Freunde einladen",
    ],
    storeOwnerList: [
      "Eigentümer eines Ladens werden",
      "Verantwortungsvolles Führen eines Ladens",
      "Info-Center",
    ],
    supportList: [
      "Updates rund um COVID-19",
      "Hilfe-Center",
      "Stornierungsmöglichkeiten",
      "Vertrauen & Sicherheit",
    ],
    linkStyle: "style='text-decoration: none; color: inherit;'",
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    items: [
      {
        href: "https://twitter.com/",
        icon: "mdi-twitter",
      },
      {
        href: "https://instagram.com/",
        icon: "mdi-instagram",
      },
      {
        href: "https://facebook.com/",
        icon: "mdi-facebook",
      },
      {
        href: "https://linkedin.com/",
        icon: "mdi-linkedin",
      },
      // {
      //   href: "#!",
      //   icon: "mdi-google-plus",
      // },
      // {
      //   href: "#!",
      //   icon: "mdi-reddit",
      // },
      // {
      //   href: "#!",
      //   icon: "mdi-discord",
      // },
      // {
      //   href: "#!",
      //   icon: "mdi-pinterest",
      // },
    ],
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
  methods: {
    printData() {
      console.log("hi");
    },
    changeCurrentLocale(value) {
      console.log(value);
    },
  },
};
</script>

<style></style>
