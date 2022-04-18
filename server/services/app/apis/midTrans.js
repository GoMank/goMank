const axios = require ('axios')
const API_KEY = process.env.MIDTRANS_API
const instance = axios.create({
    baseURL: `https://app.sandbox.midtrans.com/snap`,
    headers: {
        'Authorization': API_KEY
    }
})

 

 
module.exports = instance