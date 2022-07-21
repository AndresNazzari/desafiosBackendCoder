import express from 'express';
import { check } from 'express-validator';
import CartController from '../../../controllers/cart.controller.js';
export default class CartRoute extends express.Router {
    constructor() {
        super();
        this.cartController = CartController.getInstance();

        //@route    GET /api/carrito/
        //@desc     Me permite listar todos los productos guardados en el carrito
        //@access   Public
        this.get('/:id/products', this.cartController.getProductsInCart);

        //@route    POST api/v1/carts
        //@desc     Crea un carrito y devuelve su id
        //@access   Public
        this.post('/', this.cartController.postCart);

        //@route    POST /api/carrito/
        //@desc     Para incorporar productos al carrito por su id de producto
        //@access   Public
        this.post('/:id/products', this.cartController.postProductInCart);

        //@route    DELETE /api/carrito/
        //@desc     Para eliminar producto del carrito por su id de producto
        //@access   Public
        this.delete('/:id/products', this.cartController.deleteProductInCart);

        //@route    DELETE api/v1/carts
        //@desc     Elimina un carrito por su id
        //@access   Public
        this.delete('/:id', this.cartController.deleteCart);
    }

    static getInstance() {
        if (!CartRoute.instance) {
            CartRoute.instance = new CartRoute();
        }
        return CartRoute.instance;
    }
}
