/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
    userService
} from "../services";
import {
    getCookie,
    addProductLoggedOutHelper,
    removeProductLoggedOutHelper,
    checkAuthentication,
    errorHandler
    // shoppingCartMerge,
    // shoppingCartUndoMerge
} from "../helpers";
import {
    i18n
} from "../main";
//import router from "../router";

// const user = JSON.parse(localStorage.getItem("vuex"));
// const shoppingCart = JSON.parse(localStorage.getItem("vuex"));
// const productCounter = JSON.parse(localStorage.getItem("vuex"));
const vuexObjct = JSON.parse(localStorage.getItem("vuex"));
const loggedIn = getCookie("authToken");

const state = loggedIn ? {
    loggedIn: true,
    user: vuexObjct.account.user,
    shoppingCart: vuexObjct.account.shoppingCart,
    loadedCart: vuexObjct.account.loadedCart,
    productCounter: vuexObjct.account.productCounter
} : {
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
    login({
        dispatch,
        commit,
        state
    }, credentials) {
        // set state to loggingIn with email only
        //commit("loginRequest", credentials.email);
        // console.log("@login");
        // console.log(credentials)
        //console.log(password)
        return new Promise((resolve, reject) => {
            userService.login(credentials).then(
                data => {
                    commit("loginSuccess", {
                        user: data.user,
                        shoppingCart: data.shoppingCart
                    });
                    resolve(data.message)
                },
                // error => {
                //     console.log(error)
                //     commit("loginFailure", error);
                //     reject(error)
                //     // dispatch("alert/error", error, {
                //     //     root: true
                //     // });
                // }
                //commit("loginSuccess", user)
            ).catch((error) => {
                //console.log(error)
                commit("loginFailure", error);
                reject(error)
            });
        });
    },

    logout({
        commit
    }) {
        userService.logout();
        commit("logout");
    },

    verifyRegistration({
        dispatch,
        commit,
        state
    }, token) {
        //commit("registerRequest", user);
        //console.log("@register");
        return new Promise((resolve, reject) => {
            userService.verifyRegistration(token).then(
                result => {
                    commit("registerSuccess", {
                        user: result.user,
                        shoppingCart: result.shoppingCart
                    });
                    resolve(result);
                    //router.push('/login')
                    // setTimeout(() => {
                    //     // display success message after route change completes
                    //     dispatch("alert/success", "Registration successful", {
                    //         root: true
                    //     });
                    // });
                }
            ).catch((error) => {
                //console.log(error)
                commit("registerFailure", error);
                reject(error)
            });

        });
    },

    addProduct({
        commit,
        dispatch
    }, data) {
        //commit('increaseproductCounter', amount)
        //return new Promise((resolve, reject) => {
        userService.addToShoppingCart(data).then(
            shoppingCart => {
                //commit("loginSuccess", shoppingCart);
                commit('addProductSuccess', shoppingCart);
                //resolve();
            }).catch(error => {
            errorHandler(error, "addProduct");
            commit("addProductFailure", error);
            // if (checkAuthentication(error)) {
            //     dispatch("snackbar/addErrorSnackbar", "Error Message", {
            //         root: true
            //     })
            //     commit("addProductFailure", error);
            // }
            //reject(error);
        });
        //});
    },

    removeProduct({
        commit
    }, data) {
        //commit('increaseproductCounter', amount)
        //return new Promise((resolve, reject) => {
        userService.removeFromShoppingCart(data).then(
            shoppingCart => {
                //commit("loginSuccess", shoppingCart);
                commit('removeProductSuccess', shoppingCart);
                //resolve();
            }).catch(error => {
            errorHandler(error, "removeProduct");
            commit("removeProductFailure", error);
            //reject(error);
        });
        //});
    },

    // deleteProduct({
    //     commit
    // }, data) {
    //     //commit('increaseproductCounter', amount)

    //     userService.deleteProductInShoppingCart(data).then(
    //         shoppingCart => {
    //             //commit("loginSuccess", shoppingCart);
    //             commit('addProductSuccess', shoppingCart);
    //         },
    //         error => {
    //             commit("addProductFailure", error);
    //             // dispatch("alert/error", error, {
    //             //     root: true
    //             // });
    //         }
    //         //commit("loginSuccess", user)
    //     );
    // },

    addProductLoggedOut({
        commit,
        state
    }, data) {
        addProductLoggedOutHelper(data.product, data.quantity, state.shoppingCart).then(updatedCart => {
            commit('addProductSuccess', updatedCart);
        });
    },
    removeProductLoggedOut({
        commit,
        state
    }, data) {
        removeProductLoggedOutHelper(data.product, data.quantity, state.shoppingCart).then(updatedCart => {
            commit('addProductSuccess', updatedCart);
        });
    },

    // mergeCarts({
    //     dispatch,
    //     commit,
    //     state
    // }) {
    //     return new Promise((resolve, reject) => {
    //         shoppingCartMerge(state.shoppingCart, state.loadedCart).then(
    //             cart => {
    //                 commit("mergeSuccess", cart);
    //                 resolve(cart);
    //             }
    //         ).catch((error) => {
    //             commit("mergeFailure", error);
    //             reject(error)
    //         });
    //     });
    // },

    // undoMerge({
    //     dispatch,
    //     commit,
    //     state
    // }) {
    //     return new Promise((resolve, reject) => {
    //         console.log(state)
    //         console.log(state.shoppingCart)
    //         console.log(state.loadedCart)
    //         shoppingCartUndoMerge(state.shoppingCart, state.loadedCart).then(
    //             cart => {
    //                 commit("undoMergeSuccess", cart);
    //                 resolve(cart);
    //             }
    //         ).catch((error) => {
    //             commit("undoMergeFailure", error);
    //             reject(error)
    //         });
    //     });
    // },

    updateCart({
        dispatch,
        commit,
        state
    }, data) {
        return new Promise((resolve, reject) => {
            userService.updateShoppingCart({
                email: data.email,
                cart: data.cart
            }).then(
                () => {
                    commit("updateCartSuccess", data.cart);
                    resolve(data.cart);
                }
            ).catch((error) => {
                commit("updateCartFailure", error);
                reject(error)
            });
        });
    },

    emptyLoadedCart({
        dispatch,
        commit,
        state
    }) {
        commit("emptyLoadedCartSuccess");
    },
};

