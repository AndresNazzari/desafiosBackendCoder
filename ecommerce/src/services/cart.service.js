import { cartsApi, productsApi } from '../daos/index.js';

import { Cart } from '../models/Cart.model.js';

export default class CartService {
    async getProductsInCart(id) {
        const cart = await cartsApi.getById(id);
        return cart.items.length > 0 ? cart.items : { msg: `empty cart` };
    }

    async postCart(email) {
        const newCart = new Cart({ email });
        return await cartsApi.addNew(newCart);
    }

    async postProductInCart(cartId, productId, qty) {
        const product = await productsApi.getById(productId);
        const cart = await cartsApi.getById(cartId);
        cart.items.push(product);
        return await cartsApi.addNew(cart);
    }

    async deleteProductInCart(cartId, productId) {
        const cart = await cartsApi.getById(cartId);
        const newItems = cart.items.find((item) => {
            return item._id != productId;
        });

        if (newItems) {
            cart.items = newItems;
            await cartsApi.addNew(cart);
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
