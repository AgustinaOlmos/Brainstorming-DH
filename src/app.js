const express = require('express');
const path = require('path')
const app = express();
const mainRouter = require('./routes/main')
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const adminRouter = require('./routes/admin')


// Lecturas de bases de datos json para nevbar pagina no encontrada

const fs = require('fs');

const productsFilePath = path.join(__dirname, './data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsFilePath2 = path.join(__dirname, './data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(productsFilePath2, 'utf-8'));


// Establecer vistas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// Archivos Estaticos
app.use(express.static('public'));


// Routing
app.use('/', mainRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/admin', adminRouter)
app.use((req, res, next) => {
    res.status(404).render('not-found', { 
        categories,
        subCategories,
        nombrePagina: 'Pagina no encontrada'
    });
})


app.listen(3000, () => console.log("Levantando un servidor con Express en", "http://localhost:3000"))