// Importando el modelo 'Entries'
const Entries = require('../models/entry')

// Función de prueba para verificar si el servidor está funcionando
const test = (req, res) => {
    res.json('prueba exitosa')
}

// Obtener entradas asociadas a un ID de usuario específico
const getEntries = async (req, res) => {
    try {
        console.log(req.params.id) // Registrar el ID de usuario desde los parámetros de la solicitud
        const entries = await Entries.find({ user_id: req.query.id }) // Encontrar entradas en la base de datos basadas en el ID de usuario
        console.log(entries) // Registrar las entradas encontradas
        res.json(entries) // Responder con las entradas encontradas en formato JSON
    } catch (err) {
        return res.status(500).json({ msg: err.message }) // Manejar cualquier error que ocurra durante el proceso
    }
}

// Obtener una entrada específica basada en su ID
const getEntry = async (req, res) => {
    try {
        const entry = await Entries.findById(req.params.id) // Encontrar una entrada en la base de datos basada en su ID
        res.json(entry) // Responder con la entrada encontrada en formato JSON
    } catch (err) {
        return res.status(500).json({ msg: err.message }) // Manejar cualquier error que ocurra durante el proceso
    }
}

// Crear una nueva entrada
const createEntry = async (req, res) => {
    try {
        const { content, user_id, name, song_id, song_name, song_url, song_ic_url, date } = req.body; // Desestructurar datos desde el cuerpo de la solicitud
        const newEntry = new Entries({ // Crear una nueva instancia de entrada
            content,
            date,
            user_id,
            name,
            song_id,
            song_name,
            song_url,
            song_ic_url
        })

        if (!content) {
            return res.json({
                error: 'Escribe algo primero, pequeño Timmy' // Responder con un mensaje de error si el contenido está vacío
            })
        }

        await newEntry.save() // Guardar la nueva entrada en la base de datos
        res.json({ msg: "Se creó una entrada" }) // Responder con un mensaje de éxito
    } catch (err) {
        return res.status(500).json({ msg: err.message }) // Manejar cualquier error que ocurra durante el proceso
    }
}

// Eliminar una entrada específica basada en su ID
const deleteEntry = async (req, res) => {
    try {
        await Entries.findByIdAndDelete(req.params.id) // Eliminar la entrada de la base de datos basada en su ID
        res.json({ msg: "Se eliminó una entrada" }) // Responder con un mensaje de éxito
    } catch (err) {
        return res.status(500).json({ msg: err.message }) // Manejar cualquier error que ocurra durante el proceso
    }
}

// Exportar las funciones para usar en otras partes de la aplicación
module.exports = {
    test,
    getEntry,
    getEntries,
    createEntry,
    deleteEntry
}
