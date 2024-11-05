// src/db/connection.js
const { Sequelize } = require('sequelize');

// Configurar la conexión a la base de datos
const sequelize = new Sequelize('api-afa', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

module.exports = sequelize;
