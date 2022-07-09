const express = require('express');
const router = express.Router();

//@route    POST /logout/
//@desc     devuelve todos los productos
//@access   Public
router.post('/', (req, res) => {
    res.render('logout', { userName: req.session.userName });
    req.session.destroy();
});

module.exports = router;
