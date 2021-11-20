const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Formulario de Login
router.get('/login', usersController.login)

//Procesar Form Login
router.post('/login', usersController.loginProcess)

//Formulario de Registro
router.get('/register', usersController.register)

//Procesar el Registro


// Perfil de Usuario
router.get('/profile', usersController.profile)

// Logout

module.exports = router