const { Order, Log } = require('../models')
<<<<<<< HEAD
const {sequelize, Sequelize: {op}} = require('../models')
const logsController = require('./logs')
=======
const { sequelize, Sequelize: { op } } = require('../models')
// const logsController = require('./logs')
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
const logSwitch = require('../helpers/logSwitch')

class orderController {

<<<<<<< HEAD
    static async getAllOrders(req, res) {
=======
    static async getAllOrders(req, res, next) {
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        const option = {
            include: Log
        }
        try {
            let orders = await Order.findAll(option)
            res.status(200).json(orders)
        } catch (err) {
<<<<<<< HEAD
            res.status(500).json({
                message: err.errors
            })
=======
            // res.status(500).json({
            //     message: err.errors
            // })
            next(err)
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        }

    }

<<<<<<< HEAD
    static async getOrderById(req, res) {
        const {id} = req.params
        try {
            let order = await Order.findByPk(id)
            res.status(200).json(order)
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
=======
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
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        }

    }

<<<<<<< HEAD
    static async addOrder(req, res) {
        
        try {
            let order = await Order.create(req.body)
=======
    static async addOrder(req, res, next) {
        // const t = await sequelize.transaction();
        try {
            let order = await Order.create(req.body)
            console.log(order);
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
            const data = {
                orderId: order.id,
                type: 'Created',
                description: logSwitch(order.id, 'Created')
            }
<<<<<<< HEAD
            await logsController.createLog(data)
            res.status(201).json(order)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.errors
            })
=======
            await Log.create(data)
            res.status(201).json(order)
        } catch (err) {
            // console.log(err);
            // res.status(500).json({
            //     message: err.errors
            // })
            next(err)
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        }

    }

<<<<<<< HEAD
    static async updateStatusOrderDone(req, res) {
        const {id} = req.params
        const orderStatus = "Done"
        const paymentStatus = "Paid"
        
        try {
            const update = await Order.update({orderStatus: orderStatus, paymentStatus}, {where: {id: id}})
=======
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
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
            const data = {
                orderId: id,
                type: 'Done',
                description: logSwitch(id, 'Done')
            }
<<<<<<< HEAD
            await logsController.createLog(data)
            res.status(200).json({message: 'Order status has been updated to Done'})
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
=======
            await Log.create(data)
            res.status(200).json({ message: 'Order status has been updated to Done' })
        } catch (err) {
            // res.status(500).json({
            //     message: err.errors
            // })
            // console.log(err);
            next(err)
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        }

    }

<<<<<<< HEAD
    static async updateStatusOrderCancel(req, res) {
        const {id} = req.params
        const orderStatus = "Cancelled"
        
        try {
            const update = await Order.update({orderStatus: orderStatus}, {where: {id: id}})
=======
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
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
            const data = {
                orderId: id,
                type: 'Cancelled',
                description: logSwitch(id, 'Cancelled')
            }
<<<<<<< HEAD
            await logsController.createLog(data)
            res.status(200).json({message: 'Order status has been updated to Cancel and deleted'})
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
=======
            await Log.create(data)
            res.status(200).json({ message: 'Order status has been updated to Cancel and deleted' })
        } catch (err) {
            // console.log(error);
            // res.status(500).json({
            //     message: err.errors
            // })
            next(err)
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        }

    }

<<<<<<< HEAD
    static async deleteOrder(req, res) {
        const {id} = req.params
        
        try {
            let deleted = await Order.destroy({where: {id: id}})
            res.status(200).json({message: 'Order status has been deleted'})
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
=======
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
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        }

    }

}

module.exports = orderController