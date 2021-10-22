const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsFilePath2 = path.join(__dirname, '../data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(productsFilePath2, 'utf-8'));
const productsFilePath3 = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath3, 'utf-8'));


const productsController = {
    all: (req, res) => res.render('products/allProducts', {
        products,
        categories,
        subCategories,
        nombrePagina: 'Productos'
    }),
    category: (req, res) => res.render('products/categoryProducts', {
        products,
        categoryId: req.params.categoryId,
        categories,
        subCategories,
        nombrePagina: 'Productos por categorias'
    }),
    details: (req, res) => {
        let product = products.find(product => product.id == req.params.productId)
        let slidesProduct = products.filter(product => product.id != req.params.productId)
        res.render('products/productDetail', {
            product,
            categories,
            subCategories,
            slidesProduct,
            nombrePagina: 'Detalles del Producto'
        })
    },
    shop: (req, res) => res.render('products/productCart',{
        categories,
        subCategories,
        nombrePagina: 'Compras'
    })
}

module.exports = productsController
