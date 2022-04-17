const { Log } = require('../models')
<<<<<<< HEAD
const {sequelize, Sequelize: {op}} = require('../models')

class logsController {

    static async readLogs(req, res) {
        
=======
const { sequelize, Sequelize: { op } } = require('../models')

class logsController {

    static async readLogs(req, res, next) {

>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        try {
            let logs = await Log.findAll()
            res.status(200).json(logs)
        } catch (err) {
<<<<<<< HEAD
            res.status(500).json({
                message: err.errors
            })
=======
            // res.status(500).json({
            //     message: err.errors
            // })
            // console.log(err);
            next(err)
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
        }

    }

<<<<<<< HEAD
    static async createLog(data) {

        try {
            await Log.create(data)
        } catch (err) {
            console.log(err)
        }

    }
=======
    // static async createLog(data) {

    //     try {
    //         await Log.create(data)
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae

}

module.exports = logsController