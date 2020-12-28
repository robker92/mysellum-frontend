/* eslint-disable prettier/prettier */
import {
    userService
} from "../services";

const state = {
    //productCounter: 0,
    //shoppingCart: []
    /*
    products:
    [[product, amount],[product, amount]...]
    */
}

const actions = {
    increaseproductCounter({
        commit
    }, amount) {
        commit('increaseproductCounter', amount)
    },
    decreaseproductCounter({
        commit
    }, amount) {
        commit('decreaseproductCounter', amount)
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
    removeProduct({
        commit
    }, productAmountObject) {
        commit('removeProduct', productAmountObject)
        commit('decreaseproductCounter', productAmountObject["amount"])
    }
}

const mutations = {
    // addProduct(state, productAmountObject) {

    //     var addedProduct = productAmountObject["product"]
    //     var addedAmount = productAmountObject["amount"]

    //     var found = false;

    //     for (var i = 0; i < state.productsInCart.length; i++) {
    //         //Check if added product is already in cart and increase amount if yes
    //         if (state.productsInCart[i][0].id == addedProduct.id) {
    //             state.productsInCart[i][1] = state.productsInCart[i][1] + addedAmount
    //             found = true;
    //             break;
    //         }
    //     }
    //     //add product to cart if it is not already there
    //     if (found == false) {
    //         state.productsInCart.push([addedProduct, addedAmount])
    //     }
    // },
    addProductRequest(state, shoppingCart) {
        state.shoppingCart = shoppingCart

    },
    addProductSuccess(state, shoppingCart) {
        //add shopping cart to state
        state.shoppingCart = shoppingCart
        console.log(state.shoppingCart)

        //Count the products which are in the cart
        var counter = 0;
        for (var i = 0; i < shoppingCart.length; i++) {
            counter = counter + shoppingCart[i][1];
        }
        console.log(counter)
        state.productCounter = counter
    },
    removeProductRequest(state, productAmountObject) {
        console.log("remove: " + productAmountObject["product"] + " amount: " + productAmountObject["amount"])
    },
    increaseproductCounter(state, amount) {
        state.productCounter = state.productCounter + amount
    },
    decreaseproductCounter(state, amount) {
        state.productCounter = state.productCounter - amount
    }

}

export const shoppingCart = {
    namespaced: true,
    state,
    actions,
    mutations
}