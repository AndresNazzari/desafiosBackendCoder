const Product = require('../models/Product.model.js');

const getAllProductos = async () => {
    return await Product.find({});
};

const getProducto = async (id) => {
    return await Product.findOne({ id: id });
};

const saveProducto = async (producto) => {
    return await producto.save();
};

const updateProducto = async (id, producto) => {
    return await Product.findByIdAndUpdate(id, producto);
};

const deleteProducto = async (id) => {
    return { msg: 'DESARROLLAR ESTA FUNCIONALIDAD' };
};

module.exports = { getAllProductos, getProducto, saveProducto, updateProducto, deleteProducto };
