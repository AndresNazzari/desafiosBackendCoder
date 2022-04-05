const express=require('express')
const Router = express.Router();
const file =process.cwd() + "/proyectoFinal/productos.txt"
const Productos = require("../../classes/productos")
const productos = new Productos(file)
const auth =require("../../middleware/auth")
 
//@route    GET /api/productos/
//@desc     devuelve todos los productos
//@access   Public
Router.get('/', async (req, res) => {
    const resultado = await productos.getAll()
    res.send(resultado)
})


//@route    GET /productos/:id
//@desc     devuelve un producto según su id
//@access   Public
Router.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await productos.getById(id)
    result?res.send(result):res.send({ error : 'producto no encontrado' })

})

//@route    POST /productos
//@desc     recibe y agrega un producto, y lo devuelve con su id asignado
//@access   Private
Router.post('/', auth,async (req, res) => {
    res.send(await productos.save(req.body))
})

//@route    PUT /api/productos/:id
//@desc     recibe y actualiza un producto según su id 
//@access   Private
Router.put('/:id', async (req, res) => {
    const id = req.params.id
    res.send(await productos.updateItem(id,req.body))
})


//@route    DELETE /api/productos/:id 
//@desc     elimina un producto según su id 
//@access   Private
Router.delete('/:id', auth,async (req, res) => {
    const id = req.params.id
    const result = await productos.deleteById(id)
    result?res.send(result):res.send({ error : 'producto no encontrado' })
})

module.exports = Router;