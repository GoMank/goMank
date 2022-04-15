const { Order, Log } = require('../models')
const {sequelize, Sequelize: {op}} = require('../models')
const logsController = require('./logs')
const logSwitch = require('../helpers/logSwitch')

class orderController {

    static async getAllOrders(req, res) {
        const option = {
            include: Log
        }
        try {
            let orders = await Order.findAll(option)
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async getOrderById(req, res) {
        const {id} = req.params
        try {
            let order = await Order.findByPk(id)
            res.status(200).json(order)
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async addOrder(req, res) {
        
        try {
            let order = await Order.create(req.body)
            console.log(order);
            const data = {
                orderId: order.id,
                type: 'Created',
                description: logSwitch(order.id, 'Created')
            }
            await logsController.createLog(data)
            res.status(201).json(order)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async updateStatusOrderDone(req, res) {
        const {id} = req.params
        const orderStatus = "Done"
        const paymentStatus = "Paid"
        
        try {
            const update = await Order.update({orderStatus: orderStatus, paymentStatus}, {where: {id: id}})
            const data = {
                orderId: id,
                type: 'Done',
                description: logSwitch(id, 'Done')
            }
            await logsController.createLog(data)
            res.status(200).json({message: 'Order status has been updated to Done'})
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async updateStatusOrderCancel(req, res) {
        const {id} = req.params
        const orderStatus = "Cancelled"
        
        try {
            const update = await Order.update({orderStatus: orderStatus}, {where: {id: id}})
            const data = {
                orderId: id,
                type: 'Cancelled',
                description: logSwitch(id, 'Cancelled')
            }
            await logsController.createLog(data)
            res.status(200).json({message: 'Order status has been updated to Cancel and deleted'})
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async deleteOrder(req, res) {
        const {id} = req.params
        
        try {
            let deleted = await Order.destroy({where: {id: id}})
            res.status(200).json({message: 'Order status has been deleted'})
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

}

module.exports = orderController