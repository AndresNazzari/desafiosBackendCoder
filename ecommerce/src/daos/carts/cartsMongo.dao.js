import MongoContainer from '../../containers/mongo.container.js';
import { Cart } from '../../models/Cart.model.js';

export default class CartMongoDao extends MongoContainer {
  constructor(collection) {
    super(collection);
  }
  async getByEmail(email) {
    try {
      const cart = await Cart.find({ email });
      return cart.length > 0 ? cart[0] : false;
    } catch (error) {
      return { msg: `Error en Creacion de cart! ${error.message}` };
    }
  }

  async addNewCart(email) {
    try {
      const newCart = new Cart({ email });
      await newCart.save();
      return { msg: 'Cart creado', cart: newCart };
    } catch (error) {
      return { msg: `Error en Creacion de cart! ${error.message}` };
    }
  }

  async addProductInCart(product, cart) {
    try {
      cart.items.push(product);
      await cart.save();
    } catch (error) {
      return { msg: `Error en agregado de producto al cart! ${error.message}` };
    }
  }

  static getInstance() {
    if (!CartMongoDao.instance) {
      CartMongoDao.instance = new CartMongoDao('carts');
    }
    return CartMongoDao.instance;
  }
}
