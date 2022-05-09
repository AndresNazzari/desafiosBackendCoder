const { normalize, schema, denormalize } = require('normalizr');
const util = require('util');
const holding = require('./holding');

const empleado = new schema.Entity('empleado');
const empresa = new schema.Entity('empresa', {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado],
});
const holdingSchema = new schema.Entity('holding', { empresas: [empresa] });
const dataNormalizada = normalize(holding, holdingSchema);

function printData(data) {
    console.log(util.inspect(data, false, 12, true));
}

printData(dataNormalizada);
console.log(
    JSON.stringify(holding).length,
    JSON.stringify(dataNormalizada).length
);

const dataDenormalizada = denormalize(
    dataNormalizada.result,
    holdingSchema,
    dataNormalizada.entities
);

console.log(dataDenormalizada);

console.log(
    JSON.stringify(holding).length,
    JSON.stringify(dataNormalizada).length,
    JSON.stringify(dataDenormalizada).length
);
