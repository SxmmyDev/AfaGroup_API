const express = require('express');
const morgan = require('morgan'); //antes de las rutas para que lea las petciones http

const router = require('../router');

const app = express();

//muy importante
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("estas en expjjress")
});

app.use("/api/v1/", router)

module.exports = app;