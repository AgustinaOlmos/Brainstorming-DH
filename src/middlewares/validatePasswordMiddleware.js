const { body } = require('express-validator');

module.exports = [
    body('password')
		.notEmpty().withMessage('(*) Tienes que escribir una contraseña').bail()
    .isLength({ min: 8}).withMessage('(*) Debe contener un mínimo de 8 carateres')
    .custom((value, { req }) => {
      
      const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
      if (!regex.test(value) ) {
        throw new Error('(*) La contraseña debe tener al menos, una letra mayúscula, una minúscula, un número y un carácter especial');
      }
      return true;
    }),
	body('password2').custom((value, { req }) => {
		if (value !== req.body.password) {
		  throw new Error('(*) Las contraseñas no coinciden');
		}
		return true;
	})

]