/* eslint-disable prettier/prettier */
export function calculateTotalCartSum(shoppingCart) {
    var sum = 0.0;
    for (var i = 0; i < shoppingCart.length; i++) {
        sum = sum + parseFloat(shoppingCart[i][0].price) * shoppingCart[i][1];
    }
    return sum.toFixed(2);
}