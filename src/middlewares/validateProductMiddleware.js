const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('title')
        .notEmpty().withMessage('(*) Escribe un nombre para el producto').bail()
        .isLength({ min: 5 }).withMessage('(*) El nombre del producto debe contener al menos 5 letras'),
    body('productImage').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.psd'];
        if (file) {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`(*) Las extensiones de archivos permitidas son (${acceptedExtensions.join(', ')})`)
            }
        }
        return true;
    }),
    body('price').notEmpty().withMessage('(*) Tienes que escribir un importe para el producto'),
    body('promotion').notEmpty().withMessage('(*) Por favor seleccione una tipo de promoción'),
    body('category').notEmpty().withMessage('(*) Por favor seleccione una categoría'),
    body('subcategory').notEmpty().withMessage('(*) Por favor seleccione una subcategoría'),
]