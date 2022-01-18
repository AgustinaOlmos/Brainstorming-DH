const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const app = express();
const db = require('./database/models')

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

// Routing Api
const productsApiRoutes = require('./routes/api/apiProducts')
const usersApiRoutes = require('./routes/api/apiUsers')


// Routing
app.use('/', mainRouter)
app.use('/home', mainRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/admin', adminRouter)

// Routing Api
app.use('/api', productsApiRoutes);
app.use('/api', usersApiRoutes);

// Lecturas de bases de datos para navbar pagina no encontrada
app.use ( async (req, res, next) => {
    res.status(404).render('not-found', { 
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
        nombrePagina: 'Pagina no encontrada'
    });
})


app.listen(4000, () => console.log("Levantando un servidor con Express en", "http://localhost:4000"))