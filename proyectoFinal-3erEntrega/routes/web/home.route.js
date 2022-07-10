const express = require('express');
const router = express.Router();
const sendEMail = require('../../config/nodemailer.js').sendEMail;
const sendWA = require('../../middleware/twilio.js').sendWA;
const isAuth = require('../../middleware/auth.middleware.js');
const { getProductosService } = require('../../services/productos.service.js');
const {
    getCarritoByEmailService,
    postProductoCarritoService,
    deleteCarritoService,
} = require('../../services/carritos.service.js');

//@route    GET /
//@desc     redneriza vista ppal productos
//@access   Private
router.get('/', isAuth, async (req, res) => {
    const productos = await getProductosService();
    res.render('home', { email: req.session.passport.user, productos });
});

//@route    POST /
//@desc     Agrega producto al carrito
//@access   Private
router.post('/', isAuth, async (req, res) => {
    const productoId = Number(Object.keys(req.body)[0]);
    const email = req.session.passport.user;
    try {
        const cart = await getCarritoByEmailService(email);
        await postProductoCarritoService(cart[0]._id, productoId);
    } catch (error) {
        throw new Error(`Error en agregado de producto al carrito! ${error.message}`);
    }
    res.redirect('/');
});

//@route    POST /finalizarCompra
//@desc     Finaliza compra y limpia carrito

router.post('/finalizarCompra', isAuth, async (req, res) => {
    console.log('Finalizar');
    try {
        const email = req.session.passport.user;
        const cart = await getCarritoByEmailService(email);

        await sendEMail(req.session.passport.user, false, cart);
        await sendWA(email, cart);
        await deleteCarritoService(cart[0]._id);
        res.redirect('/');
    } catch (error) {
        throw new Error(`Error en finalizar compra! ${error.message}`);
    }
});

module.exports = router;
