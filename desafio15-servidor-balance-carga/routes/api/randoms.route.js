const express = require('express');
const router = express.Router();
const { fork } = require('child_process');
const RandomsApi = require('../../api/randoms.api');

//@route    GET /api/randoms?cant=100000000
//@desc     devuelve todos los productos
//@access   Public
router.get('/', (req, res) => {
    const cant = req.query.cant || 100000000;
    //const randomsApi = new RandomsApi(cant);
    const computo = fork('./util/randoms.util.js', [cant]);

    computo.send('start');
});

module.exports = router;
