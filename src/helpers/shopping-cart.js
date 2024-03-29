import store from "../store";
import { shippingService } from "../services";
// console.log(store);

export function calculateTotalCartSum(shoppingCart) {
  var sum = 0.0;
  for (var i = 0; i < shoppingCart.length; i++) {
    sum = sum + parseFloat(shoppingCart[i][0].price) * shoppingCart[i][1];
  }
  return sum.toFixed(2);
}

export async function addProductLoggedOutHelper(
  product,
  quantity,
  currentCart
) {
  let arrayElement = [product, quantity];

  let found = false;
  for (let i = 0; i < currentCart.length; i++) {
    if (
      product._id === currentCart[i][0]._id &&
      product.storeId === currentCart[i][0].storeId
    ) {
      //Product already in cart
      found = true;
      arrayElement[1] = parseInt(quantity) + currentCart[i][1];
      currentCart.splice(i, 1, arrayElement);
      break;
    }
  }
  //Product not in cart
  if (found === false) {
    currentCart.push(arrayElement);
  }

  const response = await shippingService.getShippingCosts(currentCart);

  return { shoppingCart: currentCart, shippingCosts: response.shippingCosts };
}

export async function removeProductLoggedOutHelper(
  product,
  quantity,
  currentCart
) {
  let arrayElement = [product];
  for (let i = 0; i < currentCart.length; i++) {
    // Check if added product exists in cart
    if (
      currentCart[i][0]._id === product._id &&
      currentCart[i][0].storeId === product.storeId
    ) {
      arrayElement[1] = currentCart[i][1] - parseInt(quantity);
      currentCart.splice(i, 1, arrayElement);
      if (currentCart[i][1] <= 0) {
        currentCart.splice(i, 1);
      }
      break;
    }
  }
  const response = await shippingService.getShippingCosts(currentCart);

  return { shoppingCart: currentCart, shippingCosts: response.shippingCosts };
}

export async function shoppingCartMerge(cart1, cart2) {
  let found;
  // Run through cart2
  for (let i = 0; i < cart2.length; i++) {
    // run through cart 1 and look for cart 2's product
    found = false;
    for (let j = 0; j < cart1.length; j++) {
      if (
        cart2[i][0]._id === cart1[j][0]._id &&
        cart2[i][0].storeId === cart1[j][0].storeId
      ) {
        found = true;
        cart1[j][1] = cart1[j][1] + cart2[i][1];
        break;
      }
    }
    // when the product was not found, push it to cart 1
    if (found === false) {
      cart1.push(cart2[i]);
    }
  }
  // const response = await shippingService.getShippingCosts(cart1);

  return cart1;
  // {
  //   shoppingCart: cart1,
  //   // shippingCosts: response.shippingCosts
  // };
}

export async function shoppingCartUndoMerge(cart1, cart2) {
  // Run through cart2
  for (let i = 0; i < cart2.length; i++) {
    // run through cart 1 and look for cart 2's product
    for (let j = 0; j < cart1.length; j++) {
      if (
        cart2[i][0]._id === cart1[j][0]._id &&
        cart2[i][0].storeId === cart1[j][0].storeId
      ) {
        // decrease cart 1's quantity by cart 2's quantity
        cart1[j][1] = cart1[j][1] - cart2[i][1];
        // when the quantity is zero remove the complete product
        if (cart1[j][1] <= 0) {
          cart1.splice(j, 1);
        }
        break;
      }
    }
  }

  // const response = await shippingService.getShippingCosts(cart1);

  return cart1;
  // {
  //   shoppingCart: cart1,
  //   // shippingCosts: response.shippingCosts
  // };
}
