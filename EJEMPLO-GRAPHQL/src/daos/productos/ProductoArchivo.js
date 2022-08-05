import { ContenedorArchivo } from "../../db/ContenedorArchivo.js"


class ProductoArchivo extends ContenedorArchivo {
    constructor(){
        super('productos')
    }
}

export {ProductoArchivo}