const {
    getProductosService,
    getProductoService,
    postProductoService,
    putProductoService,
    deleteProductoService,
} = require('../services/productos.service');

const getProductosController = async (req, res) => {
    const productos = await getProductosService();
    res.json(productos);
};
const getProductoController = async (req, res) => {
    const id = req.params.id;
    const result = await getProductoService(id);
    result ? res.send(result) : res.send({ error: 'producto no encontrado' });
};

const postProductoController = async (req, res) => {
    const data = req.body;
    const producto = await postProductoService(data);
    res.send(producto);
};
const putProductoController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const response = await putProductoService(id, data);
    res.send(response);
};

const deleteProductoController = async (req, res) => {
    const response = await deleteProductoService(id);
    res.send(response);
};

module.exports = {
    getProductosController,
    getProductoController,
    postProductoController,
    putProductoController,
    deleteProductoController,
};
