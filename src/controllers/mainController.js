const mainController = {
    home: (req, res) => res.render('home',{
        nombrePagina: 'Home'
    }),
}

module.exports = mainController