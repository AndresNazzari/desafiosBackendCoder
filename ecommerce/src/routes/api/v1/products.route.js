import express from 'express';
import { check } from 'express-validator';
import ProductsController from '../../../controllers/products.controller.js';

export default class ProductsRoute extends express.Router {
    constructor() {
        super();
        this.productsController = ProductsController.getInstance();

        //@route    GET api/v1/products
        //@desc     Register User
        //@access   Public
        this.get('/', this.productsController.getProducts);

        //@route    GET /products/:id
        //@desc     devuelve un producto según su id
        //@access   Public
        this.get('/:id', this.productsController.getProduct);

        //@route    POST /products/:id
        //@desc     Agrega un producto nuevo
        //@access   Public
        this.post(
            '/',
            [
                check('title', 'Title is Required').not().isEmpty(),
                check('title', 'Title must be a string').isString(),
                check('description', 'Description is Required').not().isEmpty(),
                check('description', 'Description must be a string').isString(),
                check('price', 'Price is Required').not().isEmpty(),
                check('price', 'Price must be a decimal').isFloat(),
                check('discountPercentage', 'Price must be a decimal').isFloat(),
                check('rating', 'Price must be a decimal').isFloat({ min: 0, max: 5 }),
                check('stock', 'Stock is Required').not().isEmpty(),
                check('stock', 'Stock must integer >-1').isInt({ min: 0 }),
                check('brand', 'Brand is Required').not().isEmpty(),
                check('brand', 'Brand must be a string').isString(),
                check('category', 'Category is Required').not().isEmpty(),
                check('category', 'Category must be a string').isString(),
                check('thumbnail', 'Category must be a string').isString(),
            ],
            this.productsController.postProduct
        );

        //@route    PUT /products/:id
        //@desc     modifica un producto según su id
        //@access   Public
        this.put('/:id', this.productsController.putProduct);

        //@route    DELETE /products/:id
        //@desc     elimina un producto según su id
        //@access   Public
        this.delete('/:id', this.productsController.deleteProduct);
    }

    static getInstance() {
        if (!ProductsRoute.instance) {
            ProductsRoute.instance = new ProductsRoute();
        }
        return ProductsRoute.instance;
    }
}
