import MongoContainer from '../../containers/mongo.container.js';
import { Product } from '../../models/Product.model.js';

export default class ProductsMongoDao extends MongoContainer {
    constructor(collection) {
        super(collection);
    }

    async updateProduct(id, obj) {
        try {
            const productoUpdate = await Product.findByIdAndUpdate(id, obj);
            return { msg: 'producto actualizado' };
        } catch (error) {
            return { msg: `Error en Update! ${error.message}` };
        }
    }
}
