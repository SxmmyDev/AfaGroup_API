const router = require('express').Router()
const jwt = require('jsonwebtoken');
const User = require('../model/user.model')
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { validateRegister, validateLogin } = require('../middleware/validators');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../../config/config');

// Generador de tokenS
const generateToken = (user) => {
    return jwt.sign(
        { 
            user_id: user.user_id,
            user_name: user.user_name,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

// Obtener todos los usuarios (solo admin)
router.get("/usuarios", verifyToken, isAdmin, async(req, res) => {
    try {
        // Excluimos la contraseña en la respuesta
        const usuarios = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        
        return res.status(200).json({
            ok: true,
            status: 200,
            body: usuarios
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor'
        });
    }
});

// Login
router.post('/login', validateLogin, async (req, res) => {
    try {
        const { user_correo, password } = req.body;
        
        // Buscar usuario por correo
        const user = await User.findOne({ where: { user_correo } });
        
        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({
                ok: false,
                message: 'Credenciales inválidas'
            });
        }
        
        // Verificar si el usuario está activo
        if (!user.is_active) {
            return res.status(401).json({
                ok: false,
                message: 'La cuenta ha sido desactivada'
            });
        }
        
        // Verificar contraseña
        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
            return res.status(401).json({
                ok: false,
                message: 'Credenciales inválidas'
            });
        }
        
        // Generar token
        const token = generateToken(user);
        
        return res.status(200).json({
            ok: true,
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                user_correo: user.user_correo,
                role: user.role
            },
            token
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor'
        });
    }
});

// Registro
router.post('/register', validateRegister, async (req, res) => {
    try {
        const { user_name, user_correo, password } = req.body;
        
        // Verificar si el correo ya está registrado
        const existingEmail = await User.findOne({ where: { user_correo } });
        if (existingEmail) {
            return res.status(400).json({
                ok: false,
                message: 'El correo electrónico ya está registrado'
            });
        }
        
        // Verificar si el nombre de usuario ya está registrado
        const existingUsername = await User.findOne({ where: { user_name } });
        if (existingUsername) {
            return res.status(400).json({
                ok: false,
                message: 'El nombre de usuario ya está en uso'
            });
        }
        
        // Crear el usuario
        const newUser = await User.create({
            user_name,
            user_correo,
            password
        });
        
        // Generar token
        const token = generateToken(newUser);
        
        return res.status(201).json({
            ok: true,
            message: 'Usuario registrado con éxito',
            user: {
                user_id: newUser.user_id,
                user_name: newUser.user_name,
                user_correo: newUser.user_correo,
                role: newUser.role
            },
            token
        });
        
    } catch (error) {
        console.error('Error en registro:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor'
        });
    }
});

// Logout (invalidación de token en el cliente)
router.post('/logout', verifyToken, async (req, res) => {
    // En una API REST, el logout se maneja principalmente en el cliente
    // eliminando el token almacenado, pero podemos devolver una respuesta
    return res.status(200).json({
        ok: true,
        message: 'Sesión cerrada con éxito'
    });
    
    // Nota: Para una invalidación real del token, necesitaríamos implementar
    // una lista negra de tokens o usar tokens de corta duración con refresh tokens
});

router.delete("/usuarios/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const deleteUser = await Users.destroy({
        where: {
            user_id: id
        }
    });
    res.status(204).json({
        ok: true,
        status: 204,
        body: deleteUser
    })
})

module.exports = router;