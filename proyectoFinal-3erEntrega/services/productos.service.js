const { getAllProductos, getProducto, saveProducto, updateProducto, deleteProducto } = require('../daos/producto.dao');
const Product = require('../models/Product.model.js');

const getProductosService = async () => {
    try {
        return await getAllProductos();
    } catch (error) {
        throw new Error(`Error en Get Productos! ${error.message}`);
    }
};

const getProductoService = async (id) => {
    try {
        return await getProducto(id);
    } catch (error) {
        throw new Error(`Error en Get Producto! ${error.message}`);
    }
};
const postProductoService = async (producto) => {
    const nuevoProducto = new Product({ ...producto });

    try {
        return await saveProducto(nuevoProducto);
    } catch (error) {
        throw new Error(`Error en Save Producto! ${error.message}`);
    }
};
const putProductoService = async (id, producto) => {
    try {
        return await updateProducto(id, producto);
    } catch (error) {
        throw new Error(`Error en Update! ${error.message}`);
    }
};
const deleteProductoService = async (id) => {
    try {
        await deleteProducto(id);
        return { msg: 'producto actualizado' };
    } catch (error) {
        throw new Error(`Error en Delete! ${error.message}`);
    }
};

module.exports = {
    getProductosService,
    getProductoService,
    postProductoService,
    putProductoService,
    deleteProductoService,
};
