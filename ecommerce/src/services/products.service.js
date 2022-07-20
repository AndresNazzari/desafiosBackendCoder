import { productsApi, cartsApi } from '../daos/index.js';
import { Product } from '../models/Product.model.js';

export default class ProductService {
    constructor() {}

    async getProducts() {
        return await productsApi.getAll();
    }
    async getProduct(id) {
        return await productsApi.getById(id);
    }

    async postProduct(product) {
        const newProduct = new Product({
            ...product,
        });
        return await productsApi.addNew(newProduct);
    }

    async putProduct(id, product) {
        return await productsApi.updateProduct(id, product);
    }

    async deleteProduct(id) {
        return await productsApi.deleteById(id);
    }
}
