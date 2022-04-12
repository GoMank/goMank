const express = require('express')
const routerOrder = require('./order.js')
const router = express.Router()

router.use('/orders', routerOrder)

router.get('/', (req, res) => {
    res.send('ini home')
})

module.exports = router