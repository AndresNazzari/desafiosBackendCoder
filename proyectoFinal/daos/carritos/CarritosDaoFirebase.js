import { ContenedorFirebase } from '../../classes/ContenedorFirebase.js';

export class CarritosDaoFirebase extends ContenedorFirebase {
    constructor(collection) {
        super(collection);
    }

    async crearCarrito() {
        try {
            const carrito = await this.query
                .doc()
                .create({ timestamp: new Date(), productos: [] });
            return { msg: 'carrito creado' };
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
            /*   const productoAgregar = await this.db
                .collection('productos')
                .doc(idProducto)
                .get();

            const snap = await this.query.doc(idCarrito).get();
            const ref = await snap.push(productoAgregar.data());

            return ref; */
            /* { msg: 'producto actualizado' }; */
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
