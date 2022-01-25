const express = require('express')
const router = express.Router()

const apiUsersController = require('../../controllers/api/apiUsersController')

//Todos los Usuarios
router.get('/users/all', apiUsersController.all)
//Usuarios por Id
router.get('/user/:id/', apiUsersController.details)
// Usuario por email
router.get('/userEmail/:email/', apiUsersController.email)

module.exports = router
