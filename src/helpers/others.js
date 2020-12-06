/* eslint-disable prettier/prettier */
export function calculateTotalCartSum(shoppingCart) {
    var sum = 0.0;
    for (var i = 0; i < shoppingCart.length; i++) {
        sum = sum + parseFloat(shoppingCart[i][0].price) * shoppingCart[i][1];
    }
    return sum.toFixed(2);
}

export function getBrowserLocale(options = {}) {
    const defaultOptions = {
        countryCodeOnly: false
    };

    const opt = {
        ...defaultOptions,
        ...options
    };

    const navigatorLocale =
        navigator.languages !== undefined ?
        navigator.languages[0] :
        navigator.language;

    if (!navigatorLocale) {
        return undefined;
    }

    const trimmedLocale = opt.countryCodeOnly ?
        navigatorLocale.trim().split(/-|_/)[0] :
        navigatorLocale.trim();

    return trimmedLocale;
}