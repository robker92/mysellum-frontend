/* eslint-disable no-useless-catch */
import { baseClient } from "./client";

export const notifService = {
  rgstrPrdctAvNotif,
};

async function rgstrPrdctAvNotif(data) {
  let response;

  try {
    response = await baseClient.post(
      `/notif/register-product-availability-notification`,
      data
    );
  } catch (error) {
    throw error;
  }
  console.log(response.data);

  return response.data;
}
