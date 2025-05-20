// src/db/connection.js
const { Sequelize } = require('sequelize');

// Configurar la conexión a la base de datos
const sequelize = new Sequelize('mysql://root:YlNUItncLnBCTnNWiZWQjKVaUMlxxusW@metro.proxy.rlwy.net:41040/railway', {
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
