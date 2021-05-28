/* eslint-disable prettier/prettier */
import axios from "axios";
import { authHeader, errorHandler } from "../helpers";

export const reviewService = { addReview, editReview, deleteReview };

const reviewBaseURL = "http://127.0.0.1:3000/stores";

const reviewClient = axios.create({
  baseURL: reviewBaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 20000,
  withCredentials: true
});

async function addReview(data) {
  let response;
  try {
    const url = `/${data.storeId}/reviews`;
    response = await reviewClient.post(
      url,
      {
        rating: data.rating,
        text: data.text
      },
      {
        headers: authHeader()
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
    const url = `/${data.storeId}/reviews/${data.reviewId}`;
    response = await reviewClient.patch(
      url,
      {
        rating: data.rating,
        text: data.text
      },
      {
        headers: authHeader()
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
    const url = `/${data.storeId}/reviews/${data.reviewId}`;
    response = await reviewClient.delete(url, {
      headers: authHeader()
    });
  } catch (error) {
    errorHandler(error, "deleteReview");
    throw error;
  }
  console.log(response.data);

  return response.data;
}
