const {
    postCarritoService,
    getCarritoByIdService,
    getCarritoByEmailService,
    postProductoCarritoService,
    deleteProductoCarritoService,
    deleteCarritoService,
} = require('../services/carritos.service');

const postCarritoController = async (req, res) => {
    const email = req.session.passport.user;
    const carrito = await postCarritoService(email);
    res.send(carrito);
};

const getCarritoController = async (req, res) => {
    const carritoId = req.params.id;
    const carrito = await getCarritoByIdService(carritoId);
    console.log(carrito);
    res.send(carrito);
};

const postProductoCarritoController = async (req, res) => {
    const carritoId = req.params.id;
    const productoId = req.body.id;
    const response = await postProductoCarritoService(carritoId, productoId);
    res.send(response);
};

const deleteProductoCarritoController = async (req, res) => {
    const carritoId = req.params.id;
    const productoId = req.params.id;
    const response = await deleteProductoCarritoService(carritoId, productoId);
    res.send(response);
};

const deleteCarritoController = async (req, res) => {
    const carritoId = req.params.id;
    const response = await deleteCarritoService(carritoId);
    res.send(response);
};

module.exports = {
    postCarritoController,
    getCarritoController,
    postProductoCarritoController,
    deleteProductoCarritoController,
    deleteCarritoController,
};
