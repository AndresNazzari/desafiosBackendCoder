import fs from 'fs';

export default class ContenedorFs {
    constructor(file) {
        this.file = file;
    }

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
