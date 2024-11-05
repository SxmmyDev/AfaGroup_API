const router = require('express').Router()

const Users = require('../model/user.model')

router.get("/usuarios", async(req, res) => {
    const usuarios = await Users.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: usuarios
    })
})

router.get("/usuarios/:user_id", async(req, res) => {
    const id = req.params.user_id;
    const usuario = await Users.findOne({
        where: {
            user_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: usuario
    });
})

router.post("/usuarios", async (req, res) => {
    try {
        // Aseguramos que la tabla esté sincronizada
        await Users.sync();

        // Capturamos los datos del body de la petición
        const { user_name, user_correo, password } = req.body;

        // Creamos el usuario en la base de datos
        const createUser = await Users.create({
            user_name,
            user_correo,
            password
        });

        // Respuesta exitosa
        res.status(201).json({
            ok: true,
            status: 201,
            message: "User created successfully",
            user: createUser // Enviamos los detalles del usuario creado
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            ok: false,
            message: "Error creating user",
            error: error.message
        });
    }
});

router.put("/usuarios/:user_id", async (req, res) => {
    const id = req.params.user_id
    const dataUser = req.body
    const userEdit = await Users.update({
        user_name: dataUser.user_name,
        user_correo: dataUser.user_correo,
        password: dataUser.password
    }, {
        where: {
            user_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: userEdit
    })
})

router.delete("/usuarios/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const deleteUser = await Users.destroy({
        where: {
            user_id: id
        }
    });
    res.status(204).json({
        ok: true,
        status: 204,
        body: deleteUser
    })
})

module.exports = router;