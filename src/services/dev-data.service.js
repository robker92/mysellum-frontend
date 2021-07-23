import axios from "axios";

import storeData from "./dev-data";

import { getCookie } from "../helpers/auth-header";

// const storesBaseURL = 'http://127.0.0.1:3000/stores'

// const storesClient = axios.create({
//     baseURL: storesBaseURL,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     timeout: 20000,
//     withCredentials: true
// });

async function createDevDataService() {
  const reviewText =
    "Fazit: mein Geschmack ist es nicht, aber jeder Mensch hat einen anderen Geschmackssinn, deshalb kann man meine geschmackliche Bewetung nicht für andere kauf Interesenten verwenden :) Ansonsten entspricht alles was in der Beschreibung steht zum Produkt.";

  //DELETE ALL DATA
  console.log("deletion:");
  await axios.get("http://localhost:3000/stores/delete-all-data");

  //USERS
  console.log("registration:");
  for (let i = 0; i < storeData.users.length; i++) {
    await axios.post(
      "http://localhost:3000/users/registerUser",
      storeData.users[i]
    );
  }
  //verify them
  let users = [];
  for (let i = 0; i < storeData.users.length; i++) {
    let response = await axios.get(
      `http://localhost:3000/users/${storeData.users[i].email}`
    );
    users.push(response.data);
  }

  console.log("verification:");
  for (let i = 0; i < users.length; i++) {
    console.log(users[i]);
    await axios.post(
      `http://localhost:3000/users/verifyRegistration/${users[i].verifyRegistrationToken}`
    );
  }

  //STORES
  let jwtTokenArray = [];
  console.log("login:");
  for (let i = 0; i < users.length; i++) {
    let payload = {
      email: users[i].email,
      password: "TestPassword1!",
    };
    let result = await axios.post(
      `http://localhost:3000/users/loginUser`,
      payload,
      {
        withCredentials: true,
      }
    );
    console.log(result);
    let authToken = getCookie("authToken");
    jwtTokenArray.push(authToken); // -> nor working, always the same jwt token
    // document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  console.log(jwtTokenArray);
  console.log("store creation:");
  let storeIdArray = [];
  for (let i = 0; i < storeData.stores.length; i++) {
    console.log(i);
    //console.log(jwtTokenArray[i]);
    //console.log(storeData.stores[i])
    let response = await axios.post(
      "http://localhost:3000/stores/store",
      storeData.stores[i],
      {
        headers: { "x-access-token": jwtTokenArray[i] },
      }
    );
    const storeId = response.data.queryResult.insertedId;
    storeIdArray.push(storeId);

    if (i === 0) {
      console.log("products:");
      console.log(storeId);
      for (let j = 0; j < storeData.products[i].length; j++) {
        console.log(storeData.products[i][j]);
        let result = await axios.post(
          `http://localhost:3000/stores/product/${storeId}`,
          storeData.products[i][j],
          {
            headers: { "x-access-token": jwtTokenArray[i] },
          }
        );
        console.log(result);
      }
    }
  }

  console.log("review creation: ");
  for (let i = 0; i < storeIdArray.length; i++) {
    await axios.post(
      `http://localhost:3000/stores/addReview/${storeIdArray[i]}`,
      {
        rating: "3",
        text: reviewText,
      },
      {
        headers: { "x-access-token": jwtTokenArray[4] },
      }
    );
  }
}

export { createDevDataService };
