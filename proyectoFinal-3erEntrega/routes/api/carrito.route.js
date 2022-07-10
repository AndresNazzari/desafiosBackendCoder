const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/auth.middleware.js');
const {
    postCarritoController,
    getCarritoController,
    postProductoCarritoController,
    deleteProductoCarritoController,
    deleteCarritoController,
} = require('../../controllers/carritos.controller.js');

//@route    POST /api/carrito/
//@desc     Crea un carrito si no existe y devuelve (exista o no)
//@access   Private
router.get('/', isAuth, postCarritoController);

//@route    GET /api/carrito/
//@desc     Devuelve el array de los productos guardados en el carrito
//@access   Private
router.get('/:id/productos', isAuth, getCarritoController);

//@route    POST /api/carrito/
//@desc     Para incorporar productos al carrito por su id de producto
//@access   Private
router.post('/:id/productos', isAuth, postProductoCarritoController);

//@route    DELETE /api/carrito/
//@desc     Eliminar un producto del carrito por su id de carrito y de producto
//@access   Private
router.delete('/:id/productos/:id_prod', isAuth, deleteProductoCarritoController);

//@route    DELETE /api/carrito/
//@desc     Vacía un carrito y lo elimina.
//@access   Private
router.delete('/:id', isAuth, deleteCarritoController);

module.exports = router;
