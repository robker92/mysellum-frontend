import axios from "axios";

import { authHeader } from "../helpers";

const paypalBaseUrl = "http://127.0.0.1:3000/paypal";

const paypalClient = axios.create({
  baseURL: paypalBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 20000,
  withCredentials: true
});

async function createPaypalOrder(data) {
  const response = await paypalClient.post(`/create-order`, data, {
    headers: authHeader()
  });
  console.log(response.data);

  // throw new Error("This is an example error");
  return response.data;
}

async function capturePaypalOrder(data) {
  let response;
  try {
    response = await paypalClient.post(`/capture-order`, data, {
      headers: authHeader()
    });
  } catch (error) {
    throw error;
  }
  console.log(response.data);

  return response.data;
}

export const paypalService = { createPaypalOrder, capturePaypalOrder };
