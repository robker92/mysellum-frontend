import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

// import Root from "./Root.vue";

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
import PageNotFound from "../views/PageNotFound.vue";
import Impressum from "../views/Impressum.vue";
import TermsOfUse from "../views/TermsOfUse.vue";
import DataPrivacy from "../views/DataPrivacy.vue";
import FavoriteStores from "../views/FavoriteStores.vue";

// import { i18n } from "../main.js";

// import { getCookie } from "../helpers";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import( /* webpackChunkName: "about" */ '../views/About.vue')
    component: About,
  },
  {
    path: "/store-profile/:id",
    name: "StoreProfile",
    component: StoreProfile,
  },
  // {
  //   path: "search",
  //   name: "Search",
  //   component: Search
  // },
  {
    path: "/search-delivery",
    name: "SearchDelivery",
    component: SearchDelivery,
  },
  {
    path: "/search-pickup",
    name: "SearchPickup",
    component: SearchPickup,
  },
  {
    path: "/shopping-cart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
  {
    path: "/successful-order",
    name: "SuccessfulOrder",
    component: SuccessfulOrder,
  },
  {
    path: "/store-order-overview/:id",
    name: "StoreOrderOverview",
    component: StoreOrderOverview,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/password-reset/:resetToken",
    name: "PasswordReset",
    component: PasswordReset,
  },
  {
    path: "/registration-verification/:verificationToken?",
    name: "RegistrationVerification",
    component: RegistrationVerification,
  },
  {
    path: "/customer-contact",
    name: "CustomerContact",
    component: CustomerContact,
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: Impressum,
  },
  {
    path: "/data-privacy",
    name: "DataPrivacy",
    component: DataPrivacy,
  },
  {
    path: "/terms-of-use",
    name: "TermsOfUse",
    component: TermsOfUse,
  },
  {
    path: "/favorite-stores",
    name: "FavoriteStores",
    component: FavoriteStores,
  },
  // Default route for not found page
  { path: "*", component: PageNotFound },
];

const noScrollRouteNames = ["SearchPickup"];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log(to);
    if (savedPosition) {
      return savedPosition;
    } else if (noScrollRouteNames.includes(to.name)) {
      return;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  // Guard to catch not contained route. Without it we could run into the auth check if clause
  if (typeof to.name === "undefined") {
    return next();
  }

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
    "CustomerContact",
    "Impressum",
    "DataPrivacy",
    "TermsOfUse",
  ];

  const publicAccess = publicPages.includes(to.name);
  // const loggedIn = getCookie("authToken");
  // console.log(store.state.account.loggedIn);
  const loggedIn = localStorage.getItem("authToken");
  if (!publicAccess && !loggedIn) {
    // console.log(`hi`);
    store.dispatch(
      "snackbar/addErrorSnackbar",
      "Please login to access the requested page."
      //i18n.t("general.invalidTokenError")
    );
    return next(`/`);
  }

  return next();
});

export default router;
