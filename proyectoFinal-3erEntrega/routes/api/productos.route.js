const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/auth.middleware.js');
const {
    getProductosController,
    getProductoController,
    postProductoController,
    putProductoController,
    deleteProductoController,
} = require('../../controllers/productos.controller.js');

//@route    GET /api/productos/
//@desc     devuelve todos los productos
//@access   Private
router.get('/', isAuth, getProductosController);

//@route    GET /productos/:id
//@desc     devuelve un producto según su id
//@access   Private
router.get('/:id', isAuth, getProductoController);

//@route    POST /api/productos/
//@desc     recibe y agrega un producto, y lo devuelve con su id asignado
//@access   Private
router.post('/', isAuth, postProductoController);

//@route    PUT /api/productos/:id
//@desc     recibe y actualiza un producto según su id
//@access   Private
router.put('/:id', isAuth, putProductoController);

//@route    DELETE /api/productos/:id
//@desc     elimina un producto según su id
//@access   Private
router.delete('/:id', isAuth, deleteProductoController);

module.exports = router;
