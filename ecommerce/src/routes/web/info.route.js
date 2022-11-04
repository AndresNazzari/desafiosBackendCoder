import express from 'express';
import { infoApi } from '../../daos/index.js';
// import AuthController from '../../../controllers/auth.controller.js';

export default class InfoRoute extends express.Router {
  constructor() {
    super();
    // this.authController = AuthController.getInstance();

    //@route    POST /info
    //@desc     Shows server info
    //@access   Public
    this.get('/', (req, res) => {
      res.render('info', infoApi.getInfo());
    });
  }

  static getInstance() {
    if (!InfoRoute.instance) {
      InfoRoute.instance = new InfoRoute();
    }
    return InfoRoute.instance;
  }
}
