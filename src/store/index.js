import Vue from "vue";
import Vuex from "vuex";

import {
  alert
} from "./alert.module";
import {
  account
} from "./account.module";
import {
  users
} from "./users.module";
import {
  shoppingCart
} from "./shoppingCart.module";

Vue.use(Vuex);

//export const store = new Vuex.Store({
export default new Vuex.Store({
  modules: {
    alert,
    account,
    users,
    shoppingCart
  }
});

//export default store