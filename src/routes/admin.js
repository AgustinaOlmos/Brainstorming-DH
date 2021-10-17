const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/create-product', adminController.create)
router.get('/edit-product/:productId', adminController.edit)

module.exports = router