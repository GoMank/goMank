const express = require('express')
const orderController = require('../controllers/order')
let routerPayment = express.Router()

routerPayment.post('/xendit',orderController.xendintPayment)
routerPayment.post('/midtrans',orderController.midTransPayment)

module.exports = routerPayment