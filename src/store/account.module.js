/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
    userService
} from "../services";
//import router from "../router";

const user = localStorage.getItem("user");

const state = user ? {
    loggedIn: true,
    user: user
} : {
    loggedIn: false,
    user: {}
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
                    commit("loginSuccess", data.user);
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
                    commit("registerSuccess", result.user);
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
            });;
        });
    },

    addProduct({
        commit
    }, data) {
        //commit('increaseproductCounter', amount)

        userService.addToShoppingCart(data).then(
            shoppingCart => {
                //commit("loginSuccess", shoppingCart);
                commit('addProductSuccess', shoppingCart);
            },
            error => {
                commit("addProductFailure", error);
                // dispatch("alert/error", error, {
                //     root: true
                // });
            }
            //commit("loginSuccess", user)
        );
    },
    decreaseAmountByValue({
        commit
    }, data) {
        //commit('increaseproductCounter', amount)

        userService.removeFromShoppingCart(data).then(
            shoppingCart => {
                //commit("loginSuccess", shoppingCart);
                commit('decreaseAmountByValueSuccess', shoppingCart);
            },
            error => {
                commit("decreaseAmountByValueFailure", error);
                // dispatch("alert/error", error, {
                //     root: true
                // });
            }
            //commit("loginSuccess", user)
        );
    },
    deleteProduct({
        commit
    }, data) {
        //commit('increaseproductCounter', amount)

        userService.deleteProductInShoppingCart(data).then(
            shoppingCart => {
                //commit("loginSuccess", shoppingCart);
                commit('addProductSuccess', shoppingCart);
            },
            error => {
                commit("addProductFailure", error);
                // dispatch("alert/error", error, {
                //     root: true
                // });
            }
            //commit("loginSuccess", user)
        );
    }
};

function shoppingCartRoutine(state, shoppingCart) {
    state.user.shoppingCart = shoppingCart
    console.log("current cart:")
    console.log(shoppingCart)

    //Count the products which are in the cart
    var counter = 0;
    for (var i = 0; i < shoppingCart.length; i++) {
        counter = counter + shoppingCart[i][1];
    }
    console.log(counter)
    state.user.productCounter = counter
}

const mutations = {
    // loginRequest(state, user) {
    //     // state.status = {
    //     //     loggingIn: true
    //     // };
    //     state.user = user;
    //     //state.loggedIn = true;
    //     state.loggingIn = true;
    // },
    loginSuccess(state, user) {
        // state.status = {
        //     loggedIn: true
        // };
        // state.user = user;
        state.loggedIn = true;
        // console.log(user)
        state.user = user;
    },
    loginFailure(state) {
        // state.status = {};
        // state.user = null;
        state.loggedIn = false;
        state.user = {};
    },
    logout(state) {
        // state.status = {};
        // state.user = null;
        state.loggedIn = false;
        state.user = {};
    },
    registerRequest(state, user) {
        // state.status = {
        //     registering: true
        // };
        state.registering = true;
        state.user = {};
    },
    registerSuccess(state, user) {
        // state.status = {};
        state.loggedIn = true;
        state.user = user;
    },
    registerFailure(state, error) {
        //state.status = {};
        state.loggedIn = false;
        state.user = {};
    },
    addProductSuccess(state, shoppingCart) {
        shoppingCartRoutine(state, shoppingCart)
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
    deleteProductSuccess(state, shoppingCart) {
        shoppingCartRoutine(state, shoppingCart)
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
    decreaseAmountByValueSuccess(state, shoppingCart) {
        shoppingCartRoutine(state, shoppingCart)
        // state.shoppingCart = shoppingCart
        // console.log(state.shoppingCart)
    }
};

export const account = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};