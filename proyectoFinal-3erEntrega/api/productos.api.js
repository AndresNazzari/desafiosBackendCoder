const Product = require('../models/Product.model.js');
const prod = require('../util/productos.util.js');

class ProdcutosAPI {
    constructor() {
        this.productos = prod;
    }
    async getProductos() {
        return await Product.find({});
    }

    async createProducts() {
        await Product.insertMany(this.productos);
    }
}

module.exports = ProdcutosAPI;
