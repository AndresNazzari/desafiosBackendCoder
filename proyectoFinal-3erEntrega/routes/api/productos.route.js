const express = require('express');
const router = express.Router();
const Cart = require('../../models/Cart.model.js');
const User = require('../../models/User.js');
const Product = require('../../models/Product.model.js');
const sendEMail = require('../../config/nodemailer.js').sendEMail;
const sendWA = require('../../middleware/twilio.js').sendWA;
const ProductosAPI = require('../../api/productos.api');
const productosAPI = new ProductosAPI();

//@route    GET /api/productos/
//@desc     devuelve todos los productos
//@access   Public
router.get('/', async (req, res) => {
    //productosAPI.createProducts(); Esto se ejecuta 1 sola vez para crear los productos en mongo
    const productos = await productosAPI.getProductos();
    res.render('productos', { email: req.session.passport.user, productos: productos });
});

router.post('/', async (req, res) => {
    //agregar producto al carrito
    const item = await Product.findOne({ id: Number(Object.keys(req.body)[0]) });
    const cart = await Cart.findOne({ email: req.session.passport.user });

    if (cart) {
        cart.items.push(item);
        await cart.save();
    } else {
        const newCart = new Cart({ email: req.session.passport.user, items: [item] });
        await newCart.save();
    }
    res.redirect('/api/productos');
});

router.post('/finalizar', async (req, res) => {
    console.log('Finalizar');
    try {
        const cart = await Cart.findOne({ email: req.session.passport.user });
        const user = await User.findOne({ email: req.session.passport.user });
        await sendEMail(req.session.passport.user, false, cart);
        await sendWA(user, cart);
        await Cart.deleteOne({ email: req.session.passport.user });
        res.redirect('/api/productos');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
