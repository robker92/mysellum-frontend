/* eslint-disable prettier/prettier */
import axios from 'axios'

// import {
//     authHeader,
//     errorHandler
// } from '../helpers'

const notifBaseURL = 'http://127.0.0.1:3000/notif'

const notifClient = axios.create({
    baseURL: notifBaseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 20000,
    withCredentials: true
});

async function rgstrPrdctAvNotif(data) {
    let response;
    try {
        response = await notifClient.post(
            `/rgstrPrdctAvNotif`, data
        );
    } catch (error) {
        Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

export const notifService = {
    rgstrPrdctAvNotif
};