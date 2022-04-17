const express = require('express')
const router = express.Router()
const clientRoutes = require('./clientRoutes.js')

router.use('/clients',clientRoutes)

module.exports = router