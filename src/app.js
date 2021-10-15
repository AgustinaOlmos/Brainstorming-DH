const express = require('express');
const path = require('path')
const app = express();
const mainRouter = require('./routes/main')
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')

// Establecer vistas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// Archivos Estaticos
app.use(express.static('public'));


// Routing
app.use('/', mainRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)


app.listen(3000, () => console.log("Levantando un servidor con Express en", "http://localhost:3000"))