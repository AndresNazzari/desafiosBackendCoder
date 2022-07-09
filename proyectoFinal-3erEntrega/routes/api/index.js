const express = require('express');
const router = express.Router();

//@routes     "/api"

router.use('/productos', require('./productos.route'));
//router.use('/api/carrito', require('./carrito.route'));
router.use('/info', require('./info.route'));
router.use('/randoms', require('./randoms.route'));

module.exports = router;
