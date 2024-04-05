const db = require('../../database/models')
const Op = db.Sequelize.Op

const apiUsersController = {
    all: (req, res) => {
        db.Users.findAll({ where: {estado: 'A'}})
        .then(usersDb => {
            let newUsers = usersDb.map((user) => user.dataValues)

            // Eliminar datos sensibles
            newUsers.forEach((user) => {
                delete user.dni_cuit;
                delete user.phone;
                delete user.invoice_type_id;
                delete user.street;
                delete user.number;
                delete user.floor;
                delete user.flat;
                delete user.zip;
                delete user.city;
                delete user.state_id;
                delete user.password;
                delete user.avatar;
                delete user.roll_user_id;
                delete user.reference;
                delete user.estado;
                user.detailUrl = `http://localhost:4000/api/user/${user.id}`
            })

            return res.status(200).json({
                total: usersDb.length,
                data: newUsers,
                status: 200
            })
        })
        .catch(error => console.log(error));
    },
    details: (req, res) => {
        db.Users.findByPk(req.params.id, {
            include: ['roles', 'afip', 'zones']
        })
        .then(user => {
            let newUser = JSON.parse(JSON.stringify(user))
            delete newUser.password;
            delete newUser.invoice_type_id;
            delete newUser.state_id;
            delete newUser.roll_user_id;
            delete newUser.roles.id;
            delete newUser.roles.estado;
            delete newUser.afip.id;
            delete newUser.afip.estado;
            delete newUser.zones.id;
            delete newUser.zones.estado;

            let respuesta = {
                meta: {
                    status: 200,
                    urlImage: `public/img/users/${user.avatar}`
                },
                data: newUser
            }
            res.status(200).json(respuesta);
        })
    },
    email: (req, res) => {
        db.Users.findOne(
            {
                raw: true,
                attributes: ['fullName', 'avatar'],
                where: {
                    email: req.params.email,
                    estado: 'A'
                }
            }
        )
            .then(user => {
                let newUser = JSON.parse(JSON.stringify(user))
                let respuesta = {
                    fullName: newUser.fullName,
                    avatar: newUser.avatar
                }
                res.status(200).json(respuesta);
            })
    }
}

module.exports = apiUsersController
