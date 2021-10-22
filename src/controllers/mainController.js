const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsFilePath2 = path.join(__dirname, '../data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(productsFilePath2, 'utf-8'));
const mainController = {
    loading: (req, res) => res.render('loading'),
    home: (req, res) => res.render('home',{
        categories,
        subCategories,
        nombrePagina: 'Home'
    }),
}

module.exports = mainController