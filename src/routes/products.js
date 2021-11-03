const express = require('express')
const router = express.Router()
const multer = require('multer')

const productsController = require('../controllers/productsController')
const adminController = require('../controllers/adminController')

// Configuracion de Multar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/products')
    },
    filename: (req, file, cb) => {
        const newFileName = 'product_img_' + Date.now() + file.originalname
        cb(null, newFileName)
    }
})
const upload = multer({ storage })

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
router.post('/all', upload.single('newProductImage'), adminController.store)

// Editar un producto - parte 2
router.put('/edit-product/:id', upload.single('editedProductImage'), adminController.update)

// Eliminar un producto 
router.delete('/:id', adminController.destroy);


module.exports = router
