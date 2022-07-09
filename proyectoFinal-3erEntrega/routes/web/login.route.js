const express = require('express');
const router = express.Router();
const passport = require('../../middleware/passport.middleware.js');

//@route    GET /login/
//@desc     renderiza vista login
//@access   Public
router.get('/', (req, res) => {
    res.render('login');
});

//@route    GET /login/
//@desc     renderiza vista login error
//@access   Public
router.get('/error', (req, res) => {
    res.render('login-error');
});

//@route    POST /login/
//@desc     Autentica, si esta correcto redirije a /, sino a /login/error
//@access   Public
router.post(
    '/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login/error',
    })
);

module.exports = router;
