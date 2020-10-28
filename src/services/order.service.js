/* eslint-disable prettier/prettier */
import axios from "axios";

const ordersBaseURL = "http://127.0.0.1:3000/orders";

const ordersClient = axios.create({
    baseURL: ordersBaseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    timeout: 20000,
    withCredentials: true
});

async function createOrder(data) {
    // console.log(credentials)
    let response = await ordersClient.post("/createOrder", data);
    console.log(response);
    return response;
}

export const orderService = {
    createOrder
};