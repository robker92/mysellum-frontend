/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* import {
    userService
} from "../services"; */

const state = {
    // orderData: {
    //     shippingAddress: {
    //         firstName: "",
    //         lastName: "",
    //         addressLine1: "",
    //         city: "",
    //         postcode: ""
    //     },
    //     billingAddress: {
    //         firstName: "",
    //         lastName: "",
    //         addressLine1: "",
    //         city: "",
    //         postcode: ""
    //     },
    //     payment: ""
    // }
    orderData: {}
}


const actions = {
    saveOrderDataToState({
        dispatch,
        commit,
        state
    }, orderData) {
        commit("saveOrderDataSuccess", orderData);
        // userService.login(orderData).then(
        //     user => {
        //         commit("loginSuccess", user);
        //     },
        //     error => {
        //         commit("loginFailure", error);
        //         // dispatch("alert/error", error, {
        //         //     root: true
        //         // });
        //     }
        //     //commit("loginSuccess", user)
        // );
    }
}

const mutations = {
    saveOrderDataSuccess(state, orderData) {
        // state.loggedIn = true;
        // state.shippingAddress = orderData.shippingAddress;
        // state.billingAddress = orderData.billingAddress;
        // state.payment = orderData.payment;
        state.orderData = orderData;
    }
}

export const order = {
    namespaced: true,
    state,
    actions,
    mutations
};