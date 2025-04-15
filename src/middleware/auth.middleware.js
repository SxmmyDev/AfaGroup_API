const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const verifyToken = async (req, res, next) => {
    try {
        // Obtener el token del header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'Acceso denegado. Token no proporcionado'
            });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_super_seguro');
        
        // Buscar el usuario
        const user = await User.findOne({ where: { user_id: decoded.user_id } });
        
        if (!user || !user.is_active) {
            return res.status(401).json({
                ok: false,
                message: 'Usuario no encontrado o inactivo'
            });
        }
        
        // Añadir usuario a la request
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token inválido'
        });
    }
};

// Middleware para verificar si es admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            ok: false,
            message: 'Acceso denegado. Se requieren permisos de administrador'
        });
    }
};

module.exports = { verifyToken, isAdmin };