const router = require('express').Router()
const Cliente = require('../model/cliente.model')

router.get("/cliente/", async (req, res) => {
    const cliente = await Cliente.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: cliente
    })
});

router.get("/cliente/:cliente_id/", async (req, res) => {
    const id = req.params.cliente_id;
    const cliente = await Cliente.findOne({
        where: {
            cliente_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: cliente
    })
});

router.post("/cliente/", async (req, res) => {
    try{
        await Cliente.sync();

        const {codigo_ruc,tipo_persona, razon_social, tipo_empleador, documento_ruc, nro_dni, nombre_persona, pais, direccion, telefono, correo} = req.body;

        const createCliente = await Cliente.create({
            codigo_ruc,tipo_persona, razon_social, tipo_empleador, documento_ruc, nro_dni, nombre_persona, pais, direccion, telefono, correo
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Cliente created successfully",
            user: createCliente
        });
    } catch(error){
        res.status(500).json({
            ok: false,
            message: "Error al crear usuario",
            error: error.message
        });
    }
});

router.put("/cliente/cliente_id/", async (req, res) => {
    const id = req.params.cliente_id;
    const dataCliente = req.body
    const clienteEdit = await Cliente.update({
        codigo_ruc: dataCliente.codigo_ruc,
        tipo_persona: dataCliente.tipo_persona,
        razon_social: dataCliente.razon_social,
        tipo_empleador: dataCliente.tipo_empleador,
        documento_ruc: dataCliente.documento_ruc,
        nro_dni: dataCliente.nro_dni,
        nombre_persona: dataCliente.nombre_persona,
        pais: dataCliente.pais,
        direccion: dataCliente.direccion,
        telefono: dataCliente.telefono,
        correo: dataCliente.correo
    }, {
        where: {
            cliente_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: clienteEdit
    })
});

router.delete("/cliente/cliente_id/", async (req, res) => {
    const id = req.params.cliente_id;
    const deleteCliente = await Cliente.destroy({
        where: {
            cliente_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteCliente
    })
});

module.exports = router;


