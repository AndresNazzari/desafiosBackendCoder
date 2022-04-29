import { Producto } from '../models/Producto.js';
import { Carrito } from '../models/Carrito.js';

export class ContenedorMongo {
    constructor(collection) {
        this.collection = collection;
    }

    async deleteById(id) {
        try {
            this.collection == 'productos'
                ? await Producto.deleteOne({ _id: id })
                : await Carrito.deleteOne({ _id: id });
            return { msg: 'item eliminado' };
        } catch (error) {
            throw new Error(`Error en Delete by ID! ${error.message}`);
        }
    }

    async getAll() {
        try {
            return this.collection == 'productos'
                ? await Producto.find({})
                : await Carrito.find({});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getById(id) {
        try {
            return await Producto.find({ _id: id });
        } catch (error) {
            console.log(`Error en Get by ID! ${error.message}`);
        }
    }
}
