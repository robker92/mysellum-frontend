/* eslint-disable prettier/prettier */
import axios from "axios";

import { authHeader, errorHandler } from "../helpers";

const storesBaseURL = "http://127.0.0.1:3000/stores";

const storesClient = axios.create({
  baseURL: storesBaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 20000,
  withCredentials: true
});

async function getSingleStore(storeId) {
  let response;
  try {
    // response = await storesClient.get(`/single-store/${storeId}`);
    const url = `/${storeId}`;
    response = await storesClient.get(url);
  } catch (error) {
    errorHandler(error, "getSingleStore");
    throw error;
  }
  console.log(response.data);

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
  console.log(`/store-products/${storeId}?${searchSuffix}${priceSuffix}`);
  const url = `/${storeId}/products?${searchSuffix}${priceSuffix}`;
  const response = await storesClient.get(url);
  return response.data.products;
}

async function getAllStores() {
  let response = await storesClient.get("/");
  console.log(response.data);

  return response.data;
}

async function getFilteredStores(searchTerm) {
  let response = await storesClient.get(`/filteredStores/${searchTerm}`);
  console.log(response.data);

  return response.data;
}

async function getFilteredStores2(filterObject) {
  console.log("at service");
  console.log(filterObject);
  let response = await storesClient.post(`/getFilteredStores2`, filterObject);
  console.log(response.data);

  return response.data;
}

// async function filterSortSearch(data) {
//   //Build the url query
//   let urlQuery = "";
//   if (data.searchTerm.length > 0) {
//     urlQuery = urlQuery + "&searchTerm=" + data.searchTerm;
//   }
//   if (data.countries.length > 0) {
//     urlQuery = urlQuery + "&countries=" + JSON.stringify(data.countries);
//   }
//   if (data.states.length > 0) {
//     urlQuery = urlQuery + "&states=" + JSON.stringify(data.states);
//   }
//   if (data.cities.length > 0) {
//     urlQuery = urlQuery + "&cities=" + JSON.stringify(data.cities);
//   }
//   if (data.sort.length > 0) {
//     urlQuery = urlQuery + "&sort=" + data.sort;
//   }
//   urlQuery = urlQuery + "&pageSize=" + data.pageSize;
//   urlQuery = urlQuery + "&pageNum=" + data.pageNum;
//   urlQuery = urlQuery + "&pickup=" + data.pickup.toString();
//   urlQuery = urlQuery + "&delivery=" + data.delivery.toString();

//   let response;
//   try {
//     response = await storesClient.get(`/search-delivery?${urlQuery}`);
//   } catch (error) {
//     errorHandler(error, "filterSortSearch");
//     return error;
//   }
//   console.log(response.data);

//   return response.data;
// }

// async function getStoresByLocation(mapBoundaries, filterObject) {
//   console.log(filterObject);
//   let response = await storesClient.post(
//     `/getStoresByLocation/${mapBoundaries.min_lat}/${mapBoundaries.max_lat}/${mapBoundaries.min_lng}/${mapBoundaries.max_lng}`,
//     filterObject
//   );
//   console.log(response.data);

//   return response.data;
// }

// async function addReview(data) {
//   let response;
//   try {
//     const url = `/${data.storeId}/reviews`;
//     response = await storesClient.post(url, data, {
//       headers: authHeader()
//     });
//   } catch (error) {
//     errorHandler(error, "addReview");
//     throw error;
//   }
//   console.log(response.data);

//   return response.data;
// }

// async function editReview(data) {
//   let response;
//   try {
//     const url = `/${data.storeId}/reviews/${data.reviewId}`;
//     response = await storesClient.patch(url, data, {
//       headers: authHeader()
//     });
//   } catch (error) {
//     errorHandler(error, "editReview");
//     throw error;
//   }
//   console.log(response.data);

//   return response.data;
// }

// async function deleteReview(data) {
//   let response;
//   try {
//     const url = `/${data.storeId}/reviews/${data.reviewId}`;
//     response = await storesClient.delete(url, {
//       headers: authHeader()
//     });
//   } catch (error) {
//     errorHandler(error, "editReview");
//     throw error;
//   }
//   console.log(response.data);

//   return response.data;
// }

async function createStore(data) {
  let response;
  try {
    const url = ``;
    response = await storesClient.post(url, data, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "editReview");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function editStore(data) {
  let response;
  try {
    const url = `/${data.storeId}`;
    response = await storesClient.patch(url, data, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "editStore");
    throw error;
  }

  console.log(response.data);
  return response.data;
}

// async function addStoreImage(data) {
//   let response;
//   try {
//     response = await storesClient.post("/addStoreImage/" + data.storeId, data, {
//       headers: authHeader()
//     });
//   } catch (error) {
//     errorHandler(error, "addStoreImage");
//     return error;
//   }
//   console.log(response.data);

//   return response.data;
// }

// async function deleteStoreImage(data) {
//     let response;
//     try {
//         response = await storesClient.delete(
//             `/deleteStoreImage/${data.storeId}/${data.imageId}`, {
//                 headers: authHeader()
//             });
//     } catch (error) {
//         errorHandler(error, "deleteStoreImage");
//         return Promise.reject(error)
//     };
//     console.log(response.data)

//     return response.data;
// };

async function createProduct(data) {
  console.log(authHeader());
  let response;
  try {
    const url = `/${data.storeId}/products`;
    response = await storesClient.post(url, data, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "createProduct");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function editProduct(data) {
  console.log(data._id);
  let response;
  try {
    const url = `/${data.storeId}/products/${data._id}`;
    response = await storesClient.patch(url, data, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "editProduct");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function deleteProduct(data) {
  console.log(data);
  let response;
  try {
    const url = `/${data.storeId}/products/${data.productId}`;
    response = await storesClient.delete(url, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "deleteProduct");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function updateStockAmount(data) {
  let response;
  try {
    const url = `/${data.storeId}/products/${data._id}/stock-amount`;
    response = await storesClient.patch(url, data, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "updateStockAmount");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function getImageBuffer(file) {
  let formData = new FormData();
  formData.append("image", file);

  let response;
  try {
    response = await storesClient.post(`/image-buffer-resized`, formData, {
      "Content-Type": "multipart/form-data",
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "getImageBuffer");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function getProductImage(storeId, productId) {
  let response;
  try {
    const url = `/${storeId}/products/${productId}/images`;
    response = await storesClient.get(url);
  } catch (error) {
    errorHandler(error, "getProductImage");
    return error;
  }
  //console.log(response.data)

  return response.data;
}

export const storeService = {
  getSingleStore,
  getStoreProducts,
  getAllStores,
  getFilteredStores,
  getFilteredStores2,
  // getStoresByLocation,
  // filterSortSearch,
  // addReview,
  createStore,
  editStore,
  createProduct,
  editProduct,
  // editReview,
  // deleteReview,
  // addStoreImage,
  //deleteStoreImage,
  deleteProduct,
  updateStockAmount,
  getImageBuffer,
  getProductImage
};
