const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.get('/all', productsController.all)
router.get('/details/:productId/', productsController.details)
router.get('/shop', productsController.shop)

module.exports = router

