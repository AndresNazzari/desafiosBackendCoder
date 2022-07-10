const mongoose = require('mongoose');

const CarritoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    items: { type: Array },
    timestamp: { type: Date, default: Date.now },
});

module.exports = Carrito = mongoose.model('carrito', CarritoSchema);
