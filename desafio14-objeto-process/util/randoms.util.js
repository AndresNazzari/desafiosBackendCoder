process.on('message', (msg) => {
    let clave = 0;
    let listaOcurrencias = {};
    const cant = parseInt(process.argv[2]);

    for (let index = 0; index < cant; index++) {
        clave = parseInt(Math.random() * cant) + 0;
        if (listaOcurrencias.hasOwnProperty(clave.toString())) {
            listaOcurrencias[clave.toString()] += 1;
        } else {
            listaOcurrencias[clave.toString()] = 1;
        }
    }

    process.send(listaOcurrencias);
});

console.log(listaOcurrencias);
