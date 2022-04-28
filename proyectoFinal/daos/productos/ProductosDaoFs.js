import ContenedorFs from '../../classes/contenedorFs.js';
import fs from 'fs';

export default class ProductosDaoFs extends ContenedorFs {
    constructor(file) {
        super(file);
    }

    async save(obj) {
        try {
            const productos = await super.getAll();
            let id;
            if (productos.length > 0) {
                id = productos[productos.length - 1].id + 1;
            } else {
                id = 1;
            }
            const newProduct = { ...obj, id, timestamp: Date.now() };
            productos.push(newProduct);
            await fs.promises.writeFile(
                super.file,
                JSON.stringify(productos, null, 2)
            );
            return newProduct;
        } catch (error) {
            throw new Error(`Error en Save! ${error.message}`);
        }
    }

    async updateItem(id, obj) {
        try {
            const productos = await super.getAll();
            const index = productos.findIndex((producto) => producto.id == id);
            productos.splice(index, 1, { ...obj, id });
            await fs.promises.writeFile(
                super.file,
                JSON.stringify(productos, null, 2)
            );
            return { msg: 'producto actualizado' };
        } catch (error) {
            throw new Error(`Error en Update! ${error.message}`);
        }
    }

    async getById(id) {
        const archivo = await super.getAll();
        return archivo.find((producto) => producto.id == id);
    }
}
