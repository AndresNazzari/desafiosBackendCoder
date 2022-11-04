import express from 'express';
import { check } from 'express-validator';
import validateToken from '../../../middlewares/validateToken.js';

import AuthController from '../../../controllers/auth.controller.js';

export default class AuthRoute extends express.Router {
  constructor() {
    super();
    this.authController = AuthController.getInstance();

    //@route    POST /api/auth/login
    //@desc     User login, return user info and token
    //@access   Public
    this.post(
      '/login',
      [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
      ],
      this.authController.loginUserController
    );

    //@route    POST /api/auth/register
    //@desc     Register new user, return user info and token
    //@access   Public

    this.post(
      '/register',
      [
        check('adress', 'Adress is Required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
        check('password2', 'Please enter a password2 with 6 or more characters').isLength({ min: 6 }),
      ],
      this.authController.registerUserController
    );

    //@route    GET /api/auth/me
    //@desc     return user info and token
    //@access   Private
    this.get('/me', validateToken, this.authController.authMeController);

    //TODO: implementar el endpoint para modificar un usuario
    //@route    PUT /api/auth/me
    //@desc     return user info modified and token
    //@access   Public
    this.put('/me', (req, res) => {
      res.status(200).json({ msg: 'TODO implementar el endpoint para modificar un usuario' });
    });
  }

  static getInstance() {
    if (!AuthRoute.instance) {
      AuthRoute.instance = new AuthRoute();
    }
    return AuthRoute.instance;
  }
}
