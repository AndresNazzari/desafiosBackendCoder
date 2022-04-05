const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));


//Definir rutas
app.use('/api/productos', require('./routes/api/productos'));
app.use('/api/carrito', require('./routes/api/carrito'));

app.all('*', function (req, res) {
    res.send({ error : `ruta ${req.path} y método ${req.method} no definida` })
});

//ejemplo de producto
// {
//     "nombre": "Escuadra",
//     "descripcion": "Escuadra 1",
//     "codigo": 2323,
//     "precio": 9999999999,
//     "stock": 1,
//     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//     "id": "1",
//     "timestamp": 1649139685558
//   }

//ejemplo de carrito 
/* {"id":1, 
"timestamp":2232324, 
"productos": [{
        "nombre": "Escuadra",
         "descripcion": "Escuadra 1",
         "codigo": 2323,
         "precio": 9999999999,
         "stock": 1,
         "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
         "id": "1",
         "timestamp": 1649139685558
       },{
        "nombre": "Escuadra",
         "descripcion": "Escuadra 1",
         "codigo": 2323,
         "precio": 9999999999,
         "stock": 1,
         "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
         "id": "1",
         "timestamp": 1649139685558
       }]
}  */  