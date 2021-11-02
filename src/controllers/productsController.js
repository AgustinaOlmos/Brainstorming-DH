const fs = require('fs');
const path = require('path');

let productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let categoriesFilePath = path.join(__dirname, '../data/productsCategory.json');
let categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
let subCategoriesFilePath = path.join(__dirname, '../data/productsSubCategory.json');
let subCategories = JSON.parse(fs.readFileSync(subCategoriesFilePath, 'utf-8'));


const productsController = {
    all: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render('products/allProducts', {
        products,
        categories,
        subCategories,
        nombrePagina: 'Productos'
    })},
    category: (req, res) => {
       products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        res.render('products/categoryProducts', {
        products,
        categoryId: req.params.id,
        categories,
        subCategories,
        nombrePagina: 'Productos por categorias'
    })},
    subcategory: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render('products/subCategoryProducts', {
        products,
        subcategoryId: req.params.id,
        categories,
        subCategories,
        nombrePagina: 'Productos por subcategorias'
    })},
    details: (req, res) => {
       products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        let product = products.find(product => product.id == req.params.id)
        let slidesProduct = products.filter(product => product.id != req.params.id)
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
