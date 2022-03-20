const express = require('express')
const app = express()
const ejs = require("ejs")
const PORT = process.env.PORT || 8080

const ProductosAPI = require("./ProductosAPI")
const productosAPI = new ProductosAPI()

// Config para que express reconozca el body de una solicitud post
// si no pongo esto no puede reconocer el req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")
app.set("views", "./views")



const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

//Definir rutas 
// app.use('/api/productos', require('./routes/api/productos'))

app.get('/productos', (req, res) => {
    const productos = productosAPI.getAll()
    productos.length > 0 ?
        res.render("productos", {productos}) :
        res.render("productos", { msg: "No hay productos" })
})

app.post('/productos', (req, res) => {
    productosAPI.save(req.body)
    res.redirect("/productos")
})


app.use(/* "/static",  */express.static(__dirname + "/public"))