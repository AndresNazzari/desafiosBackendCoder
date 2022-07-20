import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    items: { type: Array },
    timestamp: { type: Date, default: Date.now },
});

export const Cart = mongoose.model('carts', CartSchema);
