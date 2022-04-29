import { ContenedorFirebase } from '../../classes/ContenedorFirebase.js';

export class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super();
    }

    async crearCarrito() {
        try {
            /*             const nuevoCarrito = new Carrito({});
            return await nuevoCarrito.save(); */
        } catch (error) {
            throw new Error(`Error en Save! ${error.message}`);
        }
    }

    async getPoductosEnCarrito(carritoId) {
        try {
            /*             const carritoEncontrado = await Carrito.findById(carritoId);
            return carritoEncontrado
                ? carritoEncontrado.productos
                : { msg: 'no se encontraron productos para el carrit' }; */
        } catch (error) {
            throw new Error(
                `Error en get productos en carrito! ${error.message}`
            );
        }
    }

    async saveProductosEnCarrito(idCarrito, idProducto) {
        try {
            /*             const carritoEncontrado = await Carrito.findById(idCarrito);
            const productoEncontrado = await super.getById(idProducto);
            carritoEncontrado.productos.push(productoEncontrado[0]);
            await carritoEncontrado.save(); */
        } catch (error) {
            throw new Error(
                `Error agregado producto al carrito! ${error.message}`
            );
        }
    }

    async deleteProducto(carritoId, productoId) {
        try {
            /*           const carritoEncontrado = await Carrito.findById(carritoId);
            const porductosRestantes = carritoEncontrado.productos.find(
                (producto) => producto._id != productoId
            );
            if (porductosRestantes) {
                carritoEncontrado.productos = porductosRestantes;
                await carritoEncontrado.save();
                return { msg: 'producto eliminado eliminado' };
            } else {
                return {
                    msg: 'No se encontraron productos en el carrito para eliminar',
                };
            } */
        } catch (error) {
            throw new Error(`Error en Delete producto by ID! ${error.message}`);
        }
    }
}
