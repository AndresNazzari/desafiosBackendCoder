import express from 'express';
import { check } from 'express-validator';
import ChatsController from '../../../controllers/chats.controller.js';
import validateToken from '../../../middlewares/validateToken.js';

export default class ChatsRoute extends express.Router {
  constructor() {
    super();
    this.chatsController = ChatsController.getInstance();

    //@route    POST api/v1/chats
    //@desc     Crea un carrito y devuelve su id
    //@access   Private
    this.post('/', validateToken);

    //@route    GET /api/chats/
    //@desc     Me permite listar todos los productos guardados en el carrito
    //@access   Private
    this.get('/:id/products', validateToken);

    //@route    POST /api/chats/
    //@desc     Para incorporar productos al carrito por su id de producto
    //@access   Private
    this.post('/:id/products', validateToken);

    //@route    DELETE /api/chats/
    //@desc     Para eliminar producto del carrito por su id de producto
    //@access   Private
    this.delete('/:id/products', validateToken);

    //@route    DELETE api/v1/chats
    //@desc     Elimina un carrito por su id
    //@access   Private
    this.delete('/:id', validateToken);
  }

  static getInstance() {
    if (!ChatsRoute.instance) {
      ChatsRoute.instance = new ChatsRoute();
    }
    return ChatsRoute.instance;
  }
}
