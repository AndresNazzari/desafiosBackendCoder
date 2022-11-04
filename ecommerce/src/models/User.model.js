import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  adress: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleId: { type: Number, required: true },
});

export const User = mongoose.model('users', UserSchema);
