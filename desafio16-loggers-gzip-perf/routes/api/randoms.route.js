const express = require('express');
const router = express.Router();
//const { fork } = require('child_process');
const RandomsApi = require('../../api/randoms.api');

//@route    GET /api/randoms?cant=100000000
//@desc     devuelve todos los productos
//@access   Public
router.get('/', (req, res) => {
    const cant = req.query.cant || 10000000;

    const randomsApi = new RandomsApi(cant);
    const pepe = randomsApi.generarConteoAleatorios();
    return res.json({ pepe });

    //const computo = fork('./util/randoms.util.js', [cant]);
    //Enviamos cualquier mensaje para que comience el proceso hijo
    //computo.send('start');
    //Esperamos una respuesta escuchando el evento message y al recibirlo le enviamos el resultado al cliente
    // computo.on('message', (randoms) => {
    //    return res.json({ randoms });
    //});
});

module.exports = router;
