import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    nombre: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default User = mongoose.model('user', UserSchema);
