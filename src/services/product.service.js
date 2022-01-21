import { baseClient } from "./client";
import { authHeader, errorHandler } from "../helpers";

export const productService = {
  createProduct,
  editProduct,
  deleteProduct,
  updateStockAmount,
  // getProductImage,
};

async function createProduct(data) {
  let response;
  try {
    response = await baseClient.post(`/stores/${data.storeId}/products`, data, {
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "createProduct");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function editProduct(data) {
  let response;
  try {
    response = await baseClient.patch(
      `/stores/${data.storeId}/products/${data._id}`,
      data,
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    errorHandler(error, "editProduct");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function deleteProduct(data) {
  let response;
  try {
    response = await baseClient.delete(
      `/stores/${data.storeId}/products/${data.productId}`,
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    errorHandler(error, "deleteProduct");
    throw error;
  }
  // console.log(response.data);

  return response.data;
}

async function updateStockAmount(data) {
  const payload = { stockAmount: data.stockAmount };

  let response;
  try {
    response = await baseClient.patch(
      `/stores/${data.storeId}/products/${data._id}/stock-amount`,
      payload,
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    errorHandler(error, "updateStockAmount");
    throw error;
  }
  // console.log(response.data);

  return response.data;
}

// async function getProductImage(storeId, productId) {
//   let response;

//   try {
//     response = await baseClient.get(
//       `/stores/${storeId}/products/${productId}/images`
//     );
//   } catch (error) {
//     errorHandler(error, "getProductImage");
//     return error;
//   }

//   return response.data;
// }
