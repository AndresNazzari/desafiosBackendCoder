const fs = require('fs');
const messagesSchema = require('./schemas/messagesSchema');

class MessagesAPI {
    constructor(file) {
        this.file = file;
    }

    async save(obj) {
        try {
            const messages = await this.getAll();
            let id;
            if (messages.length > 0) {
                id = messages[messages.length - 1].id + 1;
            } else {
                id = 1;
            }
            const newMessage = { ...obj, id };

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
