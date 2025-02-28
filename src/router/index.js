const express = require('express');
const categoriaRouter = require('./categoria.router');
const usuariosRouter = require('./usuarios.router');
const contactoRouter = require('./contacto.router');
const clienteRouter = require('./cliente.router');
const productoRouter = require('./producto.router');
const puntoVRouter = require('./punto_venta.router');
const productRouter = require('./productoAG.router');

const router = express.Router();

// Usa las rutas de categoria y usuarios
router.use('/', categoriaRouter);
router.use('/', usuariosRouter);
router.use('/', contactoRouter);
router.use('/', clienteRouter);
router.use('/', productoRouter);
router.use('/', puntoVRouter);
router.use('/', productRouter);

module.exports = router;
