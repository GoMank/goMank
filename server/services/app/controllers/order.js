const { Order, Log } = require('../models')
const { sequelize, Sequelize: { op } } = require('../models')
// const logsController = require('./logs')
const logSwitch = require('../helpers/logSwitch')
const axios = require('axios')
const typeSwitch = require('../helpers/typeSwitch')

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
        try {
            if (!req.body.service) {
                throw ({
                    type: 'known',
                    code: 400,
                    message: 'must sent service'
                })
            }
            let x = +req.body.service
            // console.log(x);
            if (x !== 1 && x !== 2 && x !== 3 && x !== 4 && x !== 5 && x !== 6) {
                throw ({
                    type: 'known',
                    code: 400,
                    message: 'service must between 1 and 6'
                })
            }
            // const { mamangId, clientId, address, paymentMethod, date, time, service } = req.body
            const { servicePrice, serviceName } = typeSwitch(+x)
            let order = await Order.create({
                mamangId: req.body.mamangId,
                clientId: req.body.clientId,
                address: req.body.address,
                paymentMethod: req.body.paymentMethod,
                date: req.body.date,
                time: req.body.time,
                service: serviceName,
                price: servicePrice
            })
            const data = {
                orderId: order.id,
                type: 'Created',
                description: logSwitch(order.id, 'Created')
            }
            await Log.create(data)
            res.status(201).json(order)
        } catch (err) {
            console.log(err);
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

    static async midTransPayment(req, res, next) {
        try {
            if (!req.body.price) {
                throw ({
                    type: 'known',
                    code: 400,
                    message: 'please send your price'
                })
            }
            const timestamp = Date.now()
            const noInvoice = Math.floor(Math.random(999) * 999)
            const body = {
                "transaction_details": {
                    "order_id": `invoice-${timestamp}`,
                    "gross_amount": req.body.price
                },
                "credit_card": {
                    "secure": true
                },
                "item_details": [{
                    "id": `invoice-${timestamp}`,
                    "price": req.body.price,
                    "quantity": 1,
                    "name": `invoice # ${noInvoice}`
                }],
                // "customer_details": {
                //     "first_name": `Customer`,
                //     "last_name": `Name`,
                //     "email": `anemone@mail.com`,
                //     "phone": ""

                // }
            }
            const { data } = await axios.post(`https://app.sandbox.midtrans.com/snap/v1/transactions`, body, {
                headers: {
                    'Authorization': process.env.MIDTRANS
                }
            })
            // console.log(data, "INI MIDTRANS TRANSACTION TOKEN")
            res.status(200).json(data.redirect_url)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async xendintPayment(req, res, next) {
        try {
            console.log(req.body);
            if (!req.body.email || !req.body.price) {
                throw ({
                    type: 'known',
                    code: 400,
                    message: 'please send your email and price'
                })
            }
            const timestamp = Date.now()
            const noInvoice = Math.floor(Math.random(999) * 999)
            const data = {
                external_id: `invoice-${timestamp}`,
                amount: req.body.price,
                payer_email: req.body.email,
                description: "Invoice #" + noInvoice
            };
            let response = await axios.post("https://api.xendit.co/v2/invoices", data, {
                headers: {
                    'Authorization': process.env.XENDITKEY,
                }
            })
            let responseUrl = response.data.invoice_url;
            res.status(200).json(responseUrl);
        } catch (err) {
            // console.log(err, "logo");
            next(err);
        }
    }

}

module.exports = orderController