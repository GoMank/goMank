const express = require('express')
const { ClientController } = require('../controllers/clientController')
const router = express.Router()

router.get('/',ClientController.findAllClient)
router.get('/:id',ClientController.findOneClient)
router.post('/login',ClientController.loginClient)
router.post('/register',ClientController.registerClient)

module.exports = router