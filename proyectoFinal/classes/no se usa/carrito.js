import fs from 'fs';

export default class Carrito {
    constructor(file) {
        this.file = file;
    }

    async crearCarrito() {
        try {
            const carritos = await this.getAllCarritos();
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
            const carritos = await this.getAllCarritos();
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
        const carritos = await this.getAllCarritos();
        const index = carritos.findIndex((carrito) => carrito.id == carritoId);
        carritos[index].productos.push(producto);
        try {
            await fs.promises.writeFile(
                this.file,
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
        const carritos = await this.getAllCarritos();
        const carritoIndex = carritos.findIndex(
            (carrito) => carrito.id == carritoId
        );
        const productoIndex = carritos[carritoIndex].productos.findIndex(
            (producto) => producto.id == productoId
        );
        carritos[carritoIndex].productos.splice(productoIndex, 1);
        try {
            fs.writeFileSync(this.file, JSON.stringify(carritos, null, 2));
            return { msg: 'producto eliminado eliminado' };
        } catch (error) {
            throw new Error(`Error en Delete producto by ID! ${error.message}`);
        }
    }

    //es igual para ambos

    async deleteCarritoById(carritoId) {
        const archivo = await this.getAllCarritos();
        const result = archivo.filter((carrito) => {
            return carrito.id != carritoId;
        });
        try {
            fs.writeFileSync(this.file, JSON.stringify(result, null, 2));
            return { msg: 'carrito eliminado' };
        } catch (error) {
            throw new Error(`Error en Delete by ID! ${error.message}`);
        }
    }
    async getAllCarritos() {
        try {
            const archivo = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(archivo);
        } catch (error) {
            return [];
        }
    }
}
