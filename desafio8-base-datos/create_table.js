const createTable = (optionsMariaDB, optionsSqlite3) => {
    const knexMariaDB = require('knex')(optionsMariaDB);
    knexMariaDB.schema
        .hasTable('productos')
        .then((exists) => {
            if (!exists) {
                knexMariaDB.schema
                    .createTable('productos', (table) => {
                        table.increments('id');
                        table.string('title');
                        table.string('price');
                        table.string('thumbnail');
                    })
                    .then(() => {
                        console.log('Tabla productos creada');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        knexMariaDB.destroy();
                    });
            } else {
                console.log('Ya existe la tabla productos MariaDB');
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            knexMariaDB.destroy();
        });

    const knexSqlite3 = require('knex')(optionsSqlite3);
    knexSqlite3.schema
        .hasTable('productos')
        .then((exists) => {
            if (!exists) {
                knexSqlite3.schema
                    .createTable('mensajes', (table) => {
                        table.increments('id');
                        table.string('email');
                        table.string('date');
                        table.string('text');
                    })
                    .then(() => {
                        console.log('Tabla mensajes creada');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        knexSqlite3.destroy();
                    });
            } else {
                console.log('Ya existe la tabla Mensajes SQLITE3');
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            knexSqlite3.destroy();
        });
};

module.exports = createTable;
