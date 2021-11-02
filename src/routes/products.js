const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController')
const adminController = require('../controllers/adminController')

//Todos los productos
router.get('/all', productsController.all)
//Productos por Categoria
router.get('/category/:id/', productsController.category)
//Productos por Subcategoria
router.get('/subCategory/:id/', productsController.subcategory)

//Detalle de un producto particular
router.get('/details/:id/', productsController.details)

//Carrito de compras
router.get('/shop', productsController.shop)

// Crear un producto - parte 2 // Deberá recibir los datos del formulario de creación.
router.post('/all', adminController.store)

// Editar un producto - parte 2
router.put('/:id/edit-product', adminController.update)

// Eliminar un producto 
router.delete('/:id', adminController.destroy);


module.exports = router

