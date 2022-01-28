const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


/*==================================================
SEQUELIZE
==================================================*/

const db = require('../database/models');

/*==================================================*/

const usersController = {
    login: async (req, res) => res.render('users/login', {
        categories: await db.Category.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(category => {
            data = JSON.parse(JSON.stringify(category));
            return data;
        }),
        subCategories: await db.Subcategory.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(subcategory => {
            data = JSON.parse(JSON.stringify(subcategory));
            return data;
        }),
        nombrePagina: 'Inicio de Sesion'
    }),
    loginProcess: async (req, res) => {

        let categories = await db.Category.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(category => {
            data = JSON.parse(JSON.stringify(category));
            return data;
        })

        let subCategories = await db.Subcategory.findAll({
            where: {
                estado: 'A'
            }
        })
            .then(subcategory => {
                data = JSON.parse(JSON.stringify(subcategory));
                return data;
            })

        db.Users.findOne(
            {
                where: {
                    email: req.body.email,
                    estado: 'A'
                }
            }
        )
        .then(user => {
            let usuarioJson = JSON.parse(JSON.stringify(user))

            userToLogin = usuarioJson;
        
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
                            res.cookie('userBrainstorming', req.body.email, { maxAge: (1000 * 60) * 360  })
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

        })
    },
    register: async (req, res) => {
        res.render('users/register', {
            categories: await db.Category.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(category => {
                data = JSON.parse(JSON.stringify(category));
                return data;
            }),
            subCategories: await db.Subcategory.findAll({
                where: {
                    estado: 'A'
                }
            })
                .then(subcategory => {
                    data = JSON.parse(JSON.stringify(subcategory));
                    return data;
                }),
            afip: await db.Afip.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(afip => {
                data = JSON.parse(JSON.stringify(afip));
                return data;
            }),
            zoneDatabase: await db.Zones.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(zones => {
                data = JSON.parse(JSON.stringify(zones));
                return data;
            }),
            nombrePagina: 'Registro'
        })
    },
    processRegister: async (req, res) => {
        let categories = await db.Category.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(category => {
            data = JSON.parse(JSON.stringify(category));
            return data;
        })
        let subCategories = await db.Subcategory.findAll({
            where: {
                estado: 'A'
            }
        })
            .then(subcategory => {
                data = JSON.parse(JSON.stringify(subcategory));
                return data;
            })
        let afip = await db.Afip.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(afip => {
            data = JSON.parse(JSON.stringify(afip));
            return data;
        })
        let zoneDatabase = await db.Zones.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(zones => {
            data = JSON.parse(JSON.stringify(zones));
            return data;
        })
            
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

        // Comprobar que no exista el usuario por su email

        db.Users.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        )
        .then(user => {
            let userInDB = JSON.parse(JSON.stringify(user));

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

            db.Users.create(
                {
                    fullName: req.body.fullName,
                    dni_cuit: parseInt(req.body.dni_cuit),
                    phone: parseInt(req.body.phone),
                    email: req.body.email,
                    invoice_type_id: parseInt(req.body.invoice_type_id),
                    street: req.body.street,
                    number: parseInt(req.body.number),
                    floor: req.body.floor,
                    flat: req.body.flat,
                    zip: parseInt(req.body.zip),
                    city: req.body.city,
                    state_id: parseInt(req.body.state),
                    password: bcryptjs.hashSync(req.body.password, 10),
                    avatar: req.file ? req.file.filename : 'user_default.png',
                    roll_user_id: 2,
                    reference: req.body.reference
                }
            )
            .then(()=> {
                return res.redirect('/users/login')})            
            .catch(error => res.send(error))
        })
    },
    editUser: async (req, res) => {
        let categories = await db.Category.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(category => {
            console.log(category);
            data = JSON.parse(JSON.stringify(category));
            console.log(data);
            return data;
        })

        let subCategories = await db.Subcategory.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(subcategory => {
            data = JSON.parse(JSON.stringify(subcategory));
            return data;
        })

        let afip = await db.Afip.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(afip => {
            data = JSON.parse(JSON.stringify(afip));
            return data;
        })

        let zoneDatabase = await db.Zones.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(zones => {
            data = JSON.parse(JSON.stringify(zones));
            return data;
        })

        let rollDatabase = await db.Roles.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(roles => {
            data = JSON.parse(JSON.stringify(roles));
            return data;
        })

        let editUser = await db.Users.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            data = JSON.parse(JSON.stringify(user));
            return data;
        })
        res.render('users/editUser', {
            categories,
            subCategories,
            afip,
            zoneDatabase,
            rollDatabase,
            user: editUser,
            nombrePagina: 'Actualizar usuario'
        })
    },
    updateUser: async (req, res) => {
        const resultValidation = validationResult(req);

        let categories = await db.Category.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(category => {
            data = JSON.parse(JSON.stringify(category));
            return data;
        })

        let subCategories = await db.Subcategory.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(subcategory => {
            data = JSON.parse(JSON.stringify(subcategory));
            return data;
        })

        let afip = await db.Afip.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(afip => {
            data = JSON.parse(JSON.stringify(afip));
            return data;
        })

        let zoneDatabase = await db.Zones.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(zones => {
            data = JSON.parse(JSON.stringify(zones));
            return data;
        })

        let rollDatabase = await db.Roles.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(roles => {
            data = JSON.parse(JSON.stringify(roles));
            return data;
        })

        if(resultValidation.errors.length > 0) {
            if(req.file) {
                if(req.file.filename) {
                    if(req.file.filename != 'user_default.png') {
                        fs.unlinkSync(path.join(__dirname, '../../public/img/users/'+req.file.filename))
                    }
                }
            }

            let editUser = await db.Users.findOne({
                where: {
                    id: req.params.id,
                }
            })
            .then(user => {
                data = JSON.parse(JSON.stringify(user));
                return data;
            })
            console.log(editUser);


            return res.render('users/editUser', {
                categories,
                subCategories,
                afip,
                zoneDatabase,
                rollDatabase,
                user: editUser,
                nombrePagina: 'Actualizar usuario',
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let emailChange = false;
        let photoChange = false;
        let userAdmin = false;

        let usersEmail = await db.Users.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then(user => {
            data = JSON.parse(JSON.stringify(user));
            return data;
        })

        // Si cambio email
        if(usersEmail.email !== req.body.email){
            emailChange = true;
        }

        if(emailChange == true){
            let userInDB = await db.Users.findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then(user => {
                data = JSON.parse(JSON.stringify(user));
                return data;
            })
            console.log(userInDB);

            if(userInDB) {
                if(req.file) {
                    if(req.file.filename) {
                        if(req.file.filename != 'user_default.png') {
                            fs.unlinkSync(path.join(__dirname, '../../public/img/users/'+req.file.filename))
                        }
                    }
                }
                return res.render('users/editUser', {
                    categories,
                    subCategories,
                    afip,
                    zoneDatabase,
                    rollDatabase,
                    user: usersEmail,
                    nombrePagina: 'Actualizar usuario',
                    errors: {
                        email: {
                            msg: '(*) Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
        }

        // Si hay cambio de Foto
        if(req.file) {
            photoChange = true;
        }
        
        //Si el usuario logueado es administrador
        if(res.locals.userLogged.roll_user_id == 1){
            userAdmin = true;
        }

        let id = req.params.id

        let userToEdit = await db.Users.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then(user => {
            data = JSON.parse(JSON.stringify(user));
            return data;
        })
        
        let emailUserChange;

        // Si cambio email
        if(emailChange == true){
            emailUserChange = req.body.email;
        } else {
            emailUserChange = usersEmail.email;
        }

        let editPhoto;

        // Si hubo cambio de foto o no
        if(photoChange == true){
            editPhoto = req.file.filename;
            if(userToEdit.avatar != 'user_default.png') {
                fs.unlinkSync(path.join(__dirname, '../../public/img/users/'+userToEdit.avatar))
            }
            console.log("Cambio Photo ",editPhoto);
        } else {
            editPhoto = userToEdit.avatar;
            console.log("No cambio Photo ",editPhoto);
        }

        let rolChange;

        // Si el usuario es administrador
        if(userAdmin == true){
            rolChange = parseInt(req.body.roll_user);
        } else {
            rolChange = userToEdit.roll_user_id;
        }

        db.Users.update({
            fullName: req.body.fullName,
            dni_cuit: parseInt(req.body.dni_cuit),
            phone: parseInt(req.body.phone),
            email: req.body.email,
            invoice_type_id: parseInt(req.body.invoice_type_id),
            street: req.body.street,
            number: parseInt(req.body.number),
            floor: req.body.floor,
            flat: req.body.flat,
            zip: parseInt(req.body.zip),
            city: req.body.city,
            state_id: parseInt(req.body.state),
            avatar: editPhoto,
            roll_user_id: rolChange,
            reference: req.body.reference
        },
        {
            where: {id: req.params.id}
        })
        .then(()=> {
            return res.redirect('/users/profile/')})            
        .catch(error => res.send(error))

    },
    updatePass: async (req, res) => {
        const resultValidation = validationResult(req);
        let products = await db.Product.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(product => {
            data = JSON.parse(JSON.stringify(product));
            return data;
        })

        if(resultValidation.errors.length > 0) {

            return res.render('users/profile', {
                products: await db.Product.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                .then(product => {
                    data = JSON.parse(JSON.stringify(product));
                    return data;
                }),
                categories: await db.Category.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                .then(category => {
                    data = JSON.parse(JSON.stringify(category));
                    return data;
                }),
                subCategories: await db.Subcategory.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                .then(subcategory => {
                    data = JSON.parse(JSON.stringify(subcategory));
                    return data;
                }),
                zoneDatabase: await db.Zones.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                .then(zones => {
                    data = JSON.parse(JSON.stringify(zones));
                    return data;
                }),
                users: Users = await db.Users.findAll({
                    where: {
                        estado: 'A'
                    }
                })
                .then(user => {
                    data = JSON.parse(JSON.stringify(user));
                    return data;
                }),
                user: req.session.userLogged,
                totalProducts: products.length,
                nombrePagina: 'Perfil de Usuario',
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

         // Modificacion de contraseña cuando esta todo OK
        db.Users.update({
            password: bcryptjs.hashSync(req.body.password, 10),
        },
        {
            where: {id: req.params.id}
        })
        .then(()=> {
            return res.redirect('/users/profile/')})            
        .catch(error => res.send(error))

        return res.render('users/profile', {
            products: await db.Product.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(product => {
                data = JSON.parse(JSON.stringify(product));
                return data;
            }),
            categories: await db.Category.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(category => {
                data = JSON.parse(JSON.stringify(category));
                return data;
            }),
            subCategories: await db.Subcategory.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(subcategory => {
                data = JSON.parse(JSON.stringify(subcategory));
                return data;
            }),
            zoneDatabase: await db.Zones.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(zones => {
                data = JSON.parse(JSON.stringify(zones));
                return data;
            }),
            users: Users = await db.Users.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(user => {
                data = JSON.parse(JSON.stringify(user));
                return data;
            }),
            user: req.session.userLogged,
            totalProducts: products.length,
            nombrePagina: 'Perfil de Usuario'
        });
    },
    delete: (req, res) => {
        db.Users.update({
            estado: 'I'
        },
        {
            where: {id: req.params.id}
        })
        .then(()=> {
            return res.redirect('/users/profile/')})            
        .catch(error => res.send(error))
    },
    profile: async (req, res) => {
        let products = await db.Product.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(product => {
            data = JSON.parse(JSON.stringify(product));
            return data;
        })

        res.render('users/profile', {
            products: await db.Product.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(product => {
                data = JSON.parse(JSON.stringify(product));
                return data;
            }),
            categories: await db.Category.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(category => {
                data = JSON.parse(JSON.stringify(category));
                return data;
            }),
            subCategories: await db.Subcategory.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(subcategory => {
                data = JSON.parse(JSON.stringify(subcategory));
                return data;
            }),
            zoneDatabase: await db.Zones.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(zones => {
                data = JSON.parse(JSON.stringify(zones));
                return data;
            }),
            users: Users = await db.Users.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(user => {
                data = JSON.parse(JSON.stringify(user));
                return data;
            }),
            user: req.session.userLogged,
            totalProducts: products.length,
            nombrePagina: 'Perfil de Usuario'
        })
    },
    profileUsers: async (req, res) => {
        let products = await db.Product.findAll({
            where: {
                estado: 'A'
            }
        })
        .then(product => {
            data = JSON.parse(JSON.stringify(product));
            return data;
        })

        res.render('users/profile', {
            categories: await db.Category.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(category => {
                data = JSON.parse(JSON.stringify(category));
                return data;
            }),
            subCategories: await db.Subcategory.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(subcategory => {
                data = JSON.parse(JSON.stringify(subcategory));
                return data;
            }),
            zoneDatabase: await db.Zones.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(zones => {
                data = JSON.parse(JSON.stringify(zones));
                return data;
            }),
            users: Users = await db.Users.findAll({
                where: {
                    estado: 'A'
                }
            })
            .then(user => {
                data = JSON.parse(JSON.stringify(user));
                return data;
            }),
            user: Users = await db.Users.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                data = JSON.parse(JSON.stringify(user));
                return data;
            }),
            totalProducts: products.length,
            nombrePagina: 'Perfil de Usuario'
        })

    },
    logout: (req, res) => {
        res.clearCookie('userBrainstorming')
        req.session.destroy();
        return res.redirect('/home');
    }
}

module.exports = usersController