// Importa la biblioteca mongoose
const mongoose = require('mongoose')

// Extrae la clase Schema de mongoose
const { Schema } = mongoose

// Define un nuevo esquema para la colección de entradas
const entrySchema = new mongoose.Schema({
    // Contenido de la entrada
    content: {
        type: String,
        required: true
    },
    // Fecha de la entrada, se establece por defecto como la fecha actual
    date: {
        type: Date,
        default: Date.now
    },
    // ID del usuario que creó la entrada
    user_id: {
        type: String,
        required: true
    },
    // Nombre del usuario que creó la entrada
    name: {
        type: String,
        required: true
    },
    // ID de la canción asociada a la entrada (opcional)
    song_id: {
        type: String
    },
    // Nombre de la canción asociada a la entrada (opcional)
    song_name: {
        type: String
    },
    // URL de la canción asociada a la entrada (opcional)
    song_url: {
        type: String
    },
    // URL de la imagen de la canción asociada a la entrada (opcional)
    song_ic_url: {
        type: String
    }
}, {
    // Opciones adicionales del esquema
    timestamps: true
});

// Crea un modelo basado en el esquema
const EntryModel = mongoose.model('Entry', entrySchema);

// Exporta el modelo para su uso en otras partes de la aplicación
module.exports = EntryModel;
