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

const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const User = require('../modelos/User');

const usersController = {
    login: (req, res) => res.render('users/login', {
        categories,
        subCategories,
        nombrePagina: 'Inicio de Sesion'
    }),
    
    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        if (userToLogin) {
            if (userToLogin.password.substr(0, 7) == '$2a$10$') {
                let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
                if (isOkThePassword) {
                    //Guarda todos los datos del usuario en una variable de session
                    //Primero quitar el atributo password del objeto
                    delete userToLogin.password
                    req.session.userLogged = userToLogin
                }
                return res.redirect('/home')
            }
            if (userToLogin.password == req.body.password) {
                //Guarda todos los datos del usuario en una variable de session
                //Primero quitar el atributo password del objeto
                delete userToLogin.password
                req.session.userLogged = userToLogin

                return res.redirect('/home')
            }
            return res.render('users/login', {
                categories,
                subCategories,
                errors: {
                    password: {
                        msg: '(*) Las Credenciales son Inválidas'
                    }
                },
                oldData: req.body,
                nombrePagina: 'Inicio de Sesion'
            })
        }
        return res.render('users/login', {
            categories,
            subCategories,
            errors: {
                email: {
                    msg: '(*) No se encuentra este email en nuestra base de datos'
                }
            },
            oldData: req.body,
            nombrePagina: 'Inicio de Sesion'
        })
    },

    register: (req, res) => res.render('users/register', {
        categories,
        subCategories,
        nombrePagina: 'Registro'
    }),

    profile: (req, res) => res.render('users/profile', {
        categories,
        subCategories,
        zoneDatebase,
        user: req.session.userLogged,
        totalProducts,
        nombrePagina: 'Perfil de Usuario'
    }),

    logout: (req, res) =>{
        res.clearCookie('userBrainstorming')
        req.session.destroy()
        return req.redirect('/home')
    }
}

module.exports = usersController