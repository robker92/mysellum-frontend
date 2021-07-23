import { baseClient } from "./client";
import { authHeader, errorHandler } from "../helpers";

export const searchService = {
  filterSortSearch,
  getStoresByLocation,
};

async function filterSortSearch(data) {
  const urlQuery = buildUrlQuery(data);

  let response;
  try {
    response = await baseClient.get(`/search/search-delivery?${urlQuery}`);
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
    response = await baseClient.post(
      `/search/getStoresByLocation/${mapBoundaries.min_lat}/${mapBoundaries.max_lat}/${mapBoundaries.min_lng}/${mapBoundaries.max_lng}?${urlQuery}`,
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
