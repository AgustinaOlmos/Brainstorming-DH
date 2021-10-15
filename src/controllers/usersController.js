const usersController = {
    login: (req, res) => res.render('users/login', {
        nombrePagina: 'Inicio de Sesion'
    }),
    register: (req, res) => res.render('users/register', {
        nombrePagina: 'Registro'
    }),
    profile: (req, res) => res.render('users/profile', {
        nombrePagina: 'Perfil de Usuario'
    })
}

module.exports = usersController