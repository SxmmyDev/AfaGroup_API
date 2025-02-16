const router = require('express').Router()
const Categoria = require('../model/categoria.model')

router.get("/categoria/", async (req, res) => {
    const categoria = await Categoria.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: categoria
    })
})

router.get("/categoria/:categoria_id/", async (req, res) => {
    const id = req.params.categoria_id;
    const categoria = await Categoria.findOne({
        where: {
            categoria_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: categoria
    })
})

router.post("/categoria/", async (req, res) => {
    try {
        await Categoria.sync();

        const { categoria_name, description } = req.body;

        const createCategoria = await Categoria.create({
            categoria_name,
            description
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "User created successfully",
            user: createCategoria 
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error creating user",
            error: error.message
        });
    }
});

router.put("/categoria/:categoria_id/", async (req, res) => {
    const id = req.params.categoria_id;
    const dataCategoria = req.body
    const categoriaEdit = await Categoria.update({
        categoria_name: dataCategoria.categoria_name,
        description: dataCategoria.description
    },{
        where: {
            categoria_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: categoriaEdit
    })
})

router.delete("/categoria/:categoria_id/", async (req, res) => {
    const id = req.params.categoria_id;
    const deleteCategory = await Categoria.destroy({
        where: {
            categoria_id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: deleteCategory
    })
})

module.exports = router;