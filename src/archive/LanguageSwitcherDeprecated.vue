<template>
  <div class="locale-changer" style="width: 60px;">
    <!--     <v-select
      v-model="chosenLocale"
      :items="langs"
      outlined
      single-line
      @change="changeLocale"
    ></v-select> -->

    <!-- <v-btn @click="print">Print</v-btn> -->

    <v-menu top offset-y max-width="150px">
      <template v-slot:activator="{ on, attrs }">
        <!--         <v-img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"
          height="30px"
          width="35px"
          v-bind="attrs"
          v-on="on"
        /> -->
        <div v-bind="attrs" v-on="on" style="width: 30px;">
          <country-flag :country="getCurrentLocale().flag" size="normal" />
        </div>
      </template>
      <!--             :to="{
              name: 'StoreProfile',
              params: {
                locale: item.locale,
                id: '5f31406deae5b044240a57c8'
              }
            }" 
            
                        :to="{
              path: `${$router.resolve({
                params: { locale: getRoute(item.locale) }
              })}`
            }"v-model="selectedListItem"-->
      <v-list dense>
        <v-list-item-group
          :value="this.getCurrentLocale().index"
          color="primary"
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="changeLocale2(item)"
            link
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
    </v-menu>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { i18n } from "../main.js";
import CountryFlag from "vue-country-flag";

export default {
  name: "LanguageSwitcherComponent",

  components: {
    CountryFlag
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
          locale: "en"
        },
        {
          name: "German",
          flag: "de",
          locale: "de"
        }
      ]
    };
  },

  // watch: {
  //   currentLocale: function(newVal) {
  //     if (newVal != null) {
  //       this.chosenLocale = this.currentLocale;
  //     }
  //   }
  // },
  // props: {
  //   currentLocale: String
  // },

  // computed: {
  //   currentLocaleComputed: {
  //     get() {
  //       //console.log(this.$router.currentRoute.params.locale);
  //       if (this.$router.currentRoute.params.locale === "de") {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     }
  //   }
  // },

  methods: {
    changeLocale() {
      //console.log(this.currentLocale);
      console.log(this.chosenLocale);
      if (this.chosenLocale !== "en") {
        import(`@/locale/translations/${this.chosenLocale}.json`).then(msgs => {
          //console.log(msgs);

          i18n.setLocaleMessage(this.chosenLocale, msgs.default || msgs);
          i18n.locale = this.chosenLocale;
          //let locale = this.$i18n.locale;

          // let to = this.$router.resolve({ params: { locale } });
          // this.$router.push(to.location);

          //let to = this.$router.resolve({ params: { locale } });
          //console.log(this.$router.currentRoute.params.locale); current locale
          if (this.chosenLocale !== this.$router.currentRoute.params.locale) {
            this.pushToRouter(this.chosenLocale);
          }
        });
      } else {
        i18n.locale = this.chosenLocale;
        if (this.chosenLocale !== this.$router.currentRoute.params.locale) {
          this.pushToRouter(this.chosenLocale);
        }
      }
      //this.$emit("change-current-locale", this.chosenLocale);
    },
    pushToRouter(locale) {
      let to = this.$router.resolve({ params: { locale } });
      this.$router.push(to.location.path);
    },

    changeLocale2(item) {
      let chosenLocale = item.locale;
      //console.log(chosenLocale);
      if (chosenLocale !== "en") {
        import(`@/locale/translations/${chosenLocale}.json`)
          .then(msgs => {
            i18n.setLocaleMessage(chosenLocale, msgs.default || msgs);
            i18n.locale = chosenLocale;
            if (chosenLocale !== this.$router.currentRoute.params.locale) {
              this.pushToRouter(chosenLocale);
            }
          })
          .catch(error => {
            console.log("Language not contained!");
            console.log(error);
          });
      } else {
        i18n.locale = chosenLocale;
        if (chosenLocale !== this.$router.currentRoute.params.locale) {
          this.pushToRouter(chosenLocale);
        }
      }
      //this.$emit("change-current-locale", this.chosenLocale);
    },

    getRoute(locale) {
      return this.$router.resolve({ params: { locale } });
    },

    getCurrentLocale() {
      //console.log("current locale: " + i18n.locale);
      //console.log(this.$router.currentRoute.params.locale);
      if (i18n.locale === "de") {
        return { index: 1, locale: "de", flag: "de" };
      } else {
        return { index: 0, locale: "en", flag: "gb" };
      }
    },

    changeImage(index) {
      console.log(index);
      console.log(this.selectedListItem);
      console.log(this.items[index]);
      this.print();
    },

    changeImage2(item) {
      console.log(item.locale);
    },
    print() {
      console.log(this.selectedListItem);
      console.log(this.chosenLocale2);
      console.log(this.currentLocaleComputed);
      console.log(this.getCurrentLocale());
    }
  }
};
</script>
