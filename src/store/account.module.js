/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { userService } from "../services";
import {
  // getCookie,
  addProductLoggedOutHelper,
  removeProductLoggedOutHelper,
  checkAuthentication,
  errorHandler
} from "../helpers";
import { getCookie } from "../helpers/auth-header";
import { i18n } from "../main";
//import router from "../router";

// const user = JSON.parse(localStorage.getItem("vuex"));
// const shoppingCart = JSON.parse(localStorage.getItem("vuex"));
// const productCounter = JSON.parse(localStorage.getItem("vuex"));
const vuexObjct = JSON.parse(localStorage.getItem("vuex"));
const loggedIn = getCookie("authToken");

const state = loggedIn
  ? {
      loggedIn: true,
      user: vuexObjct.account.user,
      shoppingCart: vuexObjct.account.shoppingCart,
      loadedCart: vuexObjct.account.loadedCart,
      productCounter: vuexObjct.account.productCounter
    }
  : {
      loggedIn: false,
      user: {},
      shoppingCart: [],
      loadedCart: [],
      productCounter: 0
    };

const getters = {
  loginInfo: state => {
    console.log("@getter");
    console.log(state.user);
    return state.loggedIn;
  }
};

const actions = {
  login({ dispatch, commit, state }, credentials) {
    // set state to loggingIn with email only
    return new Promise((resolve, reject) => {
      userService
        .login(credentials)
        .then(data => {
          commit("loginSuccess", {
            user: data.user,
            shoppingCart: data.shoppingCart
          });
          resolve(data.message);
        })
        .catch(error => {
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
        .then(result => {
          commit("registerSuccess", {
            user: result.user,
            shoppingCart: result.shoppingCart
          });
          resolve(result);
        })
        .catch(error => {
          commit("registerFailure", error);
          reject(error);
        });
    });
  },

  addProduct({ commit, dispatch }, data) {
    userService
      .addToShoppingCart(data)
      .then(shoppingCart => {
        commit("addProductSuccess", shoppingCart);
      })
      .catch(error => {
        errorHandler(error, "addProduct");
        commit("addProductFailure", error);
      });
  },

  removeProduct({ commit }, data) {
    userService
      .removeFromShoppingCart(data)
      .then(shoppingCart => {
        commit("removeProductSuccess", shoppingCart);
      })
      .catch(error => {
        errorHandler(error, "removeProduct");
        commit("removeProductFailure", error);
      });
  },

  addProductLoggedOut({ commit, state }, data) {
    addProductLoggedOutHelper(
      data.product,
      data.quantity,
      state.shoppingCart
    ).then(updatedCart => {
      commit("addProductSuccess", updatedCart);
    });
  },
  removeProductLoggedOut({ commit, state }, data) {
    removeProductLoggedOutHelper(
      data.product,
      data.quantity,
      state.shoppingCart
    ).then(updatedCart => {
      commit("addProductSuccess", updatedCart);
    });
  },

  updateCart({ dispatch, commit, state }, data) {
    return new Promise((resolve, reject) => {
      userService
        .updateShoppingCart({
          email: data.email,
          cart: data.cart
        })
        .then(() => {
          commit("updateCartSuccess", data.cart);
          resolve(data.cart);
        })
        .catch(error => {
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
  }
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
  loginSuccess(state, response) {
    state.loggedIn = true;
    state.user = response.user;
    if (state.shoppingCart.length > 0) {
      state.loadedCart = response.shoppingCart;
    } else {
      state.shoppingCart = response.shoppingCart;
    }
    //concatenate shopping carts
    calculateProductCounter(state);
  },

  loginFailure(state) {
    state.loggedIn = false;
    state.user = {};
  },

  logout(state) {
    state.loggedIn = false;
    state.user = {};
    state.shoppingCart = [];
    state.loadedCart = [];
    state.productCounter = 0;
  },

  registerRequest(state, user) {
    state.registering = true;
    state.user = {};
  },

  registerSuccess(state, response) {
    // state.status = {};
    state.loggedIn = true;
    state.user = response.user;
    state.shoppingCart = response.shoppingCart;
  },

  registerFailure(state, error) {
    //state.status = {};
    state.loggedIn = false;
    state.user = {};
  },

  addProductSuccess(state, shoppingCart) {
    state.shoppingCart = shoppingCart;
    calculateProductCounter(state);
  },

  addProductFailure(state) {},

  deleteProductSuccess(state, shoppingCart) {
    state.shoppingCart = shoppingCart;
    calculateProductCounter(state);
  },

  removeProductSuccess(state, shoppingCart) {
    state.shoppingCart = shoppingCart;
    calculateProductCounter(state);
  },

  updateCartSuccess(state, shoppingCart) {
    state.shoppingCart = shoppingCart;
    //state.loadedCart = [];
    calculateProductCounter(state);
  },

  updateCartFailure(state) {},

  emptyLoadedCartSuccess(state) {
    state.loadedCart = [];
  },

  emptyShoppingCartSuccess(state) {
    state.shoppingCart = [];
    state.productCounter = 0;
  },

  setOwnedStoreIdSuccess(state, storeId) {
    console.log(storeId);
    state.user.ownedStoreId = storeId;
  }
};

export const account = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
