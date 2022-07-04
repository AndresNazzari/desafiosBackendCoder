const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Config para que express reconozca el body de una solicitud post
// si no pongo esto no puede reconocer el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware de nivel de aplicacion
//La función se ejecuta cada vez que la aplicación recibe una solicitud.
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

//Definir rutas
app.use('/api/productos', require('./routes/api/productos'));

app.use('/static', express.static(__dirname + '/public'));
