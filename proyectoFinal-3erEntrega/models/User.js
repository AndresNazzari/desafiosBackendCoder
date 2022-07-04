const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //nombre, direccion, edad, telefono, avatar, email, password

    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    avatar: { type: String, required: true },
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

module.exports = User = mongoose.model('user', UserSchema);
