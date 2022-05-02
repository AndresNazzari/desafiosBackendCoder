import { ContenedorFirebase } from '../../classes/ContenedorFirebase.js';
import admin from 'firebase-admin';

export class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(collection) {
        super(collection);
    }
    async save(producto) {
        try {
            const doc = this.query.doc();
            return await doc.create(producto);
        } catch (error) {
            throw new Error(`Error en Save! ${error.message}`);
        }
    }

    async updateItem(id, obj) {
        try {
            await this.query.doc(id).set(obj);
            return { msg: 'producto actualizado' };
        } catch (error) {
            throw new Error(`Error en Update! ${error.message}`);
        }
    }
}
