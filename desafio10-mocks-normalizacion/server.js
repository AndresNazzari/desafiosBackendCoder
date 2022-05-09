const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const handlebars = require('express-handlebars');
const PORT = process.env.PORT || 8080;
const { faker } = require('@faker-js/faker');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const createTable = require('./create_table.js');
const optionsMariaDB = require('./options/mariaDB.js');
const optionsSqlite3 = require('./options/sqlite3.js');
createTable(optionsMariaDB, optionsSqlite3);

const ProductosAPI = require('./ProductosAPI');
const productosAPI = new ProductosAPI(optionsMariaDB, 'productos');

const messagesFile =
    process.cwd() + '/desafio10-mocks-normalizacion/messages.txt';
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
app.set('views', __dirname + '/views');

const server = httpServer.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

app.get('/api/productos-test', (req, res) => {
    res.render('productos');
});

io.on('connection', async (socket) => {
    console.log('Usuario conectado');
    const productosCargados = [];
    for (let i = 0; i < 6; i++) {
        const producto = {
            price: faker.commerce.price(),
            title: faker.commerce.product(),
            thumbnail: faker.image.imageUrl(),
        };
        productosCargados.push(producto);
    }
    /* const productosCargados ={ productos: await productosAPI.getAll() }; */

    productosCargados.length > 0 && socket.emit('productos', productosCargados);

    socket.on('addItem', async (data) => {
        //grabar item en archivo
        await productosAPI.save(data);
        //hacer io.sockets.emit con todos los productos
        const resultado = { productos: await productosAPI.getAll() };
        io.sockets.emit('productos', resultado);
    });

    const messagesCargados = { messages: await messagesAPI.getAll() };
    messagesCargados.messages.length > 0 &&
        io.sockets.emit('messages', messagesCargados);

    socket.on('newMessage', async (data) => {
        //grabar item en archivo
        await messagesAPI.save(data);
        //hacer io.sockets.emit con todos los productos
        const resultado = { messages: await messagesAPI.getAll() };
        io.sockets.emit('messages', resultado);
    });
});

app.use(express.static(__dirname + '/public'));
