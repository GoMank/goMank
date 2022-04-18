const midTrans = require('../apis/midTrans')
const { Order, Log } = require('../models')
const { sequelize, Sequelize: { op } } = require('../models')
// const logsController = require('./logs')
const logSwitch = require('../helpers/logSwitch')

class orderController {

    static async getAllOrders(req, res, next) {
        const option = {
            include: Log
        }
        try {
            let orders = await Order.findAll(option)
            res.status(200).json(orders)
        } catch (err) {
            // res.status(500).json({
            //     message: err.errors
            // })
            next(err)
        }

    }

    static async getOrderById(req, res, next) {
        const { id } = req.params
        try {
            let order = await Order.findByPk(id)
            if (!order) {
                throw ({
                    type: 'known',
                    code: 404,
                    message: 'no order found'
                })
            }
            res.status(200).json(order)
        } catch (err) {
            // res.status(500).json({
            //     message: err.errors
            // })
            next(err)
        }

    }

    static async addOrder(req, res, next) {
        // const t = await sequelize.transaction();
        try {
            let order = await Order.create(req.body)
            console.log(order);
            const data = {
                orderId: order.id,
                type: 'Created',
                description: logSwitch(order.id, 'Created')
            }
            await Log.create(data)
            res.status(201).json(order)
        } catch (err) {
            // console.log(err);
            // res.status(500).json({
            //     message: err.errors
            // })
            next(err)
        }

    }

    static async updateStatusOrderDone(req, res, next) {
        const { id } = req.params
        const orderStatus = "Done"
        const paymentStatus = "Paid"
        // const t = await sequelize.transaction();
        try {
            const found = await Order.findByPk(id)
            if (!found) {
                throw ({
                    type: 'known',
                    code: 404,
                    message: 'no order found'
                })
            }
            const updated = await Order.update({ orderStatus: orderStatus, paymentStatus }, {
                where: {
                    id: id,
                    // transaction: t
                }
            })
            const data = {
                orderId: id,
                type: 'Done',
                description: logSwitch(id, 'Done')
            }
            await Log.create(data)
            res.status(200).json({ message: 'Order status has been updated to Done' })
        } catch (err) {
            // res.status(500).json({
            //     message: err.errors
            // })
            // console.log(err);
            next(err)
        }

    }

    static async updateStatusOrderCancel(req, res, next) {
        const { id } = req.params
        const orderStatus = "Cancelled"

        try {
            const found = await Order.findByPk(id)
            if (!found) {
                throw ({
                    type: 'known',
                    code: 404,
                    message: 'no order found'
                })
            }
            const updated = await Order.update({ orderStatus: orderStatus }, {
                where: {
                    id: id,
                    // transaction: t
                }
            })
            const data = {
                orderId: id,
                type: 'Cancelled',
                description: logSwitch(id, 'Cancelled')
            }
            await Log.create(data)
            res.status(200).json({ message: 'Order status has been updated to Cancel and deleted' })
        } catch (err) {
            // console.log(error);
            // res.status(500).json({
            //     message: err.errors
            // })
            next(err)
        }

    }

    static async deleteOrder(req, res, next) {
        const { id } = req.params

        try {
            let deleted = await Order.destroy({ where: { id: id } })
            if (deleted === 0) {
                throw ({
                    type: 'known',
                    code: 404,
                    message: 'no order found'
                })
            }
            res.status(200).json({ message: 'Order status has been deleted' })
        } catch (err) {
            // res.status(500).json({
            //     message: err.errors
            // })
            next(err)
        }

    }
   static async  midTransPayment(req, res, next) {
        try {
            
           const timestamp = Date.now()
           const noInvoice = Math.floor(Math.random(999) * 999)
            const body = {
                "transaction_details": {
                  "order_id": `invoice-${timestamp}`,
                  "gross_amount":50000
                },
                "credit_card": {
                  "secure": true
                },
                "item_details": [{
                  "id": `invoice-${timestamp}`,
                  "price": 50000,
                  "quantity": 1,
                  "name": `invoice # ${noInvoice}`
                }],
                "customer_details": {
                  "first_name": `Customer`,
                  "last_name": `Name`,
                  "email": `anemone@mail.com`,
                  "phone": ""
                  
                }
              }
          
          
          const {data} = await midTrans.post(`/v1/transactions`, body)
          console.log(data, "INI MIDTRANS TRANSACTION TOKEN")
          res.status(200).json(data.redirect_url)
        } catch (err) {
          console.log(err)
          next(err)
        }
      }

}

module.exports = orderController