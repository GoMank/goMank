const { Log } = require('../models')
const {sequelize, Sequelize: {op}} = require('../models')

class logsController {

    static async readLogs(req, res) {
        
        try {
            let logs = await Log.findAll()
            res.status(200).json(logs)
        } catch (err) {
            res.status(500).json({
                message: err.errors
            })
        }

    }

    static async createLog(data) {

        try {
            await Log.create(data)
        } catch (err) {
            console.log(err)
        }

    }

}

module.exports = logsController