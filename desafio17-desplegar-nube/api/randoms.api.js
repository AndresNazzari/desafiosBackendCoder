class RandomsApi {
    constructor(cantidad) {
        this.cant = Number(cantidad);
        this.listaOcurrencias = {};
    }

    generarConteoAleatorios() {
        let clave = 0;
        for (let index = 0; index < this.cant; index++) {
            clave = this.generarAleatorio(0, this.cant);
            if (this.listaOcurrencias.hasOwnProperty(clave.toString())) {
                //if (clave.toString() in listaOcurrencias) {
                this.listaOcurrencias[clave.toString()] += 1;
            } else {
                this.listaOcurrencias[clave.toString()] = 1;
            }
        }

        return this.listaOcurrencias;
    }

    generarAleatorio(numInicial, numFinal) {
        let int = parseInt(Math.random() * numFinal) + numInicial;
        return int;
    }
}
module.exports = RandomsApi;
