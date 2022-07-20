import mongoose, { Schema } from 'mongoose';

const CartSchema = new Schema({
    email: { type: String, required: true },
    items: { type: Array },
    timestamp: { type: Date, default: Date.now },
});

export default Cart = mongoose.model('cart', CartSchema);
