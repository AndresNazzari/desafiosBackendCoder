import ProductsService from '../services/products.service.js';
import { validationResult } from 'express-validator';
export default class ProductsController {
  constructor() {
    this.productsService = ProductsService.getInstance();

    this.getProducts = this.getProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.postProduct = this.postProduct.bind(this);
    this.putProduct = this.putProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async getProducts(req, res) {
    const response = await this.productsService.getProducts();
    res.status(200).json(response);
  }

  async getProduct(req, res) {
    const id = req.params.id;
    const response = await this.productsService.getProduct({ _id: id });
    res.status(200).json(response);
  }

  async postProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = req.body;
    const response = await this.productsService.postProduct(product);
    res.status(200).json(response);
  }

  async putProduct(req, res) {
    const id = req.params.id;
    const product = req.body;
    const response = await this.productsService.putProduct({ _id: id }, product);
    res.status(200).json(response);
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    const deletedProduct = await this.productsService.getProduct({ _id: id });
    const response = await this.productsService.deleteProduct({ _id: id });
    res.status(200).json({ ...response, product: deletedProduct });
  }

  static getInstance() {
    if (!ProductsController.instance) {
      ProductsController.instance = new ProductsController();
    }
    return ProductsController.instance;
  }
}
