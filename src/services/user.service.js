/* eslint-disable no-useless-catch */

import { baseClient } from "./client";
import { authHeader, getCookie } from "../helpers";

export const userService = {
  getSingleUser,
  updateUser,
  login,
  logout,
  register,
  resendVerificationEmail,
  verifyRegistration,
  addToShoppingCart,
  removeFromShoppingCart,
  updateShoppingCart,
  // Favorites:
  addStoreToFavorites,
  removeStoreFromFavorites,
  // Reset Password:
  sendResetPasswordMail,
  checkResetToken,
  resetPassword,
};

async function getSingleUser() {
  let response;
  try {
    response = await baseClient.get(`/users`, {
      headers: authHeader(),
    });
  } catch (error) {
    throw error;
  }

  return response.data.user;
}

async function updateUser(data) {
  let response;
  try {
    response = await baseClient.post(`/users`, data, {
      headers: authHeader(),
    });
  } catch (error) {
    throw error;
  }

  return response.data.user;
}

async function login(credentials) {
  let response;
  try {
    response = await baseClient.post("/auth/login-user", credentials);
  } catch (error) {
    throw error;
  }
  localStorage.setItem("authToken", response.data.authToken);
  // console.log(getCookie("authToken"));
  // if (!getCookie("authToken")) {
  //   throw new Error("No Cookie set!");
  // }
  console.log(response.data.userData);
  return response.data.userData;
}

function logout() {
  // Cookie approach:
  // remove auth control cookie to log user out
  // document.cookie = "authControl=false";
  // document.cookie =
  //   "authControl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // local storage approach:
  localStorage.removeItem("authToken");
}

async function register(data) {
  let response;
  try {
    response = await baseClient.post("/auth/register-user", data);
  } catch (error) {
    throw error;
  }

  return response.data;
}

async function verifyRegistration(token) {
  let response;
  try {
    response = await baseClient.post(`/auth/verify-registration/${token}`);
  } catch (error) {
    throw error;
  }

  // TODO
  // if (response.data.user.token) {
  //   // store user details and jwt token in local storage to keep user logged in between page refreshes
  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify({
  //       token: response.data.user.token,
  //     })
  //   );
  // }

  localStorage.setItem("authToken", response.data.authToken);

  return response.data.userData;
}

async function addToShoppingCart(data) {
  // console.log(data);
  let response;
  try {
    response = await baseClient.patch(
      `/cart/add`,
      { product: data.product, amount: data.amount },
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
  const shoppingCart = response.data.shoppingCart;
  const shippingCosts = response.data.shippingCosts;

  return { shoppingCart, shippingCosts };
}

async function removeFromShoppingCart(data) {
  let response;
  try {
    response = await baseClient.patch(
      `/cart/remove`,
      { product: data.product, amount: data.amount },
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
  const shoppingCart = response.data.shoppingCart;
  const shippingCosts = response.data.shippingCosts;

  return { shoppingCart, shippingCosts };
}

async function updateShoppingCart(inputShoppingCart) {
  let response;
  try {
    response = await baseClient.patch(
      `/cart/update`,
      {
        shoppingCart: inputShoppingCart,
      },
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }

  const shoppingCart = response.data.shoppingCart;
  const shippingCosts = response.data.shippingCosts;

  return {
    shoppingCart,
    shippingCosts,
  };
}

async function resendVerificationEmail(data) {
  let response;
  try {
    response = await baseClient.post(`/auth/resend-verification-email`, data);
  } catch (error) {
    console.log(error.message);
    throw error;
  }

  return response.data;
}

async function sendResetPasswordMail(data) {
  let response;
  try {
    response = await baseClient.post(`/auth/send-password-reset-mail`, data);
  } catch (error) {
    console.log(error.message);
    throw error;
  }

  return response.data;
}

async function checkResetToken(token) {
  let response;
  try {
    response = await baseClient.get(`/auth/check-reset-token/${token}`);
  } catch (error) {
    console.log(error.message);
    throw error;
  }

  return response.data;
}

async function resetPassword(data) {
  let response;
  try {
    response = await baseClient.post(`/auth/reset-password/${data.token}`, {
      password: data.password,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }

  return response.data;
}

async function addStoreToFavorites(storeId) {
  let response;
  try {
    response = await baseClient.post(
      `/users/favorite-store`,
      {
        storeId: storeId,
      },
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
  return storeId;
}

async function removeStoreFromFavorites(storeId) {
  let response;
  try {
    response = await baseClient.delete(`/users/favorite-store/${storeId}`, {
      headers: authHeader(),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
  return storeId;
}

//REFACTOR
// eslint-disable-next-line no-unused-vars
function handleResponse(fctn) {
  console.log("@ handler");
  const response = fctn;
  if (response instanceof Error) {
    console.log("@error at handler");
    return Promise.reject(response);
  }
  return Promise.resolve(response);
  //return response.then(text => {
  // return response.then(text => {
  //     const data = text && JSON.parse(text);
  //     if (!response.ok) {
  //         if (response.status === 401) {
  //             // auto logout if 401 response returned from api
  //             logout();
  //             location.reload(true);
  //         }

  //         const error = (data && data.message) || response.statusText;
  //         throw error;
  //     }

  //     return data;
  // });
  // console.log("hi1")
  // if (response instanceof Error) {
  //     let data = response && JSON.parse(response);
  //     let error = (data && data.message) || response.statusText;
  //     throw error;
  // } else {
  //     Promise.resolve(response);
  // }
}
