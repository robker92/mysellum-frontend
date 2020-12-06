/* eslint-disable prettier/prettier */
//import config from './config'
import axios from 'axios'

// import {
//     authHeader
// } from '../_helpers'

const usersBaseURL = 'http://127.0.0.1:3000/users'

const usersClient = axios.create({
    baseURL: usersBaseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 20000,
    withCredentials: true
});

// var registerClient = axios.create({
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     timeout: 20000,
//     withCredentials: true,
//     baseURL: usersBaseURL
// });


async function login(credentials) {

    if (!credentials.email || !credentials.password) {
        //Abbruch
    }
    // console.log("@login function")
    // console.log(credentials)
    let response = await usersClient.post(
        '/loginUser',
        credentials
    )
    var user = response.data.user
    console.log(user)
    //var user = await handleResponse(response)
    if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify({
            token: user.token
        }));
    }

    return user
};


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
};

async function register(data) {

    let response = await usersClient.post(
        '/registerUser',
        data,
    )
    //console.log("@register function")
    var user = response.data.user
    //console.log(user)
    //var user = handleResponse(response.data.user)
    //console.log(user)
    if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user
};

async function addToShoppingCart(data) {
    var token = (JSON.parse(localStorage.getItem('user')))["token"]

    // var data = {
    //     email: email,
    //     product: product,
    //     amount: amount
    // }
    let response = await usersClient.patch(
        `/cart/${data["email"]}`,
        data, {
            headers: {
                'x-access-token': token
            }
        }
    )
    console.log(response.data)
    var shoppingCart = response.data.shoppingCart

    return shoppingCart
};

async function removeFromShoppingCart(data) {
    var token = (JSON.parse(localStorage.getItem('user')))["token"]

    let response = await usersClient.patch(
        `/cartRemove/${data["email"]}`,
        data, {
            headers: {
                'x-access-token': token
            }
        }
    )

    var shoppingCart = response.data.shoppingCart
    return shoppingCart
};

async function sendResetPasswordMail(data) {
    let response;
    try {
        response = await usersClient.post(
            `/sendPasswordResetMail`,
            data
        );
    } catch (error) {
        console.log(error.message)
        return error
    };

    // let checkResponse = await handleResponse(response)
    // console.log("hi2")
    // console.log(checkResponse)
    return response.data;
};

async function checkResetToken(token) {
    let response = await usersClient.get(
        `/checkResetToken/${token}`
    );
    //console.log(response)
    return response.data;
};

async function resetPassword(data) {
    let response = await usersClient.post(
        `/resetPassword/${data.token}`, {
            password: data.password
        }
    );
    //console.log(response)
    return response.data;
};

//REFACTOR
// eslint-disable-next-line no-unused-vars
async function handleResponse(response) {
    // return response.then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
    console.log("hi1")
    if (response instanceof Error) {
        let data = response && JSON.parse(response);
        let error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    } else {
        Promise.resolve(response);
    }

};

export const userService = {
    login,
    logout,
    register,
    addToShoppingCart,
    removeFromShoppingCart,
    //Reset Password:
    sendResetPasswordMail,
    checkResetToken,
    resetPassword
    // getAll,
    // getById,
    // update,
    // delete: _delete
};