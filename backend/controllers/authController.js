const User = require('../models/user');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('prueba exitosa');
}

// Endpoint de registro
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica si se ingresó un nombre
        if (!name) {
            return res.json({
                error: 'Se requiere un nombre'
            })
        };

        // Verifica si la contraseña es válida
        if (!password || password.length < 8) {
            return res.json({
                error: 'Se requiere una contraseña y debe tener al menos 8 caracteres'
            })
        };

        // Verifica el correo electrónico
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'El correo electrónico ya existe'
            })
        }


        const user = await User.create({
            name,
            email,
            password
        })

        // Verifica si se ingresó un correo electrónico
        if (!email) {
            return res.json({
                error: 'Se requiere un correo electrónico'
            })
        };

        return res.json(user)
    } catch (error) {
        console.log(error);
    }
}

// Endpoint de inicio de sesión
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'Usuario no encontrado'
            })
        }

        // Verifica si las contraseñas coinciden
        const match = password === user.password;

        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                res.cookie('token', token).json(user)
            })
        }
        if (!match) {
            return res.json({
                error: "Las contraseñas no coinciden"
            })
        }

    } catch (error) {
        console.log(error)
    }
}

// Obtiene el perfil del usuario
const getProfile = (req, res) => {
    const { token } = req.cookies

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}
