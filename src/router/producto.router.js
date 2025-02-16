const router = require('express').Router()
const Producto = require('../model/producto.model')

router.get("/producto", async(req, res) => {
    const producto = await Producto.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: producto
    })
});

router.get("/producto/:producto_id", async(req, res) => {
    const id = req.params.producto_id;
    const producto = await Producto.findOne({
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

router.post("/producto", async(req, res) => {
    try {
        await Producto.sync();

        const {categoria_id, nombre_producto, codigo_sunat, tipo_producto, tipo_existencia,compra, kardex, nombre_comercial, stock_minimo,stock_maximo, peso } = req.body;

        const createProducto = await Producto.create({
            categoria_id, nombre_producto, codigo_sunat, tipo_producto, tipo_existencia,compra, kardex, nombre_comercial, stock_minimo,stock_maximo, peso 
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Producto creado",           
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "error al crear producto",
            error: error.message
        });
    }
});

router.put("/producto/:producto_id", async (req, res) => {
    const id = req.params.producto_id;
    const dataProducto = req.body
    const producto_edit = await Producto.update({
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

router.delete("/producto/:producto_id", async (req, res) => {
    const id = req.params.producto_id;
    const deleteProducto = await Producto.destroy({
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