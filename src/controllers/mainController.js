const db = require('../database/models')

const mainController = {
    loading: (req, res) => res.render('loading'),

    home: async (req, res) => res.render('home', {
        categories: await db.Category.findAll({
            where: {
                estado: 'A'
            }
        })
            .then(category => {
                data = JSON.parse(JSON.stringify(category));
                return data;
            }),
        subCategories: await db.Subcategory.findAll({
            where: {
                estado: 'A'
            }
        })
            .then(subcategory => {
                data = JSON.parse(JSON.stringify(subcategory));
                return data;
            }),
        nombrePagina: 'Home'
    })
}

module.exports = mainController