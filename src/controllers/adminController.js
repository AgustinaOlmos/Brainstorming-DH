// const products = [
//     {
//         id: 1,
//         title: 'ADUENTUS CABERNET FRANC',
//         price: 4000,
//         img: '/img/products/vino-aduentusCabernet.jpg',
//     },
//     {
//         id: 2,
//         title: 'ANTIGAL UNO MALBEC',
//         price: 1350,
//         img: '/img/products/vino-unoMalbec.jpg',
//     },
//     {
//         id: 3,
//         title: 'ANTIGAL UNO C.SAUVIGNON',
//         price: 1350,
//         img: '/img/products/vino-unoSaivignon.jpg',
//     },
//     {
//         id: 4,
//         title: 'MILESIMATTO CANEVARI',
//         price: 4250,
//         img: '/img/products/vino-canevariEspumante.jpg',
//     },
//     {
//         id: 5,
//         title: 'FIFTY POUNDS GYN',
//         price: 13000,
//         img: '/img/products/gin-fifty.jpg',
//     },
//     {
//         id: 6,
//         title: 'NORDÉS',
//         price: 7790,
//         img: '/img/products/gin-nordes.jpg',
//     },
//     {
//         id: 7,
//         title: 'DALMORE 15 AÑOS',
//         price: 36000,
//         img: '/img/products/whisky-damore.jpg',
//     },
//     {
//         id: 8,
//         title: 'THE GLENROTHES',
//         price: 34900,
//         img: '/img/products/whisky-glenrothes.jpg',
//     },
//     {
//         id: 9,
//         title: 'PALLINI LEMONCELLO',
//         price: 5750,
//         img: '/img/products/lemoncello-pallini.jpg',
//     }
// ]

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsFilePath2 = path.join(__dirname, '../data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(productsFilePath2, 'utf-8'));
const productsFilePath3 = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath3, 'utf-8'));

const adminController = {
    create: (req, res) => res.render('admin/formCreateProduct', {
        categories,
        subCategories,
        nombrePagina: 'Crear Producto'
    }),
    edit: (req, res) => {
        let product = products.find(product => product.id == req.params.productId)
        
        res.render('admin/formEditProduct', {
        product,
        categories,
        subCategories,
        nombrePagina: 'Editar Producto',
    })}
}

module.exports = adminController
