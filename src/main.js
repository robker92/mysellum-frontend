import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
//i18n
import VueI18n from "vue-i18n";
import CountryFlag from "vue-country-flag";
import messages from "./locale";
import { getBrowserLocale } from "./helpers";
import supportedLanguages from "./locale/supportedLanguages.json";
// Sharing
import VueSocialSharing from "vue-social-sharing";

// Sanitizing
import VueSanitize from "vue-sanitize";
const defaultOptions = {
  allowedTags: ["b", "i", "u", "font", "div", "br", "ul", "ol", "li"],
  allowedAttributes: {
    font: ["size"],
    div: ["style"],
  },
};
Vue.use(VueSanitize, defaultOptions);

Vue.config.productionTip = false;

//i18n
Vue.component("country-flag", CountryFlag);
Vue.use(VueI18n);
// Sharing
Vue.use(VueSocialSharing);

//window.Vue = Vue;

// eslint-disable-next-line no-unused-vars
function getStartingLocale() {
  const browserLocale = getBrowserLocale({
    countryCodeOnly: true,
  });
  console.log(`browserLocale: ${browserLocale}`);

  //Check if browser lang is English
  // if (browserLocale === "en") {
  //   console.log("lang == en");
  //   return browserLocale;
  // }
  //Check if Browser Lang is supported
  if (supportedLanguages.some((e) => e.locale === browserLocale)) {
    // Lazy load locales
    // if (supportedLanguages.includes(browserLocale)) {
    // import(`@/locale/translations/${browserLocale}.json`).then((msgs) => {
    //   i18n.setLocaleMessage(browserLocale, msgs.default || msgs);
    // });

    // let to = this.$router.resolve({
    //   params: {
    //     browserLocale,
    //   },
    // });
    // this.$router.push(to.location.path);
    // console.log("true");
    // console.log(`Switched to the locale ${browserLocale}.`);
    return browserLocale;
  } else {
    console.log(`The locale ${browserLocale} is not supported yet.`);
    return "en";
  }
}

export const i18n = new VueI18n({
  locale: getStartingLocale(),
  // locale: "en",
  fallbackLocale: "en",
  messages,
});
//console.log(i18n.locale);
var vm = new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

global.vm = vm;
