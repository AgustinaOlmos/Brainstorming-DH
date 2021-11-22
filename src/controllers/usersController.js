const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsFilePath2 = path.join(__dirname, '../data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(productsFilePath2, 'utf-8'));
const afipFilePath = path.join(__dirname, '../data/afipDataBase.json');
const afip = JSON.parse(fs.readFileSync(afipFilePath, 'utf-8'));
const zoneDatabaseFilePath = path.join(__dirname, '../data/zonasDataBase.json');
const zoneDatabase = JSON.parse(fs.readFileSync(zoneDatabaseFilePath, 'utf-8'));
let productsAllFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsAllFilePath, 'utf-8'));
let totalProducts = products.length;

const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../modelos/User');

const usersController = {
    login: (req, res) => res.render('users/login', {
        categories,
        subCategories,
        nombrePagina: 'Inicio de Sesion'
    }),
    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        
        if(userToLogin) {
            //return res.send(userToLogin.password);
            if(userToLogin.password.substr(0,7) == '$2a$10$'){
                let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                if(isOkThePassword) {
                    // Guarda todos los datos del usuario en una variable de session
                    // primero quitar el atributo password del objeto
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;

                    if(req.body.remember_user) {
                        res.cookie('userBrainstorming', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }

                    return res.redirect('/home');
                }
                return res.render('users/login', {
                    categories,
                    subCategories,
                    errors: {
                        password: {
                            msg: '(*) Las credenciales son inválidas'
                        }
                    },
                    oldData: req.body,
                    nombrePagina: 'Inicio de Sesion'
                });
            }

            if(userToLogin.password == req.body.password){
                // Guarda todos los datos del usuario en una variable de session
                // primero quitar el atributo password del objeto
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.remember_user) {
                    res.cookie('userBrainstorming', req.body.email, { maxAge: (1000 * 60) * 60 })
                }

                return res.redirect('/home');
            }
            return res.render('users/login', {
                categories,
                subCategories,
                errors: {
                    password: {
                        msg: '(*) Las credenciales son inválidas'
                    }
                },
                oldData: req.body,
                nombrePagina: 'Inicio de Sesion'
            });

        }

        return res.render('users/login', {
            categories,
            subCategories,
            errors: {
                email: {
                    msg: '(*) No se encuentra esta email en nuestra base de datos'
                }
            },
            oldData: req.body,
            nombrePagina: 'Inicio de Sesion'
        });
    },
    register: (req, res) => {
        res.render('users/register', {
            categories,
            subCategories,
            afip,
            zoneDatabase,
            nombrePagina: 'Registro'
        })
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0) {
            if(req.file) {
                if(req.file.filename) {
                    if(req.file.filename != 'user_default.png') {
                        fs.unlinkSync(path.join(__dirname, '../../public/img/users/'+req.file.filename))
                    }
                }
            }
            return res.render('users/register', {
                categories,
                subCategories,
                afip,
                zoneDatabase,
                nombrePagina: 'Registro',
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // Comprbar que no exista el usuario por su email
        let userInDB = User.findByField('email', req.body.email);

        if(userInDB) {

            if(req.file) {
                if(req.file.filename) {
                    if(req.file.filename != 'user_default.png') {
                        fs.unlinkSync(path.join(__dirname, '../../public/img/users/'+req.file.filename))
                    }
                }
            }

            return res.render('users/register', {
                categories,
                subCategories,
                afip,
                zoneDatabase,
                nombrePagina: 'Registro',
                errors: {
                    email: {
                        msg: '(*) Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        // Genera un Id autoincrementable
        let id = User.generateId();

        let userToCreate = {
            id: id,
            ...req.body,
            dni_cuit: parseInt(req.body.dni_cuit),
            invoice_type_id: parseInt(req.body.invoice_type_id),
            state: parseInt(req.body.state),
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file ? req.file.filename : 'user_default.png',
            roll_user: 2
        }

        // quitar el campo repassword del array
        delete userToCreate.repassword;

        let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
    },
    profile: (req, res) => res.render('users/profile', {
        categories,
        subCategories,
        zoneDatabase,
        user: req.session.userLogged,
        totalProducts,
        nombrePagina: 'Perfil de Usuario'
    }),
    logout: (req, res) => {
        res.clearCookie('userBrainstorming')
        req.session.destroy();
        return res.redirect('/home');
    }
}

module.exports = usersController