import ContenedorFs from '../../classes/contenedorFs.js';
import fs from 'fs';

export default class CarritosDaoFs extends ContenedorFs {
    constructor(file) {
        super(file);
    }
    async crearCarrito() {
        try {
            const carritos = await super.getAll();
            let id;
            if (carritos.length > 0) {
                id = carritos[carritos.length - 1].id + 1;
            } else {
                id = 1;
            }
            const newCarrito = { id, timestamp: Date.now(), productos: [] };
            carritos.push(newCarrito);
            await fs.promises.writeFile(
                this.file,
                JSON.stringify(carritos, null, 2)
            );
            return newCarrito;
        } catch (error) {
            throw new Error(`Error en Save! ${error.message}`);
        }
    }

    async getPoductosEnCarrito(carritoId) {
        try {
            const carritos = await super.getAll();
            const carrito = carritos.filter((carrito) => {
                return carrito.id == carritoId;
            });
            if (carrito.length > 0) {
                return carrito[0].productos;
            } else {
                return { msg: 'carrito no encontrado' };
            }
        } catch (error) {
            throw new Error(`Error en Delete by ID! ${error.message}`);
        }
    }

    async saveProductosEnCarrito(carritoId, producto) {
        const carritos = await super.getAll();
        const index = carritos.findIndex((carrito) => carrito.id == carritoId);
        carritos[index].productos.push(producto);
        try {
            await fs.promises.writeFile(
                super.file,
                JSON.stringify(carritos, null, 2)
            );
            return { msg: 'producto agregado al carrito' };
        } catch (error) {
            throw new Error(
                `Error agregado producto al carrito! ${error.message}`
            );
        }
    }

    async deleteProducto(carritoId, productoId) {
        const carritos = await super.getAll();
        const carritoIndex = carritos.findIndex(
            (carrito) => carrito.id == carritoId
        );
        const productoIndex = carritos[carritoIndex].productos.findIndex(
            (producto) => producto.id == productoId
        );
        carritos[carritoIndex].productos.splice(productoIndex, 1);
        try {
            fs.writeFileSync(super.file, JSON.stringify(carritos, null, 2));
            return { msg: 'producto eliminado eliminado' };
        } catch (error) {
            throw new Error(`Error en Delete producto by ID! ${error.message}`);
        }
    }
}
