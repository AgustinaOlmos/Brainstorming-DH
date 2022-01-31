const express = require('express')
const router = express.Router()

const apiProductsController = require('../../controllers/api/apiProductsController')

//Todos los productos
router.get('/products/all', apiProductsController.all)
// Todos los productos paginados
router.get('/products/page', apiProductsController.paginate)
// Todos los productos Datatable
router.get('/products/datatable', apiProductsController.dataTable)
// Detalle de producto
router.get('/product/:id/', apiProductsController.details)

module.exports = router
