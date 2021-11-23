const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar login
router.post('/login', usersController.loginProcess);

// Editar usuarios
router.get('/editUser/:id/', authMiddleware, usersController.editUser);
router.put('/editUser/:id', uploadFile.single('avatar'), validations, usersController.updateUser);

// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);
router.get('/profileUsers/:id/', authMiddleware, usersController.profileUsers);

// Logout
router.get('/logout', usersController.logout);

module.exports = router