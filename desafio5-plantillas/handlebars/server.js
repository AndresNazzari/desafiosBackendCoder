const express = require('express')
const app = express()
const handlebars = require("express-handlebars")
const PORT = process.env.PORT || 8080

const ProductosAPI = require("./ProductosAPI")
const productosAPI = new ProductosAPI()

// Config para que express reconozca el body de una solicitud post
// si no pongo esto no puede reconocer el req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Middleware de nivel de aplicacion
//La función se ejecuta cada vez que la aplicación recibe una solicitud.
// app.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// });

//Configuracion de Handlebars
app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutDir: __dirname + "/views/layouts",
    partialDir: __dirname+ "/views/partials"
}))
app.set("view engine", "hbs")
app.set("views", "./views")



const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

//Definir rutas 
// app.use('/api/productos', require('./routes/api/productos'))

app.get('/productos', (req, res) => {
    const resultado = {productos: productosAPI.getAll()}
    resultado.productos.length > 0 ?
        res.render("productos", resultado) :
        res.render("productos", { msg: "No hay productos" })
})

app.post('/productos', (req, res) => {
    productosAPI.save(req.body)
    res.redirect("/productos")
})


app.use(/* "/static",  */express.static(__dirname + "/public"))