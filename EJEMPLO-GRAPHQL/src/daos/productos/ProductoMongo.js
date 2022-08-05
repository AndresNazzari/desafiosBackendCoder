import {ContenedorMongo} from '../../db/ContenedorMongo.js'


class ProductoMongo extends ContenedorMongo {
    constructor(){
        super('productos')
    }
}

export {ProductoMongo}