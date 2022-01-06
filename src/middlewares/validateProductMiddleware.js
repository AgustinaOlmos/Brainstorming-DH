const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('title')
        .notEmpty().withMessage('(*) Tienes que escribir un nombre para el producto').bail()
        .isLength({ min: 5}).withMessage('(*) El nombre del producto debe contener un mínimo de 5 carateres'),
    body('productImage').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtension = ['.jpg', '.jpeg', '.png','.gif', '.bmp', '.tiff', '.psd'];
        if(file) {
            let fileExtensions = path.extname(file.originalname);
            if(!acceptedExtension.includes(fileExtensions)){
                throw new Error(`(*) Las extensiones de archivos permitidas son (${acceptedExtension.join(', ')})`)
            }
        }

        return true;
    }),
    body('price')
        .notEmpty().withMessage('(*) Tienes que escribir un importe para el producto'),
    body('promotion')
        .notEmpty().withMessage('(*) Por favor seleccione una tipo de promoción'),
    body('category')
        .notEmpty().withMessage('(*) Por favor seleccione una categoría'),
    body('subcategory')
        .notEmpty().withMessage('(*) Por favor seleccione una subcategoría'),

]