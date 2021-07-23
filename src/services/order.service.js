import { baseClient } from "./client";
import { authHeader, errorHandler } from "../helpers";

export const orderService = {
  getAllOrders,
  createOrder,
  getStoresOrders,
  setStepStatus,
  searchOrderByTerm,
};

async function createOrder(data) {
  let response;
  try {
    response = await baseClient.post("/orders/createOrder", data, {
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "createOrder");
    throw error;
  }
  return response.data;
}

async function getAllOrders() {
  // console.log(credentials)
  let response = await baseClient.get("/orders/");
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
    response = await baseClient.get(`/orders/stores-orders?${urlQuery}`, {
      headers: authHeader(),
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
    response = await baseClient.post(`/orders/step-status`, data, {
      headers: authHeader(),
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
    response = await baseClient.get(
      `/orders/search-store-order/${storeId}${searchTermString}`,
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    errorHandler(error, "searchOrderByTerm");
    throw error;
  }
  console.log(response);
  return response.data;
}
