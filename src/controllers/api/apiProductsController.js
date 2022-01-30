const db = require('../../database/models')
const Op = db.Sequelize.Op

const apiProductsController = {
    all: (req, res) => {
        let products = db.Product.findAll({where: {estado: 'A'}});
        let categories = db.Category.findAll({where: {estado : 'A'}});
        Promise.all([products, categories]). then(([products, categories]) => {
            let productsToSend = products.map((product) => product.dataValues);
            let categoriesToSend = categories.map((category) => category.dataValues);

            let namesCategories = [];
            let countCategories = [];
            let idCategories = [];

            categoriesToSend.forEach((category) => {
                idCategories.push(category.id);
                namesCategories.push(category.name);
                countCategories.push(0);
            })

            let conatdor = 0;

            idCategories.forEach((categoryId) => {
                conatdor = 0;
                productsToSend.forEach((product) => {
                    if(product.category_id == categoryId) {
                        conatdor = conatdor + 1;
                        countCategories[categoryId - 1] = conatdor;
                    }
                })
            })
            
            idCategories.shift();
            namesCategories.shift();
            countCategories.shift();

            let countCategoryToSend = [];
            for (let i = 0; i < namesCategories.length; i++) {
                countCategoryToSend.push(namesCategories[i] + ':  ' + countCategories[i]);
            }

            productsToSend.forEach((product) => {
                delete product.discount;
                delete product.promotion;
                delete product.img;
                delete product.estado;
                delete product.category_id;
                delete product.subcategory_id;
                product.dbaseRelations = "category_id";
                product.detailUrl = `http://localhost:4000/api/product/${product.id}`
            })

            let dataToSend = { countProducts: products.length,
                categoriesCount: countCategories.length,
                countByCategory: countCategoryToSend,
                products: productsToSend,
                status: 200
            }

            return res.status(200).json(dataToSend);

        })
    },
    details: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: ['category']
        })
        .then(product => {
            let respuesta = {
                meta: {
                    status: 200,
                    url: 'http://localhost:4000/api/product/:id'
                },
                data: product
            }
            res.status(200).json(respuesta);
        })
    },
    paginate: (req, res) => {
        const { page, size } = req.query;
        let pagina = parseInt(page);
        let tamano = parseInt(size);
        db.Product.findAll(
            {
                where: {
                    estado: 'A'
                },
                raw: true,
                attributes: ['title'],
                limit : tamano,
                offset : pagina * tamano
            }

        ).then(product => {
            let respuesta = {
                products: product,
                status: 200
            }
            res.status(200).json(respuesta);
        })
    },
    dataTable: (req, res) => {
        db.Product.findAll(
            {
                where: {
                    estado: 'A'
                },
                raw: true,
                include: ['category', 'subcategory'],
                attributes: ['id', 'title', 'price', 'discount'],
            }

        ).then(product => {
            let data = product;
            data.forEach((product) => {
                product.category = product['category.name'];
                delete product['category.name'];
                delete product['subcategory.id'];
                product.subcategory = product['subcategory.name'];
                delete product['subcategory.name'];
                delete product['category.id'];
                delete product['subcategory.id'];
                delete product['category.url'];
                delete product['subcategory.url'];
                delete product['category.imgBanner'];
                delete product['category.img1'];
                delete product['category.img2'];
                delete product['category.img3'];
                delete product['category.img4'];
                delete product['category.estado'];
                delete product['subcategory.estado'];
            })
            let respuesta = {
                products: product,
                status: 200
            }
            res.status(200).json(respuesta);
        })
    }
}

module.exports = apiProductsController
