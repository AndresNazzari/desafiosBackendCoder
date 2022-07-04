const express = require('express');
const router = express.Router();

const InfoApi = require('../../api/info.api');
const infoApi = new InfoApi();

//@route    GET /api/info/
//@desc     devuelve todos los productos
//@access   Public
router.get('/', (req, res) => {
    res.render('info', infoApi.getInfo());
});

module.exports = router;
