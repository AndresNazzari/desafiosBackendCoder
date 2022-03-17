const fs = require("fs")

class Contenedor {
    constructor(file) {
        this.file = file
    }

    async save(obj) {
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        // El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último 
        // objeto agregado(o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
        try {
            const productos = await this.getAll()
            let id
            if (productos.length > 0) {
                id = productos[productos.length - 1].id + 1
            } else {
                id = 1
            }
            const newProduct = { ...obj, id }
            productos.push(newProduct)
            await fs.promises.writeFile(this.file, JSON.stringify(productos, null, 2))
            return newProduct
        } catch (error) {
            throw new Error(`Error en Save! ${error.message}`)
        }
    }

    async updateItem(id,obj) {
        // actualiza item
        try {
            const productos = await this.getAll()
            const newPorducts = productos.map(producto => producto.id ==id?{...producto, ...obj}:producto) 
            await fs.promises.writeFile(this.file, JSON.stringify(newPorducts, null, 2))
            return {"msg":"producto actualizado"}
        } catch (error) {
            throw new Error(`Error en Update! ${error.message}`)
        }
    }

    async getById(id) {
        // Recibe un id y devuelve el objeto con ese id, o null si no está
        const archivo = await this.getAll()
        return archivo.find(producto => producto.id == id)
    }

    async deleteById(id) {
        // Elimina del archivo el objeto con el id buscado.
        const archivo = await this.getAll()
        const result = archivo.filter(producto => {
            return producto.id != id
        })
        try {
            fs.writeFileSync(this.file, JSON.stringify(result, null, 2))
            return {"msg":"item eliminado"}
        } catch (error) {
            throw new Error(`Error en Delete by ID! ${error.message}`)
        }
    }

    async getAll() {
        // Devuelve un array con los objetos presentes en el archivo.
        try {
            const archivo = await fs.promises.readFile(this.file, "utf-8")
            return JSON.parse(archivo)
        } catch (error) {
            return []
        }
    }
    async deleteAll() {
        // Elimina todos los objetos presentes en el archivo.
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error en Delete All! ${error.message}`)
        }
    }
}
module.exports = Contenedor

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
