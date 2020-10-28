/* eslint-disable prettier/prettier */
import axios from 'axios'

const storesBaseURL = 'http://127.0.0.1:3000/stores'

const storesClient = axios.create({
    baseURL: storesBaseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 20000,
    withCredentials: true
});

async function getSingleStore(storeId) {
    let response = await storesClient.get(
        `/${storeId}`
    );
    console.log(response.data)

    return response.data;
}

async function getAllStores() {

    let response = await storesClient.get(
        '/'
    );
    console.log(response.data)

    return response.data;
};

async function getFilteredStores(searchTerm) {

    let response = await storesClient.get(
        `/filteredStores/${searchTerm}`
    );
    console.log(response.data)

    return response.data;
};

async function getFilteredStores2(filterObject) {

    let response = await storesClient.post(
        `/getFilteredStores2`,
        filterObject
    );
    console.log(response.data)

    return response.data;
};

async function addReview(data) {

    let response = await storesClient.post(
        '/addReview',
        data
    );
    console.log(response.data)

    return response.data;
};

async function editReview(data) {

    let response = await storesClient.post(
        '/editReview',
        data
    );
    console.log(response.data)

    return response.data;
};

async function deleteReview(data) {

    let response = await storesClient.delete(
        `/deleteReview/${data.storeId}/${data.reviewId}`,
        data
    );
    console.log(response.data)

    return response.data;
};

async function createStore(data) {

    let response = await storesClient.post(
        '/createStore',
        data
    );
    console.log(response.data)
    return response.data;
};

async function editStore(data) {

    let response = await storesClient.post(
        '/editStore/' + data.storeId,
        data
    );
    console.log(response.data)
    return response.data;
};

async function addStoreImage(data) {
    let response = await storesClient.post(
        '/addStoreImage/' + data.storeId,
        data
    );
    console.log(response.data)

    return response.data;
};

async function deleteStoreImage(data) {
    let response = await storesClient.post(
        `/deleteStoreImage/${data.storeId}/${data.imageId}`,
        data
    );
    console.log(response.data)

    return response.data;
};

async function addProduct(data) {
    console.log("@ service")
    let response = await storesClient.post(
        '/addProduct',
        data
    );
    console.log(response.data)

    return response.data;
};

async function editProduct(data) {
    console.log("@ service")
    let response = await storesClient.post(
        `/editProduct/${data.storeId}/${data.productId}`,
        data
    );
    console.log(response.data)

    return response.data;
};

async function deleteProduct(data) {
    console.log("@ service")
    let response = await storesClient.delete(
        `/deleteProduct/${data.storeId}/${data.productId}`,
        data
    );
    console.log(response.data)

    return response.data;
};

export const storeService = {
    getSingleStore,
    getAllStores,
    getFilteredStores,
    getFilteredStores2,
    addReview,
    createStore,
    editStore,
    addProduct,
    editProduct,
    editReview,
    deleteReview,
    addStoreImage,
    deleteStoreImage,
    deleteProduct
};