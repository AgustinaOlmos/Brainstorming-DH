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
        })
    },
    category: (req, res) => {
        res.render('products/categoryProducts', {
            products,
            categoryId: req.params.id,
            categories,
            subCategories,
            nombrePagina: 'Productos por categorias'
        })
    },
    subcategory: (req, res) => {
        res.render('products/subCategoryProducts', {
            products,
            subcategoryId: req.params.id,
            categories,
            subCategories,
            nombrePagina: 'Productos por subcategorias'
        })
    },
    topFive: (req, res) => {
        let discountToFilter = 10;
        // Determina la cantidad de productos que se van a mostrar en el index
        let numberOfProductsToShow = 5;
        let discountProductsToShow = [];
        
        discountProducts = products.filter(product => product.discount >= discountToFilter); // Filtramos los productos
        for (let i = 0; i < numberOfProductsToShow; i++) {
            if (discountProducts.length == 0) {break}; // Si no hay mas elementos, salimos del for
                discountProductsToShow.push( // Pusheamos al array que vamos a enviar...
                discountProducts.splice( // Tomamos un elemento al azar del array. Splice toma un elemento del array, el primer parametro determina la posicion, el segundo cuantos elementos
                Math.floor(Math.random()*discountProducts.length), 1
                )[0] // Ya que splice devuelve un array, lo quitamos del mismo para poder pushearlo
            );
        }
        products = discountProductsToShow;
        res.render('products/topFiveProducts', {
            products,
            categories,
            subCategories,
            nombrePagina: 'Top 5 mejores Ofertas'
        })
    },
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
    shop: (req, res) => res.render('products/productCart', {
        categories,
        subCategories,
        nombrePagina: 'Compras'
    })
}

module.exports = productsController
