/* eslint-disable prettier/prettier */
import axios from "axios";

const notifBaseURL = "http://127.0.0.1:3000/notif";

const notifClient = axios.create({
  baseURL: notifBaseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 20000,
  withCredentials: true
});

async function rgstrPrdctAvNotif(data) {
  let response;
  try {
    response = await notifClient.post(
      `/register-product-availability-notification`,
      data
    );
    // response = await notifClient.post(`/rgstrPrdctAvNotif`, data);
  } catch (error) {
    throw error;
  }
  console.log(response.data);

  return response.data;
}

export const notifService = {
  rgstrPrdctAvNotif
};
