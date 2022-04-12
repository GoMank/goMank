const express = require('express')
const orderController = require('../controllers/order.js')
let routerOrder = express.Router()

routerOrder.get('/', orderController.getAllOrders)
routerOrder.post('/', orderController.addOrder)
routerOrder.patch('/edit/done/:id', orderController.updateStatusOrderDone)
routerOrder.patch('/edit/cancel/:id', orderController.updateStatusOrderCancel)
routerOrder.delete('/delete/:id', orderController.deleteOrder)

module.exports = routerOrder