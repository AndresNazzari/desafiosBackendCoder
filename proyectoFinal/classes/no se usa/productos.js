import fs from 'fs';

export default class Productos {
    constructor(file) {
        this.file = file;
    }

    async save(obj) {
        try {
            const productos = await this.getAll();
            let id;
            if (productos.length > 0) {
                id = productos[productos.length - 1].id + 1;
            } else {
                id = 1;
            }
            const newProduct = { ...obj, id, timestamp: Date.now() };
            productos.push(newProduct);
            await fs.promises.writeFile(
                this.file,
                JSON.stringify(productos, null, 2)
            );
            return newProduct;
        } catch (error) {
            throw new Error(`Error en Save! ${error.message}`);
        }
    }

    async updateItem(id, obj) {
        try {
            const productos = await this.getAll();
            const index = productos.findIndex((producto) => producto.id == id);
            productos.splice(index, 1, { ...obj, id });
            await fs.promises.writeFile(
                this.file,
                JSON.stringify(productos, null, 2)
            );
            return { msg: 'producto actualizado' };
        } catch (error) {
            throw new Error(`Error en Update! ${error.message}`);
        }
    }

    async getById(id) {
        const archivo = await this.getAll();
        return archivo.find((producto) => producto.id == id);
    }

    //es igual para ambos
    async deleteById(id) {
        const archivo = await this.getAll();
        const result = archivo.filter((producto) => {
            return producto.id != id;
        });
        try {
            fs.writeFileSync(this.file, JSON.stringify(result, null, 2));
            return { msg: 'item eliminado' };
        } catch (error) {
            throw new Error(`Error en Delete by ID! ${error.message}`);
        }
    }
    async getAll() {
        try {
            const archivo = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(archivo);
        } catch (error) {
            return [];
        }
    }
}
