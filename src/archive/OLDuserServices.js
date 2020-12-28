/* eslint-disable prettier/prettier */
'use strict'

import axios from 'axios'

export default class MovieService {
    constructor() {}

    static registerUser = async function (data) {
        var postConfig = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            timeout: 20000
        }

        try {
            let response = await axios.post(
                'http://localhost:3000/users/registerUser',
                data,
                postConfig
            )
            //this.availabilityMessage = response.data.message
            console.log(response.status)
            console.log(response.data)
        } catch (error) {
            //this.availabilityMessage = false
            console.log(error)
        }
    }

    static loginUser = async function (data) {
        var getConfig = {
            headers: {
                //'Content-Type': 'application/json',
                //"Accept": 'application/json',
                //"withCredentials": true
                "withCredentials": true
            },

            withCredentials: true,

            timeout: 20000
        }
        // const test = axios.create({
        //     withCredentials: true,
        //     timeout: 20000
        // })

        try {
            let response = await axios.post(
                'http://127.0.0.1:3000/users/loginUser',
                data,
                getConfig
            )
            //this.availabilityMessage = response.data.message
            console.log(response.status)
            //console.log(response.data)
            this.$cookie.set('token', response.data.token);
            return response.data
        } catch (error) {
            //this.availabilityMessage = false
            console.log(error)
        }
    }
}