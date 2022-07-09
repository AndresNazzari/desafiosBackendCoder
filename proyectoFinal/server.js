import express from 'express';
import { Router as carritoRouter } from './routes/api/carrito.js';
import { Router as productosRouter } from './routes/api/productos.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

//Definir rutas
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

app.all('*', function (req, res) {
    res.send({ error: `ruta ${req.path} y método ${req.method} no definida` });
});