// function shoppingCartRoutine(state, shoppingCart) {
//     state.shoppingCart = shoppingCart;
//     //Count the products which are in the cart
//     let counter = 0;
//     for (let i = 0; i < shoppingCart.length; i++) {
//         counter = counter + shoppingCart[i][1];
//     };
//     //state.user.productCounter = counter
//     state.productCounter = counter;
// };

function calculateProductCounter(state) {
    let counter = 0;
    for (let i = 0; i < state.shoppingCart.length; i++) {
        counter = counter + state.shoppingCart[i][1];
    };
    if (state.loadedCart.length !== 0) {
        for (let i = 0; i < state.loadedCart.length; i++) {
            counter = counter + state.loadedCart[i][1];
        };
    };
    state.productCounter = counter;
};

const mutations = {
    // loginRequest(state, user) {
    //     // state.status = {
    //     //     loggingIn: true
    //     // };
    //     state.user = user;
    //     //state.loggedIn = true;
    //     state.loggingIn = true;
    // },
    loginSuccess(state, response) {
        // state.status = {
        //     loggedIn: true
        // };
        // state.user = user;
        //console.log(response)
        state.loggedIn = true;
        // console.log(user)
        state.user = response.user;
        //let cart = response.shoppingCart;
        if (state.shoppingCart.length > 0) {
            state.loadedCart = response.shoppingCart;
        } else {
            state.shoppingCart = response.shoppingCart;
        };
        //concatenate shopping carts
        calculateProductCounter(state);
        //shoppingCartRoutine(state, cart);
        //state.shoppingCart = response.shoppingCart;
        //state.productCounter = response.shoppingCart;
    },
    loginFailure(state) {
        // state.status = {};
        // state.user = null;
        state.loggedIn = false;
        state.user = {};
        //state.shoppingCart = [];
    },
    logout(state) {
        // state.status = {};
        // state.user = null;
        state.loggedIn = false;
        state.user = {};
        state.shoppingCart = [];
        state.loadedCart = [];
        state.productCounter = 0;
    },
    registerRequest(state, user) {
        // state.status = {
        //     registering: true
        // };
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
        //shoppingCartRoutine(state, shoppingCart);
        //add shopping cart to state
        // state.shoppingCart = shoppingCart
        // console.log(state.shoppingCart)

        // //Count the products which are in the cart
        // var counter = 0;
        // for (var i = 0; i < shoppingCart.length; i++) {
        //     counter = counter + shoppingCart[i][1];
        // }
        // console.log(counter)
        // state.user.productCounter = counter
    },
    addProductFailure(state) {},
    deleteProductSuccess(state, shoppingCart) {
        state.shoppingCart = shoppingCart;
        calculateProductCounter(state);
        //shoppingCartRoutine(state, shoppingCart);
        //add shopping cart to state
        // state.shoppingCart = shoppingCart
        // console.log(state.shoppingCart)

        // //Count the products which are in the cart
        // var counter = 0;
        // for (var i = 0; i < shoppingCart.length; i++) {
        //     counter = counter + shoppingCart[i][1];
        // }
        // console.log(counter)
        // state.user.productCounter = counter
    },
    removeProductSuccess(state, shoppingCart) {
        state.shoppingCart = shoppingCart;
        calculateProductCounter(state);
        //shoppingCartRoutine(state, shoppingCart)
        // state.shoppingCart = shoppingCart
        // console.log(state.shoppingCart)
    },
    // mergeSuccess(state, shoppingCart) {
    //     state.shoppingCart = shoppingCart;
    //     //state.loadedCart = [];
    //     calculateProductCounter(state);
    // },
    // mergeFailure(state) {},
    updateCartSuccess(state, shoppingCart) {
        state.shoppingCart = shoppingCart;
        //state.loadedCart = [];
        calculateProductCounter(state);
    },
    updateCartFailure(state) {},
    // undoMergeSuccess(state, shoppingCart) {
    //     console.log(shoppingCart)
    //     state.shoppingCart = shoppingCart;
    //     //state.loadedCart = [];
    //     calculateProductCounter(state);
    // },
    // undoMergeFailure(state) {},
    emptyLoadedCartSuccess(state) {
        state.loadedCart = [];
    }
};

export const account = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};