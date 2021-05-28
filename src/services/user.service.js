/* eslint-disable prettier/prettier */
//import config from './config'
import axios from "axios";

import { authHeader } from "../helpers";

const usersBaseURL = "http://127.0.0.1:3000";

const usersClient = axios.create({
  baseURL: usersBaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 20000,
  withCredentials: true
});

async function getSingleUser(email) {
  let response = await usersClient.get(`/users/${email}`);
  console.log(response.data);

  return response.data;
}

async function login(credentials) {
  let response;
  try {
    response = await usersClient.post("/auth/login-user", credentials);
  } catch (error) {
    throw error;
  }
  //var user = response.data.user
  //console.log(user)
  //var user = await handleResponse(response)
  // if (response.data.user.token) {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     localStorage.setItem('user', JSON.stringify({
  //         token: response.data.user.token
  //     }));
  // };

  return response.data;
}

function logout() {
  // remove user from local storage to log user out
  //localStorage.removeItem('user');
  document.cookie =
    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

async function register(data) {
  let response;
  try {
    response = await usersClient.post("/auth/register-user", data);
  } catch (error) {
    throw error;
  }

  return response.data;
}

async function verifyRegistration(token) {
  let response;
  try {
    response = await usersClient.post(`/auth/verify-registration/${token}`);
  } catch (error) {
    throw error;
  }

  if (response.data.user.token) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: response.data.user.token
      })
    );
  }

  return response.data;
}

async function addToShoppingCart(data) {
  let response;
  response = await usersClient.patch(`/cart/add/${data["email"]}`, data, {
    headers: authHeader()
  });
  console.log(response.data);
  let shoppingCart = response.data.shoppingCart;

  return shoppingCart;
}

async function removeFromShoppingCart(data) {
  let response = await usersClient.patch(
    `/cart/remove/${data["email"]}`,
    data,
    {
      headers: authHeader()
    }
  );
  let shoppingCart = response.data.shoppingCart;
  return shoppingCart;
}

async function updateShoppingCart(data) {
  console.log(data.cart);
  await usersClient.patch(
    `/cart/update/${data.email}`,
    {
      shoppingCart: data.cart
    },
    {
      headers: authHeader()
    }
  );
  return;
}

async function sendResetPasswordMail(data) {
  let response;
  try {
    response = await usersClient.post(`/auth/send-password-reset-mail`, data);
  } catch (error) {
    //console.log(error.message)
    throw error;
  }

  // let checkResponse = await handleResponse(response)
  // console.log("hi2")
  // console.log(checkResponse)
  return response.data;
}

async function checkResetToken(token) {
  let response;
  try {
    response = await usersClient.get(`/auth/check-reset-token/${token}`);
  } catch (error) {
    throw error;
  }
  //console.log(response)
  return response.data;
}

async function resetPassword(data) {
  let response;
  try {
    response = await usersClient.post(`/auth/reset-password/${data.token}`, {
      password: data.password
    });
  } catch (error) {
    throw error;
  }
  //console.log(response)
  return response.data;
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

export const userService = {
  getSingleUser,
  login,
  logout,
  register,
  addToShoppingCart,
  removeFromShoppingCart,
  updateShoppingCart,
  //Reset Password:
  sendResetPasswordMail,
  checkResetToken,
  resetPassword,
  verifyRegistration
  // getAll,
  // getById,
  // update,
  // delete: _delete
};
