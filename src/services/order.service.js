/* eslint-disable prettier/prettier */
import axios from "axios";

import {
    authHeader,
    errorHandler
} from '../helpers'

const ordersBaseURL = "http://127.0.0.1:3000/orders";

const ordersClient = axios.create({
    baseURL: ordersBaseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 20000,
    withCredentials: true
});

async function createOrder(data) {
    let response
    try {
        response = await ordersClient.post("/createOrder", data, {
            headers: authHeader()
        });
    } catch (error) {
        errorHandler(error, "createOrder");
        return Promise.reject(error)
    };
    return response.data;
}

async function getAllOrders() {
    // console.log(credentials)
    let response = await ordersClient.get("/");
    console.log(response);
    return response.data;
}

export const orderService = {
    getAllOrders,
    createOrder
};