import express from 'express';
import { carritosApi, productosApi } from '../../daos/index.js';

const Router = express.Router();

//@route    GET /api/carrito/
//@desc     Me permite listar todos los productos guardados en el carrito
//@access   Public
Router.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    res.send(await carritosApi.getPoductosEnCarrito(id));
});

//@route    POST /api/carrito/
//@desc     Crea un carrito y devuelve su id
//@access   Public
Router.post('/', async (req, res) => {
    res.send(await carritosApi.crearCarrito());
});

//@route    POST /api/carrito/
//@desc     Para incorporar productos al carrito por su id de producto
//@access   Public
Router.post('/:id/productos', async (req, res) => {
    const id = req.params.id;
    const producto = productosApi.getById(req.body.id);
    res.send(await carritosApi.saveProductosEnCarrito(id, producto));
});

//@route    DELETE /api/carrito/
//@desc     Vacía un carrito y lo elimina.
//@access   Public
Router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await carritosApi.deleteCarritoById(id);
    result
        ? res.send(resultcarritosApi)
        : res.send({ error: 'carrito no encontrado' });
});

//@route    DELETE /api/carrito/
//@desc     Eliminar un producto del carrito por su id de carrito y de producto
//@access   Public
Router.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id;
    const prodId = req.params.id_prod;
    const result = await carritosApi.deleteProducto(id, prodId);
    result ? res.send(result) : res.send({ error: 'producto no encontrado' });
});

export { Router };
