const express = require('express')
const router = express.Router()
const mamangRoutes = require('./mamangRoutes.js')

router.use('/mamangs',mamangRoutes)

module.exports = router