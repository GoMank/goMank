const express = require('express')
const routerOrder = require('./order.js')
const routerLogs = require('./logs.js')
const router = express.Router()

router.use('/orders', routerOrder)
router.use('/logs', routerLogs)

<<<<<<< HEAD
router.get('/', (req, res) => {
    res.send('ini home')
})
=======
// router.get('/', (req, res) => {
//     res.send('ini home')
// })
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae

module.exports = router