import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const carritosCollection = 'carritos';

const carritoSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    productos: { type: Array, default: [] },
});

export const Carrito = mongoose.model(carritosCollection, carritoSchema);
