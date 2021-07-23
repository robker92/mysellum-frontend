import { baseClient } from "./client";

export { sendCustomerContactMessgae };

async function sendCustomerContactMessgae(
  email,
  subject,
  phoneNr,
  topic,
  message
) {
  let response;

  try {
    response = await baseClient.post(`/contacts`, {
      email,
      subject,
      phoneNr,
      topic,
      message,
    });
  } catch (e) {
    console.log(e.response);
    throw e;
  }
  console.log(response.data);

  return response.data;
}
