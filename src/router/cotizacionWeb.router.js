const router = require('express').Router()
const CotizacionWeb = require('../model/cotizacionWeb.model')

router.get("/cotizacionw/", async (req, res) => {
    const cotizacionw = await CotizacionWeb.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: cotizacionw
    })
});

router.get("/cotizacionw/:id/", async (req, res) => {
    const id = req.params.id;
    const cotizacionw = await CotizacionWeb.findOne({
        where: {
            id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: cotizacionw
    })
});

router.post("/cotizacionw/", async (req, res) => {
    try {
        await CotizacionWeb.sync();

        const {
            carrito_id,
            periodo,
            serie,
            numero,
            fecha,
            tipo_cambio,
            punto_venta,
            razon_social,
            ruc,
            nombre_contacto,
            dni_persona,
            email,
            telefono,
            forma_pago,
            dias_ofertas,
            moneda,
            observaciones,
            productos,
            total_precio_productos,
            estado,
            user_id,
            fecha_asignacion,
            fecha_finalizacion
        } = req.body;

        // Create the CotizacionWeb entry with the new structure
        const createCotizacion = await CotizacionWeb.create({
            carrito_id,
            periodo,              // Periodo
            serie,
            numero,
            fecha,                // Fecha
            tipo_cambio,          // Tipo de cambio
            punto_venta,          // Punto de venta
            razon_social,        // Razón social
            ruc,                  // RUC
            nombre_contacto,      // Nombre del contacto
            dni_persona,          // DNI de la persona
            email,                // Correo electrónico
            telefono,             // Teléfono
            forma_pago,           // Forma de pago
            dias_ofertas,         // Días de ofertas
            moneda,               // Moneda
            observaciones,        // Observaciones
            productos,            // Productos (en formato JSON)
            total_precio_productos, // Total del precio de los productos
            estado,
            user_id,
            fecha_asignacion,
            fecha_finalizacion
        });

        // Return a successful response
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Cotización creada exitosamente",
            cotizacion: createCotizacion
        });
    } catch (error) {
        // Return an error response
        res.status(500).json({
            ok: false,
            message: "Error al crear cotización",
            error: error.message
        });
    }
});
router.put("/cotizacionw/:id/", async (req, res) => {
    const id = req.params.id;
    const dataCotizacion = req.body
    const carritoEdit = await Carrito.update({
        carrito_id: dataCotizacion.carrito_id,
        periodo: dataCotizacion.periodo,                // Update periodo
        serie: dataCotizacion.serie,
        numero: dataCotizacion.numero,
        fecha: dataCotizacion.fecha,                    // Update fecha
        tipo_cambio: dataCotizacion.tipo_cambio,        // Update tipo_cambio
        punto_venta: dataCotizacion.punto_venta,        // Update punto_venta
        razon_social: dataCotizacion.razon_social,      // Update razon_social
        ruc: dataCotizacion.ruc,                        // Update ruc
        nombre_contacto: dataCotizacion.nombre_contacto,// Update nombre_contacto
        dni_persona: dataCotizacion.dni_persona,        // Update dni_persona
        email: dataCotizacion.email,                    // Update email
        telefono: dataCotizacion.telefono,              // Update telefono
        forma_pago: dataCotizacion.forma_pago,          // Update forma_pago
        dias_ofertas: dataCotizacion.dias_ofertas,      // Update dias_ofertas
        moneda: dataCotizacion.moneda,                  // Update moneda
        observaciones: dataCotizacion.observaciones,    // Update observaciones
        productos: dataCotizacion.productos,            // Update productos (JSON array)
        total_precio_productos: dataCotizacion.total_precio_productos,
        estado: dataCotizacion.estado,
        user_id: dataCotizacion.user_id,
        fecha_asignacion: dataCotizacion.fecha_asignacion,
        fecha_finalizacion: dataCotizacion.fecha_finalizacion
    }, {
        where: {
            id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: carritoEdit
    })
});

router.delete("/cotizacionw/:id/", async (req, res) => {
    const id = req.params.id;
    const deleteCarrito = await CotizacionWeb.destroy({
        where: {
            id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteCarrito
    })
});

module.exports = router;
