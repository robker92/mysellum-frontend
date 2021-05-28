import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
//import SecureLS from "secure-ls";
// var ls = new SecureLS({
//   isCompression: false
// });

import { alert } from "./alert.module";
import { snackbar } from "./snackbar.module";
import { account } from "./account.module";
import { order } from "./order.module";
// import {
//   stores
// } from "./stores.module";
// import {
//   users
// } from "./users.module";
// import {
//   shoppingCart
// } from "./shoppingCart.module";

Vue.use(Vuex);

//export const store = new Vuex.Store({
export default new Vuex.Store({
  modules: {
    alert,
    snackbar,
    account,
    order
    //stores
    //users,
    //shoppingCart
  },
  plugins: [
    createPersistedState()
    //{
    // storage: {
    //   getItem: key => ls.get(key),
    //   setItem: (key, value) => ls.set(key, value),
    //   removeItem: key => ls.remove(key)
    // }
    //}
  ]
});

//export default store
