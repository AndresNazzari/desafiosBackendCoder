import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productosCollection = 'productos';

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const Producto = mongoose.model(productosCollection, productoSchema);
