const express = require('express')
const router = express.Router()
const multer = require('multer')

const productsController = require('../controllers/productsController')
const adminController = require('../controllers/adminController')

// Middlewares
const validations = require('../middlewares/validateProductMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

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

//Subcategorias para select vista
router.get('/subcategories', productsController.getSubCategory)

//Productos Top 5 mejores ofertas
router.get('/topFive', productsController.topFive)

//Detalle de un producto particular
router.get('/details/:id/', productsController.details)

//Carrito de compras
router.get('/shop', authMiddleware, productsController.shop)

//Busqueda de Productos
router.post('/search', productsController.search)

// Crear un producto - parte 2 // Deberá recibir los datos del formulario de creación.
router.post('/all', upload.single('productImage'), validations, adminController.store)

// Editar un producto - parte 2
router.put('/edit-product/:id', upload.single('productImage'), validations, adminController.update)

// Eliminar un producto 
router.delete('/:id', adminController.destroy);


module.exports = router
