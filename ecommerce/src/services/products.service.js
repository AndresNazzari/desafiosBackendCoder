import { productsApi } from '../daos/index.js';

export default class ProductService {
  async getProducts() {
    return await productsApi.getAll();
  }

  async getProduct(id) {
    return await productsApi.getById(id);
  }

  async postProduct(product) {
    return await productsApi.addNewProduct(product);
  }

  async putProduct(id, product) {
    return await productsApi.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return await productsApi.deleteById(id);
  }

  static getInstance() {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }
}
