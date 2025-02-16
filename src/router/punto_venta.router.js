const router = require('express').Router()
const PuntoV = require('../model/punto_ventas.model')

router.get("/punto_venta/", async (req, res) => {
    const punto_venta = await PuntoV.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: punto_venta
    })
});

router.get("/punto_venta/:puntoV_id", async (req, res) => {
    const id = req.params.puntoV_id;
    const punto_venta = await PuntoV.findOne({
        where: {
            puntoV_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: punto_venta
    })
});

router.post("/punto_venta", async (req, res) => {
    try{
        await PuntoV.sync();
        const { puntoV, ubicación } = req.body;
        const createPuntoV = await PuntoV.create({
            puntoV, ubicación
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Punto de venta creado",
            user: createPuntoV 
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error creating PuntoV",
            error: error.message
        });
    }
});

router.put("/punto_venta/:puntoV_id", async (req, res) => {
    const id = req.params.puntoV_id;
    const dataPuntoV = req.body
    const PuntoVEdit = await PuntoV.update({
        puntoV : dataPuntoV.puntoV,
        ubicación: dataPuntoV.ubicación
    },{
        where: {
            puntoV_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: PuntoVEdit
    })
});

router.delete("/punto_venta/:puntoV_id", async (req, res) => {
    const id = req.params.puntoV_id;
    const deletePuntoV = await PuntoV.destroy({
        where: {
            puntoV_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: deletePuntoV
    })
});

module.exports = router;