const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsFilePath2 = path.join(__dirname, '../data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(productsFilePath2, 'utf-8'));

const usersController = {
    login: (req, res) => res.render('users/login', {
        categories,
        subCategories,
        nombrePagina: 'Inicio de Sesion'
    }),
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