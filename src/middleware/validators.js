const { check, validationResult } = require('express-validator');

const validateRegister = [
    check('user_name')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    
    check('user_correo')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    
    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.array()
            });
        }
        next();
    }
];

const validateLogin = [
    check('user_correo')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    
    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = { validateRegister, validateLogin };