const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const handlebars = require('express-handlebars');
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

app.get('/', (req, res) => {
    res.render('productos');
});

io.on('connection', async (socket) => {
    console.log('Usuario conectado');
    const productosCargados = { productos: await productosAPI.getAll() };
    productosCargados.productos.length > 0 &&
        io.sockets.emit('productos', productosCargados);

    const messagesCargados = { messages: await messagesAPI.getAll() };
    console.log(messagesCargados);
    messagesCargados.messages.length > 0 &&
        io.sockets.emit('messages', messagesCargados);

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
