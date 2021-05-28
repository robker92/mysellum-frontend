/* eslint-disable prettier/prettier */
import axios from "axios";

import { authHeader, errorHandler } from "../helpers";

export const searchService = {
  filterSortSearch,
  getStoresByLocation,
  searchTest
};

const searchBaseURL = "http://127.0.0.1:3000/search";
const searchClient = axios.create({
  baseURL: searchBaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 20000,
  withCredentials: true
});

async function searchTest(data) {
  const urlQuery = buildUrlQuery(data);
  const testData = {
    test: 1
  };
  let response;
  try {
    response = await (
      await fetch(`/api/searchDelivery?${urlQuery}`, {
        method: "POST",
        body: JSON.stringify(testData)
      })
    ).json();

    console.log(response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
}

async function filterSortSearch(data) {
  const urlQuery = buildUrlQuery(data);

  let response;
  try {
    response = await searchClient.get(`/search-delivery?${urlQuery}`);
  } catch (error) {
    errorHandler(error, "filterSortSearch");
    return error;
  }
  console.log(response.data);

  return response.data;
}

async function getStoresByLocation(mapBoundaries, data) {
  const urlQuery = buildUrlQuery(data);

  let response;
  try {
    response = await searchClient.post(
      `/getStoresByLocation/${mapBoundaries.min_lat}/${mapBoundaries.max_lat}/${mapBoundaries.min_lng}/${mapBoundaries.max_lng}?${urlQuery}`,
      data
    );
  } catch (error) {
    // errorHandler(error, "filterSortSearch");
    return error;
  }
  console.log(response.data);

  return response.data;
}

function buildUrlQuery(data) {
  //Build the url query
  let urlQuery = "";
  if (data.searchTerm) {
    urlQuery = urlQuery + "&searchTerm=" + data.searchTerm;
  }
  if (data.countries && data.countries.length) {
    urlQuery = urlQuery + "&countries=" + JSON.stringify(data.countries);
  }
  if (data.states && data.states.length) {
    urlQuery = urlQuery + "&states=" + JSON.stringify(data.states);
  }
  if (data.cities && data.cities.length) {
    urlQuery = urlQuery + "&cities=" + JSON.stringify(data.cities);
  }
  if (data.sort) {
    urlQuery = urlQuery + "&sort=" + data.sort;
  }
  if (data.pageSize) {
    urlQuery = urlQuery + "&pageSize=" + data.pageSize;
  }
  if (data.pageNum) {
    urlQuery = urlQuery + "&pageNum=" + data.pageNum;
  }
  if (data.pickup) {
    urlQuery = urlQuery + "&pickup=" + data.pickup.toString();
  }
  if (data.delivery) {
    urlQuery = urlQuery + "&delivery=" + data.delivery.toString();
  }

  return urlQuery;
}
