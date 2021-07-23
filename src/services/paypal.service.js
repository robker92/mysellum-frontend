/* eslint-disable no-useless-catch */
import { baseClient } from "./client";
import { authHeader } from "../helpers";

export const paypalService = {
  saveOnboardingData,
  fetchMerchantIds,
  createPaypalOrder,
  capturePaypalOrder,
};

async function saveOnboardingData(data, storeId) {
  try {
    await baseClient.post(`/paypal/onboarding-data/${storeId}`, data, {
      headers: authHeader(),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
  // throw new Error("This is an example error");
  return;
}

async function fetchMerchantIds(data) {
  const response = await baseClient.post(`/paypal/fetch-merchant-ids`, data, {
    headers: authHeader(),
  });
  console.log(response.data);

  // throw new Error("This is an example error");
  return response.data.merchantIds;
}

async function createPaypalOrder(data) {
  const response = await baseClient.post(`/paypal/create-order`, data, {
    headers: authHeader(),
  });
  console.log(response.data);

  // throw new Error("This is an example error");
  return response.data;
}

async function capturePaypalOrder(data) {
  let response;
  try {
    response = await baseClient.post(`/paypal/capture-order`, data, {
      headers: authHeader(),
    });
  } catch (error) {
    throw error;
  }
  console.log(response.data);

  return response.data;
}
