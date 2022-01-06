const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')


// Crear un producto - parte 1 // Mostrará el Formulario de creación para un producto.
router.get('/create-product', adminController.create)

// Editar un producto - parte 1 // Muestra el Formulario de edición
router.get('/edit-product/:id', adminController.edit)


module.exports = router