let clave = 0;
let listaOcurrencias = {};
const cant = process.argv[2];
console.log(cant);

for (let index = 0; index < cant; index++) {
    clave = parseInt(Math.random() * cant) + 0;
    if (listaOcurrencias.hasOwnProperty(clave.toString())) {
        listaOcurrencias[clave.toString()] += 1;
    } else {
        listaOcurrencias[clave.toString()] = 1;
    }
}

console.log(listaOcurrencias);
