/* eslint-disable prettier/prettier */
const state = {
    counter: 0,
    productsInCart: []
    /*
    products:
    [[product, amount],[product, amount]...]
    */
}

const actions = {
    increaseCounter({
        commit
    }, amount) {
        commit('increaseCounter', amount)
    },
    decreaseCounter({
        commit
    }, amount) {
        commit('decreaseCounter', amount)
    },
    addProduct({
        commit
    }, productAmountObject) {
        commit('addProduct', productAmountObject)
        commit('increaseCounter', productAmountObject["amount"])
    },
    removeProduct({
        commit
    }, productAmountObject) {
        commit('removeProduct', productAmountObject)
        commit('decreaseCounter', productAmountObject["amount"])
    }
}

const mutations = {
    addProduct(state, productAmountObject) {

        var addedProduct = productAmountObject["product"]
        var addedAmount = productAmountObject["amount"]

        var found = false;

        for (var i = 0; i < state.productsInCart.length; i++) {
            //Check if added product is already in cart and increase amount if yes
            if (state.productsInCart[i][0].id == addedProduct.id) {
                state.productsInCart[i][1] = state.productsInCart[i][1] + addedAmount
                found = true;
                break;
            }
        }
        //add product to cart if it is not already there
        if (found == false) {
            state.productsInCart.push([addedProduct, addedAmount])
        }
    },
    removeProduct(state, productAmountObject) {
        console.log("remove: " + productAmountObject["product"] + " amount: " + productAmountObject["amount"])
    },
    increaseCounter(state, amount) {
        state.counter = state.counter + amount
    },
    decreaseCounter(state, amount) {
        state.counter = state.counter - amount
    }

}

export const shoppingCart = {
    namespaced: true,
    state,
    actions,
    mutations
}