const products = [
    {
        id: 1,
        title: 'ADUENTUS CABERNET FRANC',
        price: 4000,
        img: '/img/products/vino-aduentusCabernet.jpg',
    },
    {
        id: 2,
        title: 'ANTIGAL UNO MALBEC',
        price: 1350,
        img: '/img/products/vino-unoMalbec.jpg',
    },
    {
        id: 3,
        title: 'ANTIGAL UNO C.SAUVIGNON',
        price: 1350,
        img: '/img/products/vino-unoSaivignon.jpg',
    },
    {
        id: 4,
        title: 'MILESIMATTO CANEVARI',
        price: 4250,
        img: '/img/products/vino-canevariEspumante.jpg',
    },
    {
        id: 5,
        title: 'FIFTY POUNDS GYN',
        price: 13000,
        img: '/img/products/gin-fifty.jpg',
    },
    {
        id: 6,
        title: 'NORDÉS',
        price: 7790,
        img: '/img/products/gin-nordes.jpg',
    },
    {
        id: 7,
        title: 'DALMORE 15 AÑOS',
        price: 36000,
        img: '/img/products/whisky-damore.jpg',
    },
    {
        id: 8,
        title: 'THE GLENROTHES',
        price: 34900,
        img: '/img/products/whisky-glenrothes.jpg',
    },
    {
        id: 9,
        title: 'PALLINI LEMONCELLO',
        price: 5750,
        img: '/img/products/lemoncello-pallini.jpg',
    }
]

const productsController = {
    all: (req, res) => res.render('products/allProducts', {
        products,
        nombrePagina: 'Productos'
    }),
    details: (req, res) => {
       let product = products.find(product => product.id == req.params.productId)
        res.render('products/productDetail', {
            product,
            nombrePagina: 'Detalles del Producto'
        })
    },
    shop: (req, res) => res.render('products/productCart',{
        nombrePagina: 'Compras'
    })
}

module.exports = productsController
