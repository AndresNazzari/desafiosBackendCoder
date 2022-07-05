const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    items: { type: Array, required: true },
});

module.exports = Cart = mongoose.model('cart', CartSchema);
