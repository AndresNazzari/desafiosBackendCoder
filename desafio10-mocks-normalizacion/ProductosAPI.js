class ProductosAPI {
    constructor(optionsMariaDB, table) {
        this.knex = require('knex')(optionsMariaDB);
        this.table = table;
    }

    async save(obj) {
        return this.knex(this.table)
            .insert(obj)
            .then((id) => {
                const newProduct = { ...obj, id: id[0] };
                return newProduct;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async getAll() {
        try {
            return await this.knex.select('*').from(this.table);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductosAPI;
