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
                delete product.price;
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
    }
}

module.exports = apiProductsController
