<template>
  <div class="locale-changer">
    <v-menu bottom left :nudge-bottom="13" offset-y max-width="250px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          width="60px"
          color="grey darken-4"
          dark
          text
          tile
          elevation="0"
          class="rounded-xl"
          v-on="on"
        >
          <v-icon color="grey darken-4">mdi-earth</v-icon>
          <v-icon color="grey darken-4">mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list dense nav>
          <v-list-item-group
            :value="getCurrentLocale().index"
            color="grey darken-4"
          >
            <v-list-item
              v-for="(item, index) in supportedLanguages"
              :key="index"
              link
              @click="changeLocale2(item)"
            >
              <v-list-item-icon>
                <country-flag :country="item.flag" />
                <!-- <v-img height="30px" width="35px" :src="item.image" /> -->
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { i18n } from "../main.js";
import supportedLanguages from "../locale/supportedLanguages.json";
import CountryFlag from "vue-country-flag";

export default {
  name: "LanguageSwitcherComponent",

  components: {
    CountryFlag,
  },

  data() {
    return {
      // langs: ["en", "de"],
      // chosenLocale: this.currentLocale,
      // chosenLocale2: this.$route.query.locale,
      selectedListItem: this.getCurrentLocale().index,
      items: [
        {
          name: "English",
          flag: "gb",
          locale: "en",
        },
        {
          name: "German",
          flag: "de",
          locale: "de",
        },
      ],
      supportedLanguages: supportedLanguages,
    };
  },

  methods: {
    pushToRouter(locale) {
      let to = this.$router.resolve({ params: { locale } });
      this.$router.push(to.location.path);
    },

    changeLocale2(item) {
      let chosenLocale = item.locale;
      //console.log(chosenLocale);
      if (chosenLocale !== "en") {
        import(`@/locale/translations/${chosenLocale}.json`)
          .then((msgs) => {
            i18n.setLocaleMessage(chosenLocale, msgs.default || msgs); //add Messages from new language file
            i18n.locale = chosenLocale; // set locale
            // if (chosenLocale !== this.$router.currentRoute.params.locale) {
            //   //if Route contains other locale -> push to router
            //   this.pushToRouter(chosenLocale);
            // }
          })
          .catch((error) => {
            //Chosen language not yet included -> Fallback: En
            console.log("Language not contained!");
            console.log(error);
            chosenLocale = "en";
            i18n.locale = chosenLocale; // set en locale
            // if (chosenLocale !== this.$router.currentRoute.params.locale) {
            //   //if Route contains other locale -> push to router
            //   this.pushToRouter(chosenLocale);
            // }
          });
      } else {
        i18n.locale = chosenLocale;
        // if (chosenLocale !== this.$router.currentRoute.params.locale) {
        //   this.pushToRouter(chosenLocale);
        // }
      }
    },

    getCurrentLocale() {
      if (i18n.locale === "de") {
        return { index: 1, locale: "de", flag: "de" };
      } else {
        return { index: 0, locale: "en", flag: "gb" };
      }
    },

    print() {
      console.log(this.selectedListItem);
      console.log(this.chosenLocale2);
      console.log(this.currentLocaleComputed);
      console.log(this.getCurrentLocale());
    },
  },
};
</script>
