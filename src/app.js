const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const app = express();

// Configuracion de Session
app.use(session({
    secret: 'Brainstorming-Secret',
    resave: false,
    saveUninitialized: false
}));

//Middleware de aplicacion para el menu de navegacion
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(cookies());
app.use(userLoggedMiddleware);

// Archivos Estaticos
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));

// Para capturar y configurar la informacion que viene por post -- Form->Obj Literal->Json
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Para los métodos PUT y DELETE
app.use(methodOverride('_method'))

// Establecer vistas
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// Routing
const mainRouter = require('./routes/main')
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const adminRouter = require('./routes/admin')

app.use('/', mainRouter)
app.use('/home', mainRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/admin', adminRouter)

// Lecturas de bases de datos json para navbar pagina no encontrada
const fs = require('fs');
const productsFilePath = path.join(__dirname, './data/productsCategory.json');
const categories = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsFilePath2 = path.join(__dirname, './data/productsSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(productsFilePath2, 'utf-8'));

app.use((req, res, next) => {
    res.status(404).render('not-found', { 
        categories,
        subCategories,
        nombrePagina: 'Pagina no encontrada'
    });
})


app.listen(3000, () => console.log("Levantando un servidor con Express en", "http://localhost:3000"))