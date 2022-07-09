const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/auth.middleware.js');
const http = require('http');

//@route    GET /
//@desc     redneriza vista ppal productos
//@access   Public
router.get('/', isAuth, async (req, res) => {
    const a = await http.get(
        {
            hostname: 'localhost',
            port: 8080,
            path: '/api/productos',
            method: 'GET',
            accept: 'application/json',
            accept: 'text/plain',
        },
        (res) => {
            console.log(res);
        }
    );

    res.render('productos', { email: req.session.passport.user });
});

module.exports = router;
