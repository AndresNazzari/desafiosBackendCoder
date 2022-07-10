const Carrito = require('../models/Carrito.model');

const saveCarrito = async (carrito) => {
    return await carrito.save();
};

const getCarritoByEmail = async (email) => {
    return await Carrito.find({ email: email }); //_id tiene que ser un Object id valido de mongo
};

const getCarritoById = async (carritoId) => {
    return await Carrito.findById({ _id: carritoId }); //_id tiene que ser un Object id valido de mongo
};

const deleteCarrito = async (carritoId) => {
    return await Carrito.findByIdAndRemove({ _id: carritoId });
};

module.exports = { saveCarrito, getCarritoByEmail, getCarritoById, deleteCarrito };
