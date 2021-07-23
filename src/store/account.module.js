/* eslint-disable no-unused-vars */
import { userService } from "../services";
import {
  // getCookie,
  addProductLoggedOutHelper,
  removeProductLoggedOutHelper,
  checkAuthentication,
  errorHandler,
} from "../helpers";
import { getCookie } from "../helpers/auth-header";
import { i18n } from "../main";
//import router from "../router";

// const user = JSON.parse(localStorage.getItem("vuex"));
// const shoppingCart = JSON.parse(localStorage.getItem("vuex"));
// const productCounter = JSON.parse(localStorage.getItem("vuex"));
const vuexObjct = JSON.parse(localStorage.getItem("vuex"));
const loggedIn = getCookie("authToken");
console.log(`user logged in: ${loggedIn ? true : false}`);
const state = loggedIn
  ? {
      loggedIn: true,
      user: vuexObjct.account.user,
      shoppingCart: vuexObjct.account.shoppingCart,
      loadedCart: vuexObjct.account.loadedCart,
      productCounter: vuexObjct.account.productCounter,
      shippingCosts: vuexObjct.account.shippingCosts,
      favoriteStores: vuexObjct.account.favoriteStores,
    }
  : {
      loggedIn: false,
      user: {},
      shoppingCart: [],
      loadedCart: [],
      productCounter: 0,
      shippingCosts: 0,
      favoriteStores: [],
    };

const getters = {
  loginInfo: (state) => {
    console.log("@getter");
    console.log(state.user);
    return state.loggedIn;
  },
};

