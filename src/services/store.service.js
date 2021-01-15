/* eslint-disable prettier/prettier */
import axios from 'axios'

import {
    authHeader,
    errorHandler
} from '../helpers'

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

async function getStoresByLocation(mapBoundaries) {
    let response = await storesClient.get(
        `/getStoresByLocation/${mapBoundaries.min_lat}/${mapBoundaries.max_lat}/${mapBoundaries.min_lng}/${mapBoundaries.max_lng}`
    );
    console.log(response.data)

    return response.data;
};

async function addReview(data) {
    let response
    try {
        response = await storesClient.post(
            `/addReview/${data.storeId}`, {
                rating: data.rating,
                text: data.text
            }, {
                headers: authHeader()
            }
        );
    } catch (error) {
        errorHandler(error, "addReview");
        return Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

async function editReview(data) {
    let response
    try {
        response = await storesClient.patch(
            `/editReview/${data.storeId}/${data.reviewId}`, {
                rating: data.rating,
                text: data.text
            }, {
                headers: authHeader()
            }
        );
    } catch (error) {
        errorHandler(error, "editReview");
        return Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

async function deleteReview(data) {
    let response
    try {
        response = await storesClient.delete(
            `/deleteReview/${data.storeId}/${data.reviewId}`, {
                headers: authHeader()
            }
        );
    } catch (error) {
        errorHandler(error, "editReview");
        return Promise.reject(error)
    };
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
    let response;
    try {
        response = await storesClient.patch(
            '/editStore/' + data.storeId,
            data, {
                headers: authHeader()
            });
    } catch (error) {
        errorHandler(error, "editStore");
        return Promise.reject(error)
    };

    console.log(response.data)
    return response.data;
};

async function addStoreImage(data) {
    let response;
    try {
        response = await storesClient.post(
            '/addStoreImage/' + data.storeId,
            data, {
                headers: authHeader()
            });
    } catch (error) {
        errorHandler(error, "addStoreImage");
        return Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

async function deleteStoreImage(data) {
    let response;
    try {
        response = await storesClient.delete(
            `/deleteStoreImage/${data.storeId}/${data.imageId}`, {
                headers: authHeader()
            });
    } catch (error) {
        errorHandler(error, "deleteStoreImage");
        return Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

async function createProduct(data) {
    console.log(authHeader())
    let response;
    try {
        response = await storesClient.post(
            `/createProduct/${data.storeId}`,
            data, {
                headers: authHeader()
            });
    } catch (error) {
        errorHandler(error, "createProduct");
        return Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

async function editProduct(data) {
    let response;
    try {
        response = await storesClient.patch(
            `/editProduct/${data.storeId}/${data.productId}`,
            data, {
                headers: authHeader()
            });
    } catch (error) {
        errorHandler(error, "editProduct");
        return Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

async function deleteProduct(data) {
    let response;
    try {
        response = await storesClient.delete(
            `/deleteProduct/${data.storeId}/${data.productId}`, {
                headers: authHeader()
            });
    } catch (error) {
        errorHandler(error, "deleteProduct");
        return Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

async function updateStockAmount(data) {
    let response;
    try {
        response = await storesClient.patch(
            `/updateStockAmount/${data.storeId}/${data.productId}`,
            data, {
                headers: authHeader()
            });
    } catch (error) {
        errorHandler(error, "updateStockAmount");
        return Promise.reject(error)
    };
    console.log(response.data)

    return response.data;
};

async function getImageBuffer(file) {

    let formData = new FormData();
    formData.append("image", file);

    let response;
    try {
        response = await storesClient.post(
            `/getImageBuffer`, formData, {
                "Content-Type": "multipart/form-data",
                headers: authHeader()
            });
    } catch (error) {
        errorHandler(error, "getImageBuffer");
        return Promise.reject(error)
    };
    //console.log(response.data)

    return response.data;
};

async function getProductImage(storeId, productId) {
    let response;
    try {
        response = await storesClient.get(
            `/get-product-image/${storeId}/${productId}`);
    } catch (error) {
        errorHandler(error, "getProductImage");
        return Promise.reject(error)
    };
    //console.log(response.data)

    return response.data;
};

export const storeService = {
    getSingleStore,
    getAllStores,
    getFilteredStores,
    getFilteredStores2,
    getStoresByLocation,
    addReview,
    createStore,
    editStore,
    createProduct,
    editProduct,
    editReview,
    deleteReview,
    addStoreImage,
    deleteStoreImage,
    deleteProduct,
    updateStockAmount,
    getImageBuffer,
    getProductImage
};