const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('fullName')
        .notEmpty().withMessage('(*) Tienes que escribir un nombre completo').bail()
        .isLength({ min: 2}).withMessage('(*) Debe contener un mínimo de 2 carateres'),
  body('dni_cuit')
      .notEmpty().withMessage('(*) Tienes que escribir un DNI o CUIT').bail()
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
  body('avatar').custom((value, {req}) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.jpeg', '.png','.gif', '.bmp', '.tiff', '.psd'];
    if(file) {
        let fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
            throw new Error(`(*) Las extensiones de archivos permitidas son (${acceptedExtensions.join(', ')})`)
        }
    }

    return true;
  }),
	body('password')
		.notEmpty().withMessage('(*) Tienes que escribir una contraseña').bail()
    .isLength({ min: 8}).withMessage('(*) Debe contener un mínimo de 8 carateres')
    .custom((value, { req }) => {
      
      const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
      if (!regex.test(value) ) {
        throw new Error('(*) La contraseña debe tener al menos, una letra mayúscula, una minúscula, un número y un carácter especial');
      }
      console.log(regex.test(value));
      return true;
    }),
	body('repassword').custom((value, { req }) => {
		if (value !== req.body.password) {
		  throw new Error('(*) Las contraseñas no coinciden');
		}
    
		return true;
	})

]