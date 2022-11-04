import express from 'express';

// import AuthController from '../../../controllers/auth.controller.js';

export default class LoginRoute extends express.Router {
  constructor() {
    super();
    // this.authController = AuthController.getInstance();

    //@route    GET /login
    //@desc     User login, return user info and token
    //@access   Public
    this.get(
      '/'

      // this.authController.loginUserController
    );

    //@route    POST /login
    //@desc     User login, return user info and token
    //@access   Public
    this.post(
      '/'
      // this.authController.loginUserController
    );

    //@route    GET /login/error
    //@desc     User login, return user info and token
    //@access   Public
    this.get(
      '/error'

      // this.authController.loginUserController
    );
  }

  static getInstance() {
    if (!LoginRoute.instance) {
      LoginRoute.instance = new LoginRoute();
    }
    return LoginRoute.instance;
  }
}
