const fs = require('fs');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const subCategoriesFilePath = path.join(__dirname, '../data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(subCategoriesFilePath, 'utf-8'));

const mainController = {
    loading: (req, res) => res.render('loading'),
    
    home: (req, res) => res.render('home',{
        categories,
        subCategories,
        nombrePagina: 'Home'
    }),

    //To-Do
    /* search: (req, res) => {
        let productsSearch = req.query.searchProduct
        let productsResult = []

        for (let i = 0; i < products.length; i++) {
            if (products[i].title.includes(productsSearch)) {
                productsResult.push(products[i])
            }
        }
        res.render('results', {
			productsSearch,
			productsResults
		})
    } */
}

module.exports = mainController