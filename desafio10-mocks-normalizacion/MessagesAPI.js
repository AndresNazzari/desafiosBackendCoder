const fs = require('fs');
const messagesSchema = require('./schemas/messagesSchema');

class MessagesAPI {
    constructor(file) {
        this.file = file;
    }

    async save(obj) {
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        // El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último
        // objeto agregado(o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
        try {
            const messages = await this.getAll();

            //obtengo data
            //desnormalizo
            //agrego nuevo mensaje
            //normalizo
            // grabo data

            let id;
            if (messages.length > 0) {
                id = messages[messages.length - 1].id + 1;
            } else {
                id = 1;
            }
            const newMessage = { ...obj, id };

            const dataNormalizada = normalize(newMessage, messagesSchema);
            console.log(dataNormalizada);

            messages.push(newMessage);
            await fs.promises.writeFile(
                this.file,
                JSON.stringify(messages, null, 2)
            );
            return newMessage;
        } catch (error) {
            throw new Error(`Error en Save! ${error.message}`);
        }
    }

    async getAll() {
        try {
            const archivo = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(archivo);
        } catch (error) {
            return [];
        }
    }
}

module.exports = MessagesAPI;
