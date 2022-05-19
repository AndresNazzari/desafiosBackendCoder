const { normalize, schema } = require('normalizr');

const authorSchema = new schema.Entity('author');
const messageSchema = new schema.Entity('message', {
    author: authorSchema,
});
const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema],
});

export { messagesSchema };
