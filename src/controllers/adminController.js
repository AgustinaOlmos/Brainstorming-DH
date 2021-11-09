const fs = require('fs');
const path = require('path');

let productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let categoriesFilePath = path.join(__dirname, '../data/productsCategory.json');
let categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
let subCategoriesFilePath = path.join(__dirname, '../data/productsSubCategory.json');
let subCategories = JSON.parse(fs.readFileSync(subCategoriesFilePath, 'utf-8'));


const adminController = {
    create: (req, res) => {
        res.render('admin/formCreateProduct', {
            categories,
            subCategories,
            nombrePagina: 'Crear Producto'
        })
    },
    store: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // Guardar el producto nuevo
        let newProduct = {
            id: products[products.length - 1].id + 1,
            title: req.body.title,
            price: parseInt(req.body.price),
            discount: parseInt(req.body.discount),
            category: parseInt(req.body.category),
            subcategory: parseInt(req.body.subcategory),
            promotion: parseInt(req.body.promotion),
            img: req.file ? req.file.filename : '/img/default-image.png',
        }
        console.log(req.file)
        products.push(newProduct)

        // Pasar los productos a JSON
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
        res.redirect('/products/all')
    },

    // (get) - Formulario para editar
    edit: (req, res) => {
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let product = products.find(product => product.id == req.params.id)
        let categoryId = product.category
        res.render('admin/formEditProduct', {
            product,
            categories,
            categoryId,
            subCategories,
            nombrePagina: 'Editar Producto',
        })
    },
    // (put) Update - Método para actualizar la info
    update: (req, res) => {
        let id = req.params.id
        let productToEdit = products.find(product => product.id == id)

        let editedProduct = {
            id,
            title: req.body.title,
            price: parseInt(req.body.price),
            discount: parseInt(req.body.discount),
            category: parseInt(req.body.category),
            subcategory: parseInt(req.body.subcategory),
            promotion: parseInt(req.body.promotion),
            img: req.file ? req.file.filename : productToEdit.img
        }

        products.forEach((product, index) => {
            if (product.id == id) {
                products[index] = editedProduct
            }
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " ")) // Convierto en JSON
        res.redirect('/products/all')
    },

    destroy: (req, res) => {
        let id = req.params.id

        let finalProducts = products.filter(product => product.id != id)

        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " ")) // Convierto en JSON
        res.redirect('/products/all')
    }
}

module.exports = adminController
