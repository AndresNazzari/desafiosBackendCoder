import express from 'express';
import { check } from 'express-validator';
import ProductsController from '../../../controllers/products.controller.js';

export default class ProductsRoute extends express.Router {
    constructor() {
        super();
        this.productsController = new ProductsController();

        //@route    GET api/v1/products
        //@desc     Register User
        //@access   Public
        this.get('/', this.productsController.getProducts);

        //@route    GET /products/:id
        //@desc     devuelve un producto según su id
        //@access   Public
        this.get('/:id', this.productsController.getProduct);

        //@route    POST /products/:id
        //@desc     elimina un producto según su id
        //@access   Public
        this.post('/', this.productsController.postProduct);

        //@route    PUT /products/:id
        //@desc     modifica un producto según su id
        //@access   Public
        this.put('/:id', this.productsController.putProduct);

        //@route    DELETE /products/:id
        //@desc     elimina un producto según su id
        //@access   Public
        this.delete('/:id', this.productsController.deleteProduct);
    }
}
