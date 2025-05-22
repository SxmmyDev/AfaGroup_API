const express = require('express');
const morgan = require('morgan'); //antes de las rutas para que lea las petciones http
const cors = require('cors');
const router = require('../router');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: [
    'http://localhost:4200',
    'https://appafagroup-ner5.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//muy importante
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("estas en expjjress")
});

app.use("/api/v1/", router)
// En app.js
app.use('/uploads', express.static('uploads'));

module.exports = app;
