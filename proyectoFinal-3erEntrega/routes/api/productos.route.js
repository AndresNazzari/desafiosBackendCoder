const express = require('express');
const router = express.Router();
const Cart = require('../../models/Cart.model.js');
const User = require('../../models/User.model.js');
const Product = require('../../models/Product.model.js');
const sendEMail = require('../../config/nodemailer.js').sendEMail;
const sendWA = require('../../middleware/twilio.js').sendWA;
const isAuth = require('../../middleware/auth.middleware.js');
const ProductosAPI = require('../../api/productos.api');
const productosAPI = new ProductosAPI();

//@route    GET /api/productos/
//@desc     devuelve todos los productos
//@access   Provate
router.get('/', isAuth, async (req, res) => {
    //productosAPI.createProducts(); Esto se ejecuta 1 sola vez para crear los productos en mongo
    const productos = await productosAPI.getProductos();

    //aca quiero devolver como json los productos

    //res.status(200).json(productos);
    res.status(200).end(JSON.stringify(productos));

    //res.render('productos', { email: req.session.passport.user, productos: productos });
});

router.post('/', isAuth, async (req, res) => {
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

router.post('/finalizar', isAuth, async (req, res) => {
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
