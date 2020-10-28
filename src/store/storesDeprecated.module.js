/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
    storeService
} from "../services";

const state = {}
const getters = {}
const actions = {
    addReview({
        commit
    }, data) {
        //commit('increaseproductCounter', amount)
        //console.log(storeService)
        storeService.addReview(data).then(
            reviews => {
                //commit("loginSuccess", shoppingCart);
                commit('addReviewSuccess', reviews);
            },
            error => {
                commit("addReviewFailure", error);
                // dispatch("alert/error", error, {
                //     root: true
                // });
            }
            //commit("loginSuccess", user)
        );
    },
    createStore({
        commit
    }, data) {
        //commit('increaseproductCounter', amount)
        //console.log(storeService)
        storeService.createStore(data).then(
            store => {
                //commit("loginSuccess", shoppingCart);
                commit('createStoreSuccess', store);
            },
            error => {
                commit("createStoreFailure", error);
                // dispatch("alert/error", error, {
                //     root: true
                // });
            }
            //commit("loginSuccess", user)
        );
    },
    addProduct({
        commit
    }, data) {
        //commit('increaseproductCounter', amount)
        //console.log(storeService)
        console.log("@ store 1")
        storeService.addProduct(data).then(
            console.log("@ store 2"),
            products => {
                //commit("loginSuccess", shoppingCart);
                commit('addProductSuccess', products);
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
}
const mutations = {
    addReviewSuccess(state, reviews) {
        console.log(reviews)
    },
    addReviewFailure(state, error) {
        console.log(error)
    },
    createStoreSuccess(state, store) {
        console.log(store)
    },
    createStoreFailure(state, error) {
        console.log(error)
    },
    addProductSuccess(state, products) {
        console.log("@commit")
        console.log(products)
        return products
    },
    addProductFailure(state, error) {
        console.log(error)
    }
}

export const stores = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};