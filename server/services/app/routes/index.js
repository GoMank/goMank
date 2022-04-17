const express = require('express')
const routerOrder = require('./order.js')
const routerLogs = require('./logs.js')
const orderController = require('../controllers/order.js')
const router = express.Router()

router.use('/orders', routerOrder)
router.use('/logs', routerLogs)

router.post("/xenditPay",orderController.xendintPayment)

router.get('/', (req, res) => {
    res.send('ini home')
})

module.exports = router