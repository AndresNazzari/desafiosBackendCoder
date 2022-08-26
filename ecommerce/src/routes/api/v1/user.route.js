import express from 'express';
import { check } from 'express-validator';
import validateToken from '../../../middlewares/validateToken.js';

export default class UserRoute extends express.Router {
  constructor() {
    super();

    //TODO: implementar el endpoint para traer todos los usuarios
    //@route    GET /api/users
    //@desc     Devuelve todos los Usuarios
    //@access   Private (Admin )
    this.get('/', (req, res) => {
      res.status(200).json({ msg: 'implementar el endpoint para traer todos los usuarios' });
    });

    //TODO: implementar el endpoint para eliminar un usuario
    //@route    DELETE /api/users/:id
    //@desc     Delete my user
    //@access   Private
    this.delete('/', (req, res) => {
      res.status(200).json({ msg: 'implementar el endpoint para eliminar un usuario' });
    });

    //TODO: implementar el endpoint para modificar un usuario
    //@route    PUT /api/users/:id
    //@desc     Update my user
    //@access   Private
    this.put('/:id', (req, res) => {
      res.status(200).json({ msg: 'implementar el endpoint para modificar un usuario' });
    });
  }

  static getInstance() {
    if (!UserRoute.instance) {
      UserRoute.instance = new UserRoute();
    }
    return UserRoute.instance;
  }
}
