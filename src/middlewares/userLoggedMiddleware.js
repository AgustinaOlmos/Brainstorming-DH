//const User = require('../modelos/User');

/*==================================================
SEQUELIZE
==================================================*/

const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op

/*==================================================*/

async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

    let emailInCookie = req.cookies.userBrainstorming;
	//let userFromCookie = User.findByField('email', emailInCookie);
	let userFromCookie;

	if(emailInCookie) {
		userFromCookie = await db.Users.findOne({
			where: {
				email: emailInCookie,
			}
		})
		.then(user => {
			//console.log(user);
			data = JSON.parse(JSON.stringify(user));
			return data;
		})
	}

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;