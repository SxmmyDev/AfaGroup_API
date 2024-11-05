const express = require('express');
const categoriaRouter = require('./categoria.router');
const usuariosRouter = require('./usuarios.router');
const contactoRouter = require('./contacto.router');

const router = express.Router();

// Usa las rutas de categoria y usuarios
router.use('/', categoriaRouter);
router.use('/', usuariosRouter);
router.use('/', contactoRouter)

module.exports = router;
