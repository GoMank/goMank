const express = require('express')
const { MamangController } = require('../controllers/mamangController')
const router = express.Router()

router.get('/',MamangController.findAllMamang)
router.get('/:id',MamangController.findOneMamang)
router.post('/login',MamangController.loginMamang)
router.post('/register',MamangController.registerMamang)
router.delete('/:id',MamangController.deleteOneMamang)
router.patch('/:id',MamangController.updateSaldoMamang)

module.exports = router