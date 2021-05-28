import Vue from "vue";
import VueRouter from "vue-router";

import Root from "./Root.vue";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import FAQ from "../views/FAQ.vue";
import StoreProfile from "../views/StoreProfile.vue";
// import Search from "../archive/Search.vue";
import SearchDelivery from "../views/SearchDelivery.vue";
import SearchPickup from "../views/SearchPickup.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import SuccessfulOrder from "../views/SuccessfulOrder.vue";
import StoreOrderOverview from "../views/StoreOrderOverview.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import PasswordReset from "../views/PasswordReset.vue";
import RegistrationVerification from "../views/RegistrationVerification.vue";
import CustomerContact from "../views/CustomerContact.vue";

import { i18n } from "../main.js";

import { getCookie } from "../helpers";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:locale",
    component: Root,
    beforeEnter(to, from, next) {
      let locale = to.params.locale;
      //console.log(i18n);
      // console.log("to-be: " + locale);
      // console.log("as-is: " + i18n.locale);
      if (!["en", "de"].includes(locale)) return next("en");
      // if (i18n.locale !== locale) {
      //   i18n.locale = locale;
      // }
      // return next();

      if (i18n.locale === locale) {
        //console.log("same locale");
        return next();
      }
      //console.log("other locale");
      import(`@/locale/translations/${locale}.json`)
        .then(msgs => {
          i18n.setLocaleMessage(locale, msgs.default || msgs);
          i18n.locale = locale;
          //console.log("loaded");
          return next();
        })
        .catch(error => {
          console.log("Language not contained!");
          console.log(error);
        });
    },
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "faq",
        name: "FAQ",
        component: FAQ
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () =>
        //   import( /* webpackChunkName: "about" */ '../views/About.vue')
        component: About
      },
      {
        path: "store-profile/:id",
        name: "StoreProfile",
        component: StoreProfile
      },
      // {
      //   path: "search",
      //   name: "Search",
      //   component: Search
      // },
      {
        path: "search-delivery",
        name: "SearchDelivery",
        component: SearchDelivery
      },
      {
        path: "search-pickup",
        name: "SearchPickup",
        component: SearchPickup
      },
      {
        path: "shopping-cart",
        name: "ShoppingCart",
        component: ShoppingCart
      },
      {
        path: "successful-order",
        name: "SuccessfulOrder",
        component: SuccessfulOrder
      },
      {
        path: "store-order-overview/:id",
        name: "StoreOrderOverview",
        component: StoreOrderOverview
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword
      },
      {
        path: "password-reset/:resetToken",
        name: "PasswordReset",
        component: PasswordReset
      },
      {
        path: "registration-verification/:verificationToken?",
        name: "RegistrationVerification",
        component: RegistrationVerification
      },
      {
        path: "customer-contact",
        name: "CustomerContact",
        component: CustomerContact
      }
      // otherwise redirect to homeRegistrationConfirmation
      // {
      //   path: "*",
      //   redirect: "/"
      // }
    ]
  },
  {
    path: "*",
    redirect: "/en"
  }
];

const router = new VueRouter({
  mode: "history",
  //base: process.env.BASE_URL,
  routes: routes
});

router.beforeEach((to, from, next) => {
  let locale = to.params.locale;
  //console.log(to.name);
  // redirect to home page if not logged in and trying to access a restricted page
  //const publicPages = [`/${locale}`, `/${locale}/storeprofile`]; //insert all public pages
  const publicPages = [
    "Home",
    "FAQ",
    "About",
    "ForgotPassword",
    "PasswordReset",
    "SearchDelivery",
    "SearchPickup",
    "StoreProfile",
    "ShoppingCart",
    "RegistrationVerification",
    "CustomerContact"
  ];
  //const authRequired = !publicPages.includes(to.path);
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = getCookie("authToken");
  //const loggedIn = localStorage.getItem("user"); // -> Check content as well -> Security
  //console.log(JSON.parse(loggedIn).token);

  if (authRequired && !loggedIn) {
    //(if (authRequired && !JSON.parse(loggedIn).token) {
    return next(`/${locale}`);
  }

  next();
});

export default router;
