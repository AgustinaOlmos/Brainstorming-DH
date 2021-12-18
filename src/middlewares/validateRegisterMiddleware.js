const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('fullName')
        .notEmpty().withMessage('(*) Tienes que escribir un nombre completo').bail()
        .isLength({ min: 4}).withMessage('(*) Debe contener un mínimo de 4 carateres'),
  body('dni_cuit')
      .notEmpty().withMessage('(*) Tienes que escribir un DNI o CUIT').bail()
      .isNumeric().withMessage('(*) Debe contener solo números').bail()
      .isLength({ min: 7, max: 11 }).withMessage('(*) Debe contener un mínimo de 7  y un máximo se 11 caracteres numéricos') ,
  body('phone')
      .notEmpty().withMessage('(*) Tienes que escribir un teléfono').bail()
      .isLength({ min: 7, max: 13 }).withMessage('(*) Debe contener un mínimo de 7 y un máximo de 13 carateres'),
	body('email')
		.notEmpty().withMessage('(*) Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('(*) Debes escribir un formato de correo válido'),
  body('invoice_type_id').notEmpty().withMessage('(*) Por favor seleccione una categoria tributaria'),
  body('street').notEmpty().withMessage('(*) Tienes que ingresar una calle'),
  body('number').notEmpty().withMessage('(*) Tienes que ingresar un numero'),
  body('zip').notEmpty().withMessage('(*) Tienes que ingresar un código Postal'),
  body('city').notEmpty().withMessage('(*) Tienes que ingresar una localidad'),
  body('state').notEmpty().withMessage('(*) Tienes que seleccionar una ciudad'),
	body('password')
		.notEmpty().withMessage('(*) Tienes que escribir una contraseña'),
	body('repassword').custom((value, { req }) => {
		if (value !== req.body.password) {
		  throw new Error('(*) Las contraseñas no coinciden');
		}
		return true;
	})

]