import { cartsApi, productsApi } from '../daos/index.js';

export default class CartService {
  async getProductsInCart(id) {
    const cart = await this.getCartById(id);
    console.log(cart);
    return cart.items.length > 0 ? cart.items : { msg: `empty cart`, items: [] };
  }

  async getCartById(id) {
    return await cartsApi.getById(id);
  }

  async getCartByEmail(email) {
    return await cartsApi.getByEmail(email);
  }

  async postCart(email) {
    return await cartsApi.addNewCart(email);
  }

  async postProductInCart(cartId, productId, qty) {
    const cart = await this.getCartById(cartId);
    const prodInCart = cart.items.find((item) => {
      return item._id == productId;
    });

    if (!prodInCart) {
      const product = await productsApi.getById(productId);
      const newProduct = { ...product._doc, qty };
      console.log(newProduct);
      await cartsApi.addProductInCart(newProduct, cart);

      // cart.items[cart.items.length - 1].qty += qty;
    } else {
      const index = cart.items.findIndex((item) => {
        return item._id == productId;
      });
      cart.items[index].qty += qty;
    }

    const pepe = await cart.save();
    //por alguna razon, devuelve el carrito actualizado pero no lo almacena en mongo
    return pepe;
  }

  async deleteProductInCart(cartId, productId) {
    const cart = await cartsApi.getById(cartId);
    const newItems = cart.items.find((item) => {
      return item._id != productId;
    });

    if (newItems) {
      cart.items = newItems;
      await cart.save();
      return { msg: 'producto eliminado eliminado' };
    } else {
      return {
        msg: 'No se encontraron productos en el carrito para eliminar',
      };
    }
  }

  async deleteCart(id) {
    return await cartsApi.deleteById(id);
  }

  static getInstance() {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }
}
