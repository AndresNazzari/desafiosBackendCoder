const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messages = [
    { author: 'Juan', text: '¡Hola! ¿Que tal?' },
    { author: 'Pedro', text: '¡Muy bien! ¿Y vos?' },
    { author: 'Ana', text: '¡Genial!' },
];

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'));

// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

const server = httpServer.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    io.sockets.emit('messages', messages);

    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});
