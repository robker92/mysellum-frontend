import { baseClient } from "./client";
import { authHeader, errorHandler } from "../helpers";

export const reviewService = { addReview, editReview, deleteReview };

async function addReview(data) {
  let response;
  try {
    const url = `/stores/${data.storeId}/reviews`;
    response = await baseClient.post(
      url,
      {
        rating: data.rating,
        text: data.text,
      },
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    errorHandler(error, "addReview");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function editReview(data) {
  let response;
  try {
    const url = `/stores/${data.storeId}/reviews/${data.reviewId}`;
    response = await baseClient.patch(
      url,
      {
        rating: data.rating,
        text: data.text,
      },
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    errorHandler(error, "editReview");
    throw error;
  }
  console.log(response.data);

  return response.data;
}

async function deleteReview(data) {
  let response;
  try {
    const url = `/stores/${data.storeId}/reviews/${data.reviewId}`;
    response = await baseClient.delete(url, {
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "deleteReview");
    throw error;
  }
  console.log(response.data);

  return response.data;
}
