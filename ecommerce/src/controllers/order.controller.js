import OrderService from '../services/order.service.js';
import { validationResult } from 'express-validator';
export default class ProductsController {
  constructor() {
    this.ordersService = OrderService.getInstance();

    // this.getProducts = this.getProducts.bind(this);
    // this.getProduct = this.getProduct.bind(this);
    // this.postProduct = this.postProduct.bind(this);
    // this.putProduct = this.putProduct.bind(this);
    // this.deleteProduct = this.deleteProduct.bind(this);
  }

  // async getProducts(req, res) {
  //   const response = await this.productsService.getProducts();
  //   res.status(200).json(response);
  // }

  static getInstance() {
    if (!ProductsController.instance) {
      ProductsController.instance = new ProductsController();
    }
    return ProductsController.instance;
  }
}
