import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String },
});

export const Product = mongoose.model('products', ProductSchema);
