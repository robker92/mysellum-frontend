import store from "../store";
console.log(store);
/* eslint-disable prettier/prettier */
export function calculateTotalCartSum(shoppingCart) {
    var sum = 0.0;
    for (var i = 0; i < shoppingCart.length; i++) {
        sum = sum + parseFloat(shoppingCart[i][0].price) * shoppingCart[i][1];
    }
    return sum.toFixed(2);
}

// export function addProductLoggedOut(product, quantity) {
//     let vuexObjct = JSON.parse(localStorage.getItem("vuex"));
//     let arrayElement = [product, parseInt(quantity)];
//     let currentCart = vuexObjct.account.shoppingCart;
//     let currentCounter = vuexObjct.account.productCounter;

//     let found = false;
//     for (let i = 0; i < currentCart.length; i++) {
//         if (
//             product.productId === currentCart[i][0].productId &&
//             product.storeId === currentCart[i][0].storeId
//         ) {
//             //Product already in cart
//             found = true;
//             currentCart[i][1] = currentCart[i][1] + parseInt(quantity);
//             currentCounter = currentCounter + parseInt(quantity);
//             //localStorage.setItem("cart", JSON.stringify(currentCart));
//             break;
//         }
//     }
//     //Product not in cart
//     if (found === false) {
//         // TODO
//         currentCart.push(arrayElement);
//         currentCounter = currentCounter + parseInt(quantity);
//         //localStorage.setItem("vuex", JSON.stringify(vuexObjct));
//     }
//     vuexObjct.account.shoppingCart = currentCart;
//     vuexObjct.account.productCounter = currentCounter;
//     localStorage.setItem("vuex", JSON.stringify(vuexObjct));
// }

// export function removeProductLoggedOut(product, quantity) {
//     let vuexObjct = JSON.parse(localStorage.getItem("vuex"));
//     // TODO
//     let currentCart = vuexObjct.account.shoppingCart;
//     let currentCounter = vuexObjct.account.productCounter;

//     for (var i = 0; i < currentCart.length; i++) {
//         //Check if added product exists in cart
//         if (
//             currentCart[i][0].productId === product.productId &&
//             currentCart[i][0].storeId === product.storeId
//         ) {
//             currentCart[i][1] = currentCart[i][1] - parseInt(quantity);
//             currentCounter = currentCounter - parseInt(quantity);
//             //Delete the array element if amount == 0
//             if (currentCart[i][1] <= 0) {
//                 currentCart.splice(i, 1);
//                 console.log(currentCart);
//             }
//             break;
//         }
//     }
//     vuexObjct.account.shoppingCart = currentCart;
//     vuexObjct.account.productCounter = currentCounter;
//     localStorage.setItem("vuex", JSON.stringify(vuexObjct));
// }

export function addProductLoggedOutHelper(product, quantity, currentCart) {
    return new Promise((resolve) => {
        //delete the image to save localstorage space
        delete product["imgSrc"];
        let arrayElement = [product, quantity];

        let found = false;
        for (let i = 0; i < currentCart.length; i++) {
            if (
                product.productId === currentCart[i][0].productId &&
                product.storeId === currentCart[i][0].storeId
            ) {
                //Product already in cart
                found = true;
                arrayElement[1] = parseInt(quantity) + currentCart[i][1];
                currentCart.splice(i, 1, arrayElement);
                break;
            };
        };
        //Product not in cart
        if (found === false) {
            currentCart.push(arrayElement);
        }
        resolve(currentCart);
    });
};

export function removeProductLoggedOutHelper(product, quantity, currentCart) {
    return new Promise((resolve) => {
        let arrayElement = [product];
        for (let i = 0; i < currentCart.length; i++) {
            //Check if added product exists in cart
            if (
                currentCart[i][0].productId === product.productId &&
                currentCart[i][0].storeId === product.storeId
            ) {
                arrayElement[1] = currentCart[i][1] - parseInt(quantity);
                currentCart.splice(i, 1, arrayElement);
                if (currentCart[i][1] <= 0) {
                    currentCart.splice(i, 1);
                };
                break;
            };
        };
        //return currentCart;
        resolve(currentCart);
    })
};

export function shoppingCartMerge(cart1, cart2) {
    return new Promise((resolve) => {
        let found;
        //Run through cart2
        for (let i = 0; i < cart2.length; i++) {
            //run through cart 1 and look for cart 2's product
            found = false;
            for (let j = 0; j < cart1.length; j++) {
                if (
                    cart2[i][0].productId === cart1[j][0].productId &&
                    cart2[i][0].storeId === cart1[j][0].storeId
                ) {
                    found = true;
                    cart1[j][1] = cart1[j][1] + cart2[i][1];
                    break;
                };
            };
            //when the product was not found, push it to cart 1
            if (found === false) {
                cart1.push(cart2[i]);
            };
        };
        resolve(cart1);
    });
};

export function shoppingCartUndoMerge(cart1, cart2) {
    return new Promise((resolve) => {
        //Run through cart2
        for (let i = 0; i < cart2.length; i++) {
            //run through cart 1 and look for cart 2's product
            for (let j = 0; j < cart1.length; j++) {
                if (
                    cart2[i][0].productId === cart1[j][0].productId &&
                    cart2[i][0].storeId === cart1[j][0].storeId
                ) {
                    //decrease cart 1's quantity by cart 2's quantity
                    cart1[j][1] = cart1[j][1] - cart2[i][1];
                    //when the quantity is zero remove the complete product
                    if (cart1[j][1] <= 0) {
                        cart1.splice(j, 1);
                    };
                    break;
                };
            };
        };
        resolve(cart1);
    });
};