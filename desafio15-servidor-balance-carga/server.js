const express = require('express');
require('dotenv').config({ path: './.env' });
const handlebars = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const auth = require('./middleware/auth.js');
const connectDB = require('./config/db.js');
const User = require('./models/User.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const file = process.cwd() + '/productos.txt';
const ProductosAPI = require('./ProductosAPI');
const productosAPI = new ProductosAPI(file);

const messagesFile = process.cwd() + '/messages.txt';
const MessagesAPI = require('./MessagesAPI');
const { Passport } = require('passport');
const messagesAPI = new MessagesAPI(messagesFile);

// Config para que express reconozca el body de una solicitud post
// si no pongo esto no puede reconocer el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*============================[Base de Datos]============================*/
connectDB();

/*============================[Middlewares]============================*/
/* functions */
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}
/*----------- Passport -----------*/
passport.use(
    new LocalStrategy(async (username, password, done) => {
        //Logica para validar si un usuario existe
        const user = await User.findOne({ username });

        if (!user) {
            console.log('Usuario no encontrado');
            return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Contrasenia INCORRECTA');
            return done(null, false);
        }
        console.log('Contrasenia Correcta');

        return done(null, user);
    })
);

passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser(async (username, done) => {
    const user = await User.findOne({ username });
    done(null, user);
});

/*----------- Session -----------*/
//Config de cookies y session pára mongo atlas
const advancedMongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
app.use(cookieParser());
app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
                'mongodb+srv://admin:admin@cluster0.jlce7.mongodb.net/sessions?retryWrites=true&w=majority',
            ttl: 600, // valor ttl del store de mongo que en este caso serían 600 segundos ( un minuto ). Lo que ofrece el ttl es que en cada interacción del usuario este tiempo máximo se recarga, ( Vuelve a 600 ).
            mongoOptions: advancedMongoOptions,
        }),
        secret: 'keyboardCat',
        resave: false,
        rolling: null,
        saveUninitialized: false,
        maxAge: null, //el atributo maxAge de cookie ( esta vez sí en milisegundos) y además utilizando el valor rolling de sesiones en true, gracias a rolling cada vez que se realiza una interacción del usuario al servidor va a renovar el tiempo de expiración de la cookie.
    })
);

app.use(passport.initialize());
app.use(passport.session());

/*----------- Motor de plantillas -----------*/
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutDir: __dirname + '/views/layouts',
        partialDir: __dirname + '/views/partials',
    })
);
app.set('view engine', 'hbs');
app.set('views', './views');

/*============================[Rutas]============================*/
app.use('/api/info', require('./routes/api/info.route.js'));
app.use('/api/randoms', require('./routes/api/randoms.route.js'));

app.get('/productos', isAuth, (req, res) => {
    res.render('productos', { username: req.session.passport.user });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/login-error', (req, res) => {
    res.render('login-error');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/register-error', (req, res) => {
    res.render('register-error');
});

app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/productos',
        failureRedirect: '/login-error',
    })
);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });

        if (user) {
            res.redirect('/register-error');
        } else {
            user = new User({
                username,
                password,
            });

            //Encrypt password

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.redirect('/productos');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

app.post('/logout', (req, res) => {
    res.render('logout', { userName: req.session.userName });
    req.session.destroy();
});

app.use(express.static(__dirname + '/public'));

/*============================[Websokets]============================*/
io.on('connection', async (socket) => {
    console.log('Usuario conectado');
    const productosCargados = { productos: await productosAPI.getAll() };
    productosCargados.productos.length > 0 &&
        socket.emit('productos', productosCargados);

    const messagesCargados = { messages: await messagesAPI.getAll() };
    messagesCargados.messages.length > 0 &&
        socket.emit('messages', messagesCargados);

    socket.on('addItem', async (data) => {
        //grabar item en archivo
        const a = await productosAPI.save(data);
        //hacer io.sockets.emit con todos los productos
        const resultado = { productos: await productosAPI.getAll() };
        io.sockets.emit('productos', resultado);
    });

    socket.on('newMessage', async (data) => {
        //grabar item en archivo
        const a = await messagesAPI.save(data);
        //hacer io.sockets.emit con todos los productos
        const resultado = { messages: await messagesAPI.getAll() };
        io.sockets.emit('messages', resultado);
    });
});

/*============================[Servidor]============================*/
const PORT = process.argv[2] || process.env.PORT || 3000;

const server = httpServer.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
