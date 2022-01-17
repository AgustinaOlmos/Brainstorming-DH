const express = require('express')
const router = express.Router()

const apiProductsController = require('../../controllers/api/apiProductsController')

//Todos los productos
router.get('/all', apiProductsController.all)
//Productos por Categoria
router.get('/product/:id/', apiProductsController.details)

module.exports = router
