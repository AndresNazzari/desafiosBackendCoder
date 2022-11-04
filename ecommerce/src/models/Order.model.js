import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [{ type: Object }],
  status: { type: String, default: 'generada' },
  timestamp: { type: Date, default: Date.now },
});

export const Order = mongoose.model('orders', OrderSchema);
