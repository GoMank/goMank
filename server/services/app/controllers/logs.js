const { Log } = require('../models')
const { sequelize, Sequelize: { op } } = require('../models')

class logsController {

    static async readLogs(req, res, next) {

        try {
            let logs = await Log.findAll()
            res.status(200).json(logs)
        } catch (err) {
            // res.status(500).json({
            //     message: err.errors
            // })
            // console.log(err);
            next(err)
        }

    }

}

module.exports = logsController