import express from 'express';
import { check } from 'express-validator';
import OrderController from '../../../controllers/order.controller.js';
import validateToken from '../../../middlewares/validateToken.js';

export default class OrderRoute extends express.Router {
  constructor() {
    super();
    this.orderController = OrderController.getInstance();

    //@route    POST api/v1/carts
    //@desc     Crea un carrito y devuelve su id
    //@access   Private
    this.post('/', validateToken);

    //@route    GET /api/carrito/
    //@desc     Me permite listar todos los productos guardados en el carrito
    //@access   Private
    this.get('/:id/products', validateToken);

    //@route    POST /api/carrito/
    //@desc     Para incorporar productos al carrito por su id de producto
    //@access   Private
    this.post('/:id/products', validateToken);

    //@route    DELETE /api/carrito/
    //@desc     Para eliminar producto del carrito por su id de producto
    //@access   Private
    this.delete('/:id/products', validateToken);

    //@route    DELETE api/v1/carts
    //@desc     Elimina un carrito por su id
    //@access   Private
    this.delete('/:id', validateToken);
  }

  static getInstance() {
    if (!OrderRoute.instance) {
      OrderRoute.instance = new OrderRoute();
    }
    return OrderRoute.instance;
  }
}
