const { Order } = require('../models')
const {sequelize, Sequelize: {op}} = require('../models')

class orderController {

    static async getAllOrders(req, res) {

        try {
            let orders = await Order.findAll()
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async addOrder(req, res) {
        const {clientId, clientName, mamangId, mamangName, address} = req.body
        
        try {
            let order = await Order.create(req.body)
            res.status(201).json(order)
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async addOrder(req, res) {
        const {clientId, clientName, mamangId, mamangName, address} = req.body
        
        try {
            let order = await Order.create(req.body)
            res.status(201).json(order)
        } catch (err) {
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
            res.status(200).json(update)
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async updateStatusOrderCancel(req, res) {
        const {id} = req.params
        const orderStatus = "Canceled"
        
        try {
            const update = await Order.update({orderStatus: orderStatus}, {where: {id: id}})
            await Order.destroy({where: {id: id}})
            res.status(200).json(update)
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
            res.status(200).json(deleted)
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

}

module.exports = orderController