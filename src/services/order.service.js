/* eslint-disable prettier/prettier */
import axios from "axios";

import { authHeader, errorHandler } from "../helpers";

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
  let response;
  try {
    response = await ordersClient.post("/createOrder", data, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "createOrder");
    throw error;
  }
  return response.data;
}

async function getAllOrders() {
  // console.log(credentials)
  let response = await ordersClient.get("/");
  console.log(response);
  return response.data;
}

async function getStoresOrders(data) {
  //Build the url query
  let urlQuery = "";
  //  if (data.searchTerm.length > 0) {
  //    urlQuery = urlQuery + "&searchTerm=" + data.searchTerm;
  //  }
  //  if (data.countries.length > 0) {
  //    urlQuery = urlQuery + "&countries=" + JSON.stringify(data.countries);
  //  }
  //  if (data.states.length > 0) {
  //    urlQuery = urlQuery + "&states=" + JSON.stringify(data.states);
  //  }
  //  if (data.cities.length > 0) {
  //    urlQuery = urlQuery + "&cities=" + JSON.stringify(data.cities);
  //  }
  //  if (data.sort.length > 0) {
  //    urlQuery = urlQuery + "&sort=" + data.sort;
  //  }
  urlQuery = urlQuery + "&pageSize=" + data.pageSize;
  urlQuery = urlQuery + "&pageNum=" + data.pageNum;
  console.log(urlQuery);
  //  urlQuery = urlQuery + "&pickup=" + data.pickup.toString();
  //  urlQuery = urlQuery + "&delivery=" + data.delivery.toString();

  let response;
  try {
    response = await ordersClient.get(`/stores-orders?${urlQuery}`, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "getStoresOrders");
    throw error;
  }
  console.log(response);
  return response.data;
}

async function setStepStatus(data) {
  let response;
  try {
    response = await ordersClient.post(`/step-status`, data, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "setStepStatus");
    throw error;
  }
  console.log(response);
  return response.data;
}

async function searchOrderByTerm(searchTerm, storeId) {
  console.log(searchTerm);
  let searchTermString = "";
  if (searchTerm) {
    searchTermString = `?search=${searchTerm}`;
  }
  console.log(searchTermString);
  let response;
  try {
    response = await ordersClient.get(
      `/search-store-order/${storeId}${searchTermString}`,
      {
        headers: authHeader()
      }
    );
  } catch (error) {
    errorHandler(error, "searchOrderByTerm");
    throw error;
  }
  console.log(response);
  return response.data;
}

export const orderService = {
  getAllOrders,
  createOrder,
  getStoresOrders,
  setStepStatus,
  searchOrderByTerm
};
