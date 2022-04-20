const express = require('express')
const logsController = require('../controllers/logs.js')
let routerLogs = express.Router()

routerLogs.get('/', logsController.readLogs)

module.exports = routerLogs