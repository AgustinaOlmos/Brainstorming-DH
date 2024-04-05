const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const { validationResult } = require('express-validator');

const adminController = {
    create: async (req, res) => {
        res.render('admin/formCreateProduct', {
            categories: await db.Category.findAll({
                where: {
                    estado: 'A'
                }
            })
                .then(category => {
                    data = JSON.parse(JSON.stringify(category));
                    return data;
                }),
            subCategories: await db.Subcategory.findAll({
                where: {
                    estado: 'A'
                }
            })
                .then(subcategory => {
                    data = JSON.parse(JSON.stringify(subcategory));
                    return data;
                }),
            nombrePagina: 'Crear Producto'
        })
    },
    store: async (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            if (req.file) {
                if (req.file.filename) {
                    if (req.file.filename != 'user_default.png') {
                        fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + req.file.filename))
                    }
                }
            }
            return res.render('admin/formCreateProduct', {

                categories: await db.Category.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                    .then(category => {
                        data = JSON.parse(JSON.stringify(category));
                        return data;
                    }),
                subCategories: await db.Subcategory.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                    .then(subcategory => {
                        data = JSON.parse(JSON.stringify(subcategory));
                        return data;
                    }),
                nombrePagina: 'Crear Producto',
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        //Si viene o no img
        let image = false
        if (req.file) {
            image = true
        }

        let imgProduct
        if (image) {
            imgProduct = req.file.filename
        } else {
            imgProduct = 'default-image.jpg'
        }

        db.Product.create({
            title: req.body.title.toUpperCase(),
            price: req.body.price,
            promotion: req.body.promotion,
            discount: req.body.discount,
            img: imgProduct,
            category_id: req.body.category,
            subcategory_id: req.body.subcategory
        })
            .then(() => res.redirect('/products/all'))
            .catch(error => res.send(error))
    },

    // (get) - Formulario para editar
    edit: async (req, res) => {
        let products = await db.Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(product => {
                data = JSON.parse(JSON.stringify(product));
                return data;
            })
        let categoryId = products.category_id
        console.log("categoryId ", categoryId);

        res.render('admin/formEditProduct', {
            product: await db.Product.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(product => {
                    data = JSON.parse(JSON.stringify(product));
                    return data;
                }),
            categories: await db.Category.findAll({
                where: {
                    estado: 'A'
                }
            })
                .then(category => {
                    data = JSON.parse(JSON.stringify(category));
                    return data;
                }),

            categoryId,

            subCategories: await db.Subcategory.findAll({
                where: {
                    estado: 'A'
                }
            })
                .then(subcategory => {
                    data = JSON.parse(JSON.stringify(subcategory));
                    return data;
                }),
            nombrePagina: 'Editar Producto',
        })
    },
    // (put) Update - Método para actualizar la info
    update: async (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            if (req.file) {
                if (req.file.filename) {
                    if (req.file.filename != 'user_default.png') {
                        fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + req.file.filename))
                    }
                }
            }
            let products = await db.Product.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(product => {
                    data = JSON.parse(JSON.stringify(product));
                    return data;
                })
            let categoryId = products.category_id
            return res.render('admin/formEditProduct', {
                product: await db.Product.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(product => {
                        data = JSON.parse(JSON.stringify(product));
                        return data;
                    }),
                categories: await db.Category.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                    .then(category => {
                        data = JSON.parse(JSON.stringify(category));
                        return data;
                    }),
                categoryId,
                subCategories: await db.Subcategory.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                    .then(subcategory => {
                        data = JSON.parse(JSON.stringify(subcategory));
                        return data;
                    }),
                nombrePagina: 'Editar Producto',
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

            let productToEdit = await db.Product.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(product => {
                    data = JSON.parse(JSON.stringify(product));
                    return data;
                })
        if (req.file) {
            // Viene foto nueva
            if (productToEdit.img != 'default-image.jpg') {
                fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + productToEdit.img))
            }
        }

        db.Product.update({
            title: req.body.title,
            price: req.body.price,
            promotion: req.body.promotion,
            discount: req.body.discount,
            img: req.file ? req.file.filename : productToEdit.img,
            category_id: req.body.category,
            subcategory_id: req.body.subcategory
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.redirect('/products/all'))
            .catch(error => res.send(error))
    },

    destroy: async  (req, res) => {
        let products = await db.Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            data = JSON.parse(JSON.stringify(product));
            return data;
        })

        if (products.img != 'default-image.jpg') {
            fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + products.img))
        }

        db.Product.update({
            estado: 'I'
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.redirect('/products/all'))
        .catch(error => res.send(error))

    }
}

module.exports = adminController
