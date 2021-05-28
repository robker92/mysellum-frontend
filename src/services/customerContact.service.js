/* eslint-disable prettier/prettier */
import axios from "axios";

const baseURL = "http://127.0.0.1:3000";

const customerContactClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 20000,
  withCredentials: true
});

async function sendCustomerContactMessgae(
  email,
  subject,
  phoneNr,
  topic,
  message
) {
  let response;
  try {
    response = await customerContactClient.post(`/contacts`, {
      email,
      subject,
      phoneNr,
      topic,
      message
    });
    // response = await notifClient.post(`/rgstrPrdctAvNotif`, data);
  } catch (e) {
    console.log(e.response);
    throw e;
  }
  console.log(response.data);

  return response.data;
}

export { sendCustomerContactMessgae };
