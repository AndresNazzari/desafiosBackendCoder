import ProductsService from '../services/products.service.js';

export default class ProductsController {
    constructor() {
        this.productsService = new ProductsService();

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
        const response = await this.productsService.deleteProduct({ _id: id });
        res.status(200).json(response);
    }
}