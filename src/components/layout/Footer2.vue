<template>
  <v-footer dark padless color="indigo lighten-1">
    <v-container fluid style="width: 85%">
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
        <v-col cols="12" lg="3" xl="3">
          <v-list dense color="indigo lighten-1">
            <v-list-item>
              <v-list-item-content class="text-left">
                <v-list-item-title><strong>Über:</strong></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(listItem, i) in aboutList"
              :key="i"
              @click="printData"
            >
              <v-list-item-content class="text-left">
                <v-list-item-title>{{ listItem }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" lg="3" xl="3">
          <v-list dense color="indigo lighten-1">
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

        <v-col cols="12" lg="3" xl="3">
          <v-list dense color="indigo lighten-1">
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

        <v-col cols="12" lg="3" xl="3">
          <v-list dense color="indigo lighten-1">
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

      <!--  </v-container>     <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </v-card-text> -->
      <!--  <v-row>
      <v-divider></v-divider>
    </v-row> -->
      <v-row justify="center" align="center" class="mt-5 text-caption">
        <v-col cols="12" lg="8" xl="8">
          <div class="white--text text-left">
            © {{ new Date().getFullYear() }} -
            <strong>Company Title, Inc. </strong> All rights reserved ·
            <router-link :to="{ name: 'Home' }" :style="linkStyle"
              >Datenschutz</router-link
            >
            ·
            <router-link :to="{ name: 'Home' }" :style="linkStyle"
              >Nutzungsbedingungen</router-link
            >
            ·
            <router-link :to="{ name: 'Home' }" :style="linkStyle"
              >Sitemap</router-link
            >
            ·
            <router-link :to="{ name: 'Home' }" :style="linkStyle"
              >Impressum</router-link
            >
          </div>
        </v-col>
        <v-col cols="12" lg="4" xl="4">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
          <!-- <LanguageSwitcher
                :currentLocale="currentLocale"
                v-on:change-current-locale="changeCurrentLocale"
              /> -->
        </v-col>
        <!--  <v-col cols="12" lg="4" xl="1">
            <LanguageSwitcher />
          </v-col> </v-card>-->
      </v-row>
    </v-container>
  </v-footer>
  <!-- <v-footer color="primary lighten-1" padless height="auto">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        >{{ link }}</v-btn
      >
    </v-row>
  </v-footer> -->
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
    aboutList: ["So funktioniert Title", "Pressebereich", "Karriere"],
    communityList: [
      "Vielfalt & Zugehörigkeit",
      "Partner von Title",
      "Freunde einladen"
    ],
    storeOwnerList: [
      "Eigentümer eines Ladens werden",
      "Verantwortungsvolles Führen eines Ladens",
      "Info-Center"
    ],
    supportList: [
      "Updates rund um COVID-19",
      "Hilfe-Center",
      "Stornierungsmöglichkeiten",
      "Vertrauen & Sicherheit"
    ],
    linkStyle: "style='text-decoration: none; color: inherit;'",
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    items: [
      {
        href: "#!",
        icon: "mdi-twitter"
      },
      {
        href: "#!",
        icon: "mdi-instagram"
      },
      {
        href: "#!",
        icon: "mdi-facebook"
      },
      {
        href: "#!",
        icon: "mdi-google-plus"
      },
      {
        href: "#!",
        icon: "mdi-reddit"
      },
      {
        href: "#!",
        icon: "mdi-discord"
      },
      {
        href: "#!",
        icon: "mdi-pinterest"
      }
    ],
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
  }),
  methods: {
    printData() {
      console.log("hi");
    },
    changeCurrentLocale(value) {
      console.log(value);
    }
  }
};
</script>

<style></style>
