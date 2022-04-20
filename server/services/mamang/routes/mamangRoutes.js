const express = require('express')
const { MamangController } = require('../controllers/mamangController')
const router = express.Router()

router.get('/',MamangController.findAllMamang) //test done
router.post('/nearest',MamangController.findNearestMamang) //test done
router.get('/:id',MamangController.findOneMamang) // test done
router.post('/login',MamangController.loginMamang)
router.post('/register',MamangController.registerMamang)
router.delete('/:id',MamangController.deleteOneMamang)
router.patch('/address/:id',MamangController.updateAddressMamang)
router.patch('/:id',MamangController.updateSaldoMamang)

module.exports = router