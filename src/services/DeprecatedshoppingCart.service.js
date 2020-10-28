/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
//import config from './config'
import axios from 'axios'

const usersBaseURL = 'http://127.0.0.1:3000/cart'

const cartClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 20000,
    withCredentials: true,
    baseURL: usersBaseURL
});

async function addToCart(userId, product, amount) {
    var data = {
        userId: userId,
        product: product,
        amount: amount
    }
    let response = await cartClient.post(
        '/loginUser',
        data
    )
};

async function removeFromCart(userId, product, amount) {
    var data = {
        userId: userId,
        product: product,
        amount: amount
    }
    let response = await cartClient.post(
        '/loginUser',
        data
    )
};

export const userService = {
    addToCart
};