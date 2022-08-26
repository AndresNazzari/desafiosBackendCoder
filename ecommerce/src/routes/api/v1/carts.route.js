import express from 'express';
import { check } from 'express-validator';
import CartController from '../../../controllers/cart.controller.js';
import validateToken from '../../../middlewares/validateToken.js';
export default class CartRoute extends express.Router {
  constructor() {
    super();
    this.cartController = CartController.getInstance();

    //@route    POST api/v1/carts
    //@desc     Crea un carrito y devuelve su id
    //@access   Private
    this.post('/', validateToken, this.cartController.postCart);

    //@route    GET /api/carrito/
    //@desc     Me permite listar todos los productos guardados en el carrito
    //@access   Private
    this.get('/:id/products', validateToken, this.cartController.getProductsInCart);

    //@route    POST /api/carrito/
    //@desc     Para incorporar productos al carrito por su id de producto
    //@access   Private
    this.post(
      '/:id/products',
      validateToken,
      [
        check('id', 'Product id is Required').not().isEmpty(),
        check('qty', 'Quantity must be integer >-1').isInt({ min: 0 }),
      ],
      this.cartController.postProductInCart
    );

    //@route    DELETE /api/carrito/
    //@desc     Para eliminar producto del carrito por su id de producto
    //@access   Private
    this.delete('/:id/products', validateToken, this.cartController.deleteProductInCart);

    //@route    DELETE api/v1/carts
    //@desc     Elimina un carrito por su id
    //@access   Private
    this.delete('/:id', validateToken, this.cartController.deleteCart);
  }

  static getInstance() {
    if (!CartRoute.instance) {
      CartRoute.instance = new CartRoute();
    }
    return CartRoute.instance;
  }
}
