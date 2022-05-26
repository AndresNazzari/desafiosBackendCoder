const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const auth = require('./middleware/auth');
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const file = process.cwd() + '/productos.txt';
const ProductosAPI = require('./ProductosAPI');
const productosAPI = new ProductosAPI(file);

const messagesFile = process.cwd() + '/messages.txt';
const MessagesAPI = require('./MessagesAPI');
const messagesAPI = new MessagesAPI(messagesFile);

// Config para que express reconozca el body de una solicitud post
// si no pongo esto no puede reconocer el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
//Configuracion de Handlebars
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

const server = httpServer.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

app.get('/productos', auth, (req, res) => {
    res.render('productos', { userName: req.session.userName });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { name } = req.body;
    req.session.userName = name;
    res.redirect('/productos');
});

app.post('/logout', (req, res) => {
    res.render('logout', { userName: req.session.userName });
    req.session.destroy();
});

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

app.use(express.static(__dirname + '/public'));
