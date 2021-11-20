const fs = require('fs');
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const subCategoriesFilePath = path.join(__dirname, '../data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(subCategoriesFilePath, 'utf-8'));
const afipFilePath = path.join(__dirname, '../data/afipDataBase.json')
const afip = JSON.parse(fs.readFileSync(afipFilePath, 'utf-8'));
const zoneDatabaseFilePath = path.join(__dirname, '../data/zonasDataBase.json');
const zoneDatabase = JSON.parse(fs.readFileSync(zoneDatabaseFilePath, 'utf-8'));
let productsAllFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsAllFilePath, 'utf-8'));

let totalProducts = products.length;

const User = require('../modelos/User');

const usersController = {
    login: (req, res) => res.render('users/login', {
        categories,
        subCategories,
        nombrePagina: 'Inicio de Sesion'
    }),
    loginProcess: (req, res) =>{
        let userToLogin = User.findByField('email', req.body.email);
        return res.send(userToLogin);
    },
    
    register: (req, res) => res.render('users/register', {
        categories,
        subCategories,
        nombrePagina: 'Registro'
    }),
    profile: (req, res) => res.render('users/profile', {
        categories,
        subCategories,
        nombrePagina: 'Perfil de Usuario'
    })
}

module.exports = usersController