import express from 'express';

// import AuthController from '../../../controllers/auth.controller.js';

export default class RegisterRoute extends express.Router {
  constructor() {
    super();
    // this.authController = AuthController.getInstance();

    //@route    GET /register
    //@desc     User login, return user info and token
    //@access   Public
    this.get(
      '/'

      // this.authController.loginUserController
    );

    //@route    POST /register
    //@desc     User login, return user info and token
    //@access   Public
    this.post(
      '/'
      // this.authController.loginUserController
    );

    //@route    GET /register/error
    //@desc     User login, return user info and token
    //@access   Public
    this.get(
      '/error'

      // this.authController.loginUserController
    );
  }

  static getInstance() {
    if (!RegisterRoute.instance) {
      RegisterRoute.instance = new RegisterRoute();
    }
    return RegisterRoute.instance;
  }
}
