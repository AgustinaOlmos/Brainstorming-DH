const db = require('../database/models')
const Op = db.Sequelize.Op

const productsController = {
    all: async (req, res) => {
        res.render('products/allProducts', {
            products: await db.Product.findAll({
                where: {
                    estado: 'A'
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
            subCategories: await db.Subcategory.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(subcategory => {
                data = JSON.parse(JSON.stringify(subcategory));
                return data;
            }),
            nombrePagina: 'Productos'
        })
    },
    category: async (req, res) => {
        res.render('products/categoryProducts', {
            products: await db.Product.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(product => {
                data = JSON.parse(JSON.stringify(product));
                return data;
            }),
            categoryId: req.params.id,
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
            nombrePagina: 'Productos por categorias'
        })
    },
    subcategory: async (req, res) => {
        res.render('products/subCategoryProducts', {
            products: await db.Product.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(product => {
                data = JSON.parse(JSON.stringify(product));
                return data;
            }),
            subcategoryId: req.params.id,
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
            nombrePagina: 'Productos por subcategorias'
        })
    },
    topFive: async (req, res) => {
        let discountToFilter = 15;
        // Determina la cantidad de productos que se van a mostrar en el index
        let numberOfProductsToShow = 5;
        let discountProductsToShow = [];

        discountProducts = await db.Product.findAll({
            where: {
                discount: { [Op.gte]: discountToFilter }
            },
            limit: numberOfProductsToShow
        })

        for (let i = 0; i < numberOfProductsToShow; i++) {
            if (discountProducts.length == 0) { break }; // Si no hay mas elementos, salimos del for
            discountProductsToShow.push( // Pusheamos al array que vamos a enviar...
                discountProducts.splice( // Tomamos un elemento al azar del array. Splice toma un elemento del array, el primer parametro determina la posicion, el segundo cuantos elementos
                    Math.floor(Math.random() * discountProducts.length), 1
                )[0] // Ya que splice devuelve un array, lo quitamos del mismo para poder pushearlo
            );
        }
        products = discountProductsToShow;
        res.render('products/topFiveProducts', {
            products,
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
            nombrePagina: 'Top 5 mejores Ofertas'
        })

    },
    details: async (req, res) => {
        let product = await db.Product.findOne({
            where: {
                id: req.params.id,
                estado: 'A'
            }
        })
        .then(product => {
            data = JSON.parse(JSON.stringify(product));
            return data;
        })

        let slidesProduct = await db.Product.findAll({
            where: {
                id: { [Op.ne]: req.params.id },
                estado: 'A'
            }
        })
        .then(product => {
            data = JSON.parse(JSON.stringify(product));
            return data;
        })

        res.render('products/productDetail', {
            product,
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
            slidesProduct,
            nombrePagina: 'Detalles del Producto'
        })
    },
    getSubCategory: (req, res) => {
        db.Subcategory.findAll()
        .then(user => {
            data = JSON.parse(JSON.stringify(user));
            return res.send(data);
        })
    },
    shop: async (req, res) => res.render('products/productCart', {
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
        nombrePagina: 'Compras'
    }),

    search: async (req, res) => {

        res.render('products/searchProducts', {
            products: await db.Product.findAll({
                where: {
                    title: { [Op.like]: `%${req.body.searchProduct}%` },
                    estado: 'A'
                }

            })
            .then(product => {
                data = JSON.parse(JSON.stringify(product));
                console.log(data);
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
            subCategories: await db.Subcategory.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(subcategory => {
                data = JSON.parse(JSON.stringify(subcategory));
                return data;
            }),
            nombrePagina: 'Busqueda'
        })
    },
}

module.exports = productsController