const actions = {
  login({ dispatch, commit, state }, credentials) {
    // set state to loggingIn with email only
    return new Promise((resolve, reject) => {
      userService
        .login(credentials)
        .then((data) => {
          commit("loginSuccess", {
            user: data.user,
            shoppingCart: data.shoppingCart,
            shippingCosts: data.shippingCosts,
            favoriteStores: data.favoriteStores,
          });
          resolve(data.message);
        })
        .catch((error) => {
          commit("loginFailure", error);
          reject(error);
        });
    });
  },

  logout({ commit }) {
    userService.logout();
    commit("logout");
  },

  verifyRegistration({ dispatch, commit, state }, token) {
    return new Promise((resolve, reject) => {
      userService
        .verifyRegistration(token)
        .then((data) => {
          commit("registerSuccess", {
            user: data.user,
            shoppingCart: data.shoppingCart,
            shippingCosts: data.shippingCosts,
            favoriteStores: data.favoriteStores,
          });
          resolve(data);
        })
        .catch((error) => {
          commit("registerFailure", error);
          reject(error);
        });
    });
  },

  addProduct({ commit, dispatch }, data) {
    userService
      .addToShoppingCart(data)
      .then((data) => {
        commit("addProductSuccess", {
          shoppingCart: data.shoppingCart,
          shippingCosts: data.shippingCosts,
        });
      })
      .catch((error) => {
        errorHandler(error, "addProduct");
        commit("addProductFailure", error);
      });
  },

  removeProduct({ commit }, data) {
    userService
      .removeFromShoppingCart(data)
      .then((data) => {
        commit("removeProductSuccess", {
          shoppingCart: data.shoppingCart,
          shippingCosts: data.shippingCosts,
        });
      })
      .catch((error) => {
        errorHandler(error, "removeProduct");
        commit("removeProductFailure", error);
      });
  },

  addProductLoggedOut({ commit, state }, data) {
    addProductLoggedOutHelper(
      data.product,
      data.quantity,
      state.shoppingCart
    ).then((data) => {
      commit("addProductSuccess", {
        shoppingCart: data.shoppingCart,
        shippingCosts: data.shippingCosts,
      });
    });
  },
  removeProductLoggedOut({ commit, state }, data) {
    removeProductLoggedOutHelper(
      data.product,
      data.quantity,
      state.shoppingCart
    ).then((data) => {
      commit("addProductSuccess", {
        shoppingCart: data.shoppingCart,
        shippingCosts: data.shippingCosts,
      });
    });
  },

  updateCart({ dispatch, commit, state }, data) {
    return new Promise((resolve, reject) => {
      userService
        .updateShoppingCart({
          email: data.email,
          cart: data.cart,
        })
        .then(() => {
          commit("updateCartSuccess", data.cart);
          resolve(data.cart);
        })
        .catch((error) => {
          commit("updateCartFailure", error);
          reject(error);
        });
    });
  },

  emptyLoadedCart({ dispatch, commit, state }) {
    commit("emptyLoadedCartSuccess");
  },

  emptyShoppingCart({ dispatch, commit, state }) {
    commit("emptyShoppingCartSuccess");
  },

  setOwnedStoreId({ dispatch, commit, state }, storeId) {
    commit("setOwnedStoreIdSuccess", storeId);
  },

  addStoreToFavorites({ commit, state }, storeId) {
    return new Promise((resolve, reject) => {
      userService
        .addStoreToFavorites(storeId)
        .then((storeId) => {
          commit("addStoreToFavoritesSuccess", storeId);
          resolve(storeId);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  removeStoreFromFavorites({ commit, state }, storeId) {
    return new Promise((resolve, reject) => {
      userService
        .removeStoreFromFavorites(storeId)
        .then((storeId) => {
          commit("removeStoreFromFavoritesSuccess", storeId);
          resolve(storeId);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

function calculateProductCounter(state) {
  let counter = 0;
  for (let i = 0; i < state.shoppingCart.length; i++) {
    counter = counter + state.shoppingCart[i][1];
  }
  if (state.loadedCart.length !== 0) {
    for (let i = 0; i < state.loadedCart.length; i++) {
      counter = counter + state.loadedCart[i][1];
    }
  }
  state.productCounter = counter;
}

const mutations = {
  loginSuccess(state, data) {
    state.loggedIn = true;
    state.user = data.user;
    if (state.shoppingCart.length > 0) {
      state.loadedCart = data.shoppingCart;
    } else {
      state.shoppingCart = data.shoppingCart;
    }
    state.shippingCosts = data.shippingCosts;
    state.favoriteStores = data.favoriteStores;
    // concatenate shopping carts
    calculateProductCounter(state);
  },

  loginFailure(state) {
    state.loggedIn = false;
    state.user = {};
    state.productCounter = 0;
    state.shippingCosts = 0;
  },

  logout(state) {
    state.loggedIn = false;
    state.user = {};
    state.shoppingCart = [];
    state.loadedCart = [];
    state.productCounter = 0;
    state.shippingCosts = 0;
    state.favoriteStores = [];
  },

  registerSuccess(state, data) {
    // state.status = {};
    state.loggedIn = true;
    state.user = data.user;
    state.shoppingCart = data.shoppingCart;
    state.shippingCosts = data.shippingCosts;
    state.favoriteStores = data.favoriteStores;
  },

  registerFailure(state, error) {
    //state.status = {};
    state.loggedIn = false;
    state.user = {};
  },

  addProductSuccess(state, data) {
    console.log(data);
    state.shoppingCart = data.shoppingCart;
    state.shippingCosts = data.shippingCosts;
    calculateProductCounter(state);
  },

  removeProductSuccess(state, data) {
    state.shoppingCart = data.shoppingCart;
    state.shippingCosts = data.shippingCosts;
    calculateProductCounter(state);
  },

  updateCartSuccess(state, data) {
    state.shoppingCart = data.shoppingCart;
    state.shippingCosts = data.shippingCosts;
    //state.loadedCart = [];
    calculateProductCounter(state);
  },

  emptyLoadedCartSuccess(state) {
    state.loadedCart = [];
  },

  emptyShoppingCartSuccess(state) {
    state.shoppingCart = [];
    state.productCounter = 0;
    state.shippingCosts = 0;
  },

  setOwnedStoreIdSuccess(state, storeId) {
    console.log(storeId);
    state.user.ownedStoreId = storeId;
  },

  // Favorites
  addStoreToFavoritesSuccess(state, storeId) {
    state.favoriteStores.push(storeId);
  },

  addStoreToFavoritesFailure() {},

  removeStoreFromFavoritesSuccess(state, storeId) {
    state.favoriteStores.splice(state.favoriteStores.indexOf(storeId), 1);
  },

  removeStoreFromFavoritesFailure() {},
};

export const account = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
