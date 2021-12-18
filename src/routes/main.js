const express = require('express')
const router = express.Router()

const mainController = require('../controllers/mainController')

router.get('/', mainController.loading)
router.get('/home', mainController.home)


module.exports = router