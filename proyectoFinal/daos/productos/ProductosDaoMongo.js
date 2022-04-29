import { ContenedorMongo } from '../../classes/ContenedorMongo.js';
import { Producto } from '../../models/Producto.js';

export class ProductosDaoMongo extends ContenedorMongo {
    constructor(collection) {
        super(collection);
    }
    async save(producto) {
        const nuevoProducto = new Producto({
            ...producto,
        });
        return await nuevoProducto.save();
    }

    async updateItem(id, obj) {
        try {
            const productoUpdate = await Producto.findByIdAndUpdate(id, obj);
            return { msg: 'producto actualizado' };
        } catch (error) {
            throw new Error(`Error en Update! ${error.message}`);
        }
    }
}
