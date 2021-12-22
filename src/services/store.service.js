import { baseClient } from "./client";
import { authHeader, errorHandler } from "../helpers";

export const storeService = {
  getSingleStore,
  getStoreProducts,
  getAllStores,
  getFilteredStores,
  getFilteredStores2,
  createStore,
  editStore,
  getImageBuffer,
  getImageUrl,
};

async function getSingleStore(storeId) {
  let response;
  try {
    response = await baseClient.get(`/stores/${storeId}`, {
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "getSingleStore");
    throw error;
  }

  return response.data;
}

async function getStoreProducts(data) {
  let storeId = data.storeId;
  let searchSuffix = "";
  if (data.searchTerm) {
    searchSuffix = "search=" + data.searchTerm.replace(" ", "-") + "&";
  }
  let priceSuffix = "";
  if (data.priceMax) {
    priceSuffix = "priceMin=" + data.priceMin + "&priceMax=" + data.priceMax;
  }
  // console.log(`/store-products/${storeId}?${searchSuffix}${priceSuffix}`);
  const response = await baseClient.get(
    `/stores/${storeId}/products?${searchSuffix}${priceSuffix}`,
    {
      headers: authHeader(),
    }
  );
  return response.data.products;
}

async function getAllStores() {
  let response = await baseClient.get("/stores/");

  return response.data;
}

async function getFilteredStores(searchTerm) {
  let response = await baseClient.get(`/stores/filteredStores/${searchTerm}`);

  return response.data;
}

async function getFilteredStores2(filterObject) {
  let response = await baseClient.post(
    `/stores/getFilteredStores2`,
    filterObject
  );
  // console.log(response.data);

  return response.data;
}

async function createStore(data) {
  let response;
  try {
    response = await baseClient.post(`/stores`, data, {
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "editReview");
    throw error;
  }

  return response.data;
}

async function editStore(data) {
  let response;
  try {
    response = await baseClient.patch(`/stores/${data.storeId}`, data, {
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "editStore");
    throw error;
  }

  return response.data;
}

async function getImageBuffer(file) {
  let formData = new FormData();
  formData.append("image", file);
  let response;
  try {
    response = await baseClient.post(`/stores/image-buffer-resized`, formData, {
      "Content-Type": "multipart/form-data",
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "getImageBuffer");
    throw error;
  }

  return response.data;
}

async function getImageUrl(file) {
  let formData = new FormData();
  formData.append("image", file);
  let response;
  try {
    response = await baseClient.post(`/stores/blob`, formData, {
      "Content-Type": "multipart/form-data",
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "getImageBuffer");
    throw error;
  }

  return response.data;
}
