const router = require('express').Router()
const multer = require('multer');
const path = require('path');
const ProductoAG = require('../model/productoAG.model')

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para la imagen
    }
});

const upload = multer({ storage });

router.get("/productoAG", async(req, res) => {
    const producto = await ProductoAG.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: producto
    })
});

router.get("/productoAG/:producto_id", async(req, res) => {
    const id = req.params.producto_id;
    const producto = await ProductoAG.findOne({
        where: {
            producto_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: producto
    })
});

router.post("/productoAG", upload.single('imagen_url'), async (req, res) => {
    try {
        await ProductoAG.sync();

        const {categoria_id, nombre_producto, codigo_sunat, tipo_producto, tipo_existencia,compra, kardex, nombre_comercial, stock_minimo,stock_maximo, peso } = req.body;

        const imagen_url = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

        const createProducto = await ProductoAG.create({
            categoria_id, nombre_producto, codigo_sunat, tipo_producto, tipo_existencia,compra, kardex, nombre_comercial, stock_minimo,stock_maximo, peso, imagen_url
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Producto creado", 
            body: createProducto          
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error al crear producto",
            error: error.message
        });
    }
});

router.put("/productoAG/:producto_id", async (req, res) => {
    const id = req.params.producto_id;
    const dataProducto = req.body
    const producto_edit = await ProductoAG.update({
        categoria_id: dataProducto.categoria_id,
        nombre_producto: dataProducto.nombre_producto,
        codigo_sunat: dataProducto.codigo_sunat,
        tipo_producto: dataProducto.tipo_producto,
        tipo_existencia: dataProducto.tipo_existencia,
        compra: dataProducto.compra,
        kardex: dataProducto.kardex,
        nombre_comercial: dataProducto.nombre_comercial,
        stock_minimo: dataProducto.stock_minimo,
        stock_maximo: dataProducto.stock_maximo,
        peso: dataProducto.peso
    }, {
        where: {
            producto_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: producto_edit
    })
});

router.delete("/productoAG/:producto_id", async (req, res) => {
    const id = req.params.producto_id;
    const deleteProducto = await ProductoAG.destroy({
        where: {
            producto_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteProducto
    })
});

module.exports = router;
const express = require('express');
