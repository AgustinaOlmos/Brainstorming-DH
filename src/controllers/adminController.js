const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsFilePath2 = path.join(__dirname, '../data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(productsFilePath2, 'utf-8'));
const productsFilePath3 = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath3, 'utf-8'));

const adminController = {
    create: (req, res) => {
        res.render('admin/formCreateProduct', {
            categories,
            subCategories,
            nombrePagina: 'Crear Producto'
        })
    },
    edit: (req, res) => {
        let product = products.find(product => product.id == req.params.id)

        res.render('admin/formEditProduct', {
            product,
            categories,
            subCategories,
            nombrePagina: 'Editar Producto',
        })
    }
}

module.exports = adminController
