const Carrito = require('../models/Carrito.model');
const { saveCarrito, getCarritoByEmail, getCarritoById, deleteCarrito } = require('../daos/carrito.dao');

const { getProductoService } = require('../services/productos.service');

const postCarritoService = async (email) => {
    try {
        const carritoEncontrado = await getCarritoByEmail(email);

        if (carritoEncontrado.length > 0) {
            return carritoEncontrado;
        } else {
            const nuevoCarrito = new Carrito({ email });
            return await saveCarrito(nuevoCarrito);
        }
    } catch (error) {
        throw new Error(`Error en Creacion de carrito! ${error.message}`);
    }
};

const getCarritoByIdService = async (carritoId) => {
    try {
        const carritoEncontrado = await getCarritoById(carritoId);
        return carritoEncontrado ? carritoEncontrado : { msg: 'No se encontraron productos para el carrito' };
    } catch (error) {
        throw new Error(`Error en obtencion de carrito! ${error.message}`);
    }
};

const getCarritoByEmailService = async (email) => {
    try {
        const carritoEncontrado = await getCarritoByEmail(email);
        return carritoEncontrado ? carritoEncontrado : { msg: 'No se encontraron productos para el carrito' };
    } catch (error) {
        throw new Error(`Error en obtencion de carrito! ${error.message}`);
    }
};
const postProductoCarritoService = async (carritoId, productoId) => {
    try {
        const carrito = await getCarritoById(carritoId);
        const producto = await getProductoService(productoId);

        if (carrito) {
            const productoEncontrado = carrito.items.find((item) => item.id === productoId);
            if (productoEncontrado) {
                productoEncontrado.cantidad += 1;
            } else {
                carrito.items.push({ ...producto, cantidad: 1 });
            }
            return await saveCarrito(carrito);
        } else {
            return { msg: 'No se encontro el carrito' };
        }
    } catch (error) {
        throw new Error(`Error en agregacion de producto al carrito! ${error.message}`);
    }
};

const deleteProductoCarritoService = async (carritoId, productoId) => {
    try {
        const carrito = await getCarritoById(carritoId);

        if (carrito) {
            carrito.items = carrito.items.filter((item) => item.id !== productoId);
            return await saveCarrito(carrito);
        } else {
            return { msg: 'No se encontro el carrito' };
        }
    } catch (error) {
        throw new Error(`Error en eliminacion de producto del carrito! ${error.message}`);
    }
};

const deleteCarritoService = async (carritoId) => {
    try {
        await deleteCarrito(carritoId);
        return { msg: 'Carrito vaciado correctamente' };
    } catch (error) {
        throw new Error(`Error en vaciado de carrito! ${error.message}`);
    }
};

module.exports = {
    postCarritoService,
    getCarritoByIdService,
    getCarritoByEmailService,
    postProductoCarritoService,
    deleteProductoCarritoService,
    deleteCarritoService,
};
