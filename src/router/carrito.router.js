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
    try {
        await Carrito.sync();

        const { 
            productos,
            empresa,
            nombre, 
            dni, 
            ruc, 
            ocupacion, 
            email, 
            telefono, 
            direccion 
        } = req.body;

        // Crear el carrito con la estructura actual
        const createCarrito = await Carrito.create({
            productos,        // Array de productos en formato JSON
            empresa,
            nombre,           // Nombre del cliente
            dni,              // DNI del cliente
            ruc,              // RUC del cliente
            ocupacion,        // Ocupación del cliente
            email,            // Correo electrónico
            telefono,         // Teléfono del cliente
            direccion         // Dirección del cliente
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Carrito created successfully",
            carrito: createCarrito
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al crear carrito",
            error: error.message
        });
    }
});


router.put("/carrito/:carrito_id/", async (req, res) => {
    const id = req.params.carrito_id;
    const dataCarrito = req.body
    const carritoEdit = await Carrito.update({
        producto_id: dataCarrito.producto_id,
        empresa: dataCarrito.empresa,
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