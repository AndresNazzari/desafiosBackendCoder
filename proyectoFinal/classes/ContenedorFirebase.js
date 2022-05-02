import admin from 'firebase-admin';

export class ContenedorFirebase {
    constructor(collection) {
        this.db = admin.firestore();
        this.query = this.db.collection(collection);
    }

    async getAll() {
        try {
            const snapshot = await this.query.get();
            return snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getById(id) {
        try {
            return this.query.doc(id).get();
        } catch (error) {
            console.log(`Error en Get by ID! ${error.message}`);
        }
    }
    async deleteById(id) {
        try {
            await this.query.doc(id).delete();
            return { msg: 'item eliminado' };
        } catch (error) {
            throw new Error(`Error en Delete by ID! ${error.message}`);
        }
    }
}
