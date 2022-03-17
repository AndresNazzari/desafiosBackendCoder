const express=require('express')
const router = express.Router();

const ProductosAPI = require("../../ProductosAPI")
const productosAPI = new ProductosAPI()

//@route    GET /api/productos
//@desc     Get Welcome
//@access   Public
router.get('/', (req, res) => {
    res.send('<h1 style="color:blue">Bienvenidos al servidor express API PRODUCTOS</h1>')
})

//@route    GET /api/productos/
//@desc     devuelve todos los productos
//@access   Public
router.get('/', (req, res) => {
    const resultado = productosAPI.getAll()
    res.send(resultado)
})


//@route    GET /productos/:id
//@desc     devuelve un producto según su id
//@access   Public
router.get('/:id', (req, res) => {
    const id = req.params.id
    const result = productosAPI.getById(id)
    result?res.send(result):res.send({ error : 'producto no encontrado' })

})

//@route    GET /api/productos/random
//@desc     Get random product 
//@access   Public
router.get('/random', (req, res) => {
    const items = productosAPI.getAll()
    res.send(items[Math.floor(Math.random() * items.length)])
})

//@route    POST /productos
//@desc     recibe y agrega un producto, y lo devuelve con su id asignado
//@access   Public
router.post('/', (req, res) => {
    res.send(productosAPI.save(req.body))
})

//@route    PUT /api/productos/:id
//@desc     recibe y actualiza un producto según su id 
//@access   Public
router.put('/:id', (req, res) => {
    //resolver, falta definir la logiga dentro de update item
    const id = req.params.id
    res.send(productosAPI.updateItem(id,req.body))
    res.send('<h1 style="color:blue">recibe y actualiza un producto según su id </h1>')
})

//@route    DELETE /api/productos/:id 
//@desc     elimina un producto según su id 
//@access   Public
router.delete('/:id', (req, res) => {
    //resolver
    const id = req.params.id
    const result = productosAPI.deleteById(id)
    result?res.send(result):res.send({ error : 'producto no encontrado' })
})

module.exports = router;