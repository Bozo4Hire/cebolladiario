// Importa la biblioteca mongoose
const mongoose = require('mongoose')

// Extrae la clase Schema de mongoose
const { Schema } = mongoose

// Define un nuevo esquema para la colección de usuarios
const userSchema = new Schema({
    // Nombre del usuario
    name: String,
    // Dirección de correo electrónico del usuario
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Contraseña del usuario
    password: String
}, {
    // Opciones adicionales del esquema
    timestamps: true
});

// Crea un modelo basado en el esquema
const UserModel = mongoose.model('User', userSchema);

// Exporta el modelo para su uso en otras partes de la aplicación
module.exports = UserModel;
