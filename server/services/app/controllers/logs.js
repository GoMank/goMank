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

<<<<<<< HEAD
    // static async createLog(data) {

    //     try {
    //         await Log.create(data)
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

=======
>>>>>>> fd4df6dc497ecf730c470d8288eb005b0e2d5ae8
}

module.exports = logsController