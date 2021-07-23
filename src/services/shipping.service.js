import { baseClient } from "./client";
import { authHeader, errorHandler } from "../helpers";

export const shippingService = { getShippingCosts };

async function getShippingCosts(data) {
  let response;
  try {
    const url = `/shipping/get-costs`;
    response = await baseClient.post(url, data, {
      headers: authHeader(),
    });
  } catch (error) {
    errorHandler(error, "getShippingCosts");
    throw error;
  }
  console.log(response.data);

  return response.data;
}
