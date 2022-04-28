import express from 'express';
import auth from '../../middleware/auth.js';
import { productosApi } from '../../daos/index.js';

const Router = express.Router();

//@route    GET /api/productos/
//@desc     devuelve todos los productos
//@access   Public
Router.get('/', async (req, res) => {
    const resultado = await productosApi.getAll();
    res.send(resultado);
});

//@route    GET /productos/:id
//@desc     devuelve un producto según su id
//@access   Public
Router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await productosApi.getById(id);
    result ? res.send(result) : res.send({ error: 'producto no encontrado' });
});

//@route    POST /productos
//@desc     recibe y agrega un producto, y lo devuelve con su id asignado
//@access   Private
Router.post('/', auth, async (req, res) => {
    res.send(await productosApi.save(req.body));
});

//@route    PUT /api/productos/:id
//@desc     recibe y actualiza un producto según su id
//@access   Private
Router.put('/:id', async (req, res) => {
    const id = req.params.id;
    res.send(await productosApi.updateItem(id, req.body));
});

//@route    DELETE /api/productos/:id
//@desc     elimina un producto según su id
//@access   Private
Router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const result = await productosApi.deleteById(id);
    result ? res.send(result) : res.send({ error: 'producto no encontrado' });
});

export { Router };
