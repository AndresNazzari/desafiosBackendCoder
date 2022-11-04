import { Cart } from '../models/Cart.model.js';
import { Product } from '../models/Product.model.js';

export default class MongoContainer {
  constructor(collection) {
    this.collection = collection || 'carts';
  }

  async getAll() {
    try {
      return this.collection == 'products' ? await Product.find({}) : await Cart.find({});
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

  async getById(id) {
    try {
      const result = this.collection == 'products' ? await Product.find({ _id: id }) : await Cart.find({ _id: id });
      return result.length > 0 ? result[0] : { msg: `${this.collection} no encontrado` };
    } catch (error) {
      return { msg: `Error Get by ID! ${error.message}` };
    }
  }

  async deleteById(id) {
    try {
      this.collection == 'products' ? await Product.deleteOne({ _id: id }) : await Cart.deleteOne({ _id: id });
      return { msg: `${this.collection} eliminado` };
    } catch (error) {
      return { msg: `Error en Delete by ID! ${error.message}` };
    }
  }
}
