const router = require('express').Router()
const Carrito = require('../model/carrito.model')

router.get("/carrito/", async (req, res) => {
    const carrito = await Carrito.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: carrito
    })
});

router.get("/carrito/:carrito_id/", async (req, res) => {
    const id = req.params.carrito_id;
    const carrito = await Carrito.findOne({
        where: {
            carrito_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: carrito
    })
});

router.post("/carrito/", async (req, res) => {
    try{
        await Carrito.sync();

        const {producto_id,cantidad, nombre_cliente, telefono, dni, ruc, correo, ocupacion, direccion, estado} = req.body;

        const createCarrito = await Carrito.create({
            producto_id,cantidad, nombre_cliente, telefono, dni, ruc, correo, ocupacion, direccion, estado
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Carrito created successfully",
            user: createCarrito
        });
    } catch(error){
        res.status(500).json({
            ok: false,
            message: "Error al crear usuario",
            error: error.message
        });
    }
});

router.put("/carrito/:carrito_id/", async (req, res) => {
    const id = req.params.carrito_id;
    const dataCarrito = req.body
    const carritoEdit = await Carrito.update({
        producto_id: dataCarrito.producto_id,
        cantidad: dataCarrito.cantidad,
        nombre_cliente: dataCarrito.nombre_cliente,
        telefono: dataCarrito.telefono,
        dni: dataCarrito.dni,
        ruc: dataCarrito.ruc,
        correo: dataCarrito.correo,
        ocupacion: dataCarrito.ocupacion,
        direccion: dataCarrito.direccion,
        estado: dataCarrito.estado
    }, {
        where: {
            carrito_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: carritoEdit
    })
});

router.delete("/carrito/:carrito_id/", async (req, res) => {
    const id = req.params.carrito_id;
    const deleteCarrito = await Carrito.destroy({
        where: {
            carrito_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteCarrito
    })
});

module.exports = router;