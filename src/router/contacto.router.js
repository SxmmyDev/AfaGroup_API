const router = require('express').Router()
const Contacto = require('../model/contacto.model')

router.get("/contacto/", async (req, res) => {
    const contacto = await Contacto.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: contacto
    })
})

router.get("/contacto/:contacto_id", async (req, res) => {
    const id = req.params.contacto_id;
    const contacto = await Contacto.findOne({
        where: {
            contacto_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: contacto
    })
})

router.post("/contacto", async (req, res) => {
    try{
        await Contacto.sync();
        const {nombre_usuario, correo_usuario, numero_usuario, ciudad_usuario,
            mensaje, fecha
        } = req.body;
        const createContacto = await Contacto.create({
            nombre_usuario, correo_usuario, numero_usuario, ciudad_usuario,
            mensaje, fecha
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Contac created successfully",
            user: createContacto 
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error creating user",
            error: error.message
        });
    }
});

module.exports = router;