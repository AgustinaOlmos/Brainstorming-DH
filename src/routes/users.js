const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Formulario de Login
router.get('/login', usersController.login)

//Procesar Form Login
router.post('/login', usersController.loginProcess)

//Formulario de Registro
router.get('/register', guestMiddleware, usersController.register);

//Procesar el Registro


// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);

// Logout

module.exports = router