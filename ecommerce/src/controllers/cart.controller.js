import CartService from '../services/cart.service.js';

export default class CartController {
    constructor() {
        this.cartService = CartService.getInstance();

        this.getProductsInCart = this.getProductsInCart.bind(this);
        this.postCart = this.postCart.bind(this);
        this.postProductInCart = this.postProductInCart.bind(this);
        this.deleteProductInCart = this.deleteProductInCart.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
    }

    async getProductsInCart(req, res) {
        const id = req.params.id;
        const response = await this.cartService.getProductsInCart(id);
        res.status(200).json(response);
    }

    async postCart(req, res) {
        const email = req.body.email;
        const response = await this.cartService.postCart(email);
        res.status(200).json(response);
    }

    async postProductInCart(req, res) {
        const cartId = req.params.id;
        const { id, qty } = req.body;

        const response = await this.cartService.postProductInCart(cartId, id, qty);
        res.status(200).json(response);
    }

    async deleteProductInCart(req, res) {
        const cartId = req.params.id;
        const { id } = req.body;
        const response = await this.cartService.deleteProductInCart(cartId, id);
        res.status(200).json(response);
    }

    async deleteCart(req, res) {
        const id = req.params.id;
        const response = await this.cartService.deleteCart(id);
        res.status(200).json(response);
    }

    static getInstance() {
        if (!CartController.instance) {
            CartController.instance = new CartController();
        }
        return CartController.instance;
    }
}
