class ProductosAPI {
    constructor() {
        this.productos = [];
    }

    save(obj) {
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        // El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último
        // objeto agregado(o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
        try {
            let id;
            if (this.productos.length > 0) {
                id = this.productos[this.productos.length - 1].id + 1;
            } else {
                id = 1;
            }
            const newProduct = { ...obj, id };
            this.productos.push(newProduct);
            return newProduct;
        } catch (error) {
            throw new Error(`Error en Save! ${error.message}`);
        }
    }

    updateItem(id, obj) {
        // actualiza item
        const index = this.productos.findIndex((producto) => producto.id == id);
        this.productos.splice(index, 1, { ...obj, id });
        return { msg: 'producto actualizado' };
    }

    getById(id) {
        // Recibe un id y devuelve el objeto con ese id, o null si no está
        return this.productos.find((producto) => producto.id == id);
    }

    deleteById(id) {
        // Elimina del archivo el objeto con el id buscado.
        const index = this.productos.findIndex((producto) => producto.id == id);
        if (index < 0) {
            return { msg: 'No existe el item' };
        } else {
            this.productos.splice(index, 1);
            return { msg: 'item eliminado' };
        }
    }

    getAll() {
        return this.productos;
    }

    deleteAll() {
        // Elimina todos los objetos presentes en el archivo.
        this.productos.splice(0, this.productos);
        return { msg: 'se han eliminado todos los productos' };
    }
}

module.exports = ProductosAPI;

// const prod1 = {
//     title: "Escuadra",
//     price: 123.45,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
// }
// const prod2 = {
//     title: "Calculadora",
//     price: 234.56,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
// }
// const prod3 = {
//     title: "Globo Terráqueo",
//     price: 345.67,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
// }
