
class ProductosAPI {
    constructor(optionsMariaDB,table) {
        this.knex = require('knex')(optionsMariaDB);
        this.table = table;
    }

    async save(obj) {
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        // El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último
        // objeto agregado(o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
            this.knex(this.table).insert(obj).then(id => {
                const newProduct = { ...obj, id:id[0] };
                return newProduct;}) 
                .catch(error => {console.log(error)})
                .finally(() => {this.knex.destroy()});

    }

    async getAll() {
        this.knex.select("*").from(this.table).then(productos => {
           console.log(productos)
           
            /* if (productos.length > 0) {
                return productos;
            } else {
                return []
        } */})
        .catch(error => {console.log(error)})
        .finally(() => {this.knex.destroy()});
    }
}

module.exports = ProductosAPI;
