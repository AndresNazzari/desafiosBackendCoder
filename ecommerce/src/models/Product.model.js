import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    discountPercentage: { type: Number },
    rating: { type: Number },
    stock: { type: Number },
    brand: { type: String },
    category: { type: String },
    thumbnail: { type: String },
});

export const Product = mongoose.model('products', ProductSchema);
