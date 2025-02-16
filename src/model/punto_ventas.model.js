const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión

class PuntoV extends Model {}

PuntoV.init({
    puntoV_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    puntoV: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    ubicación: {
        type: DataTypes.STRING,
        allowNull: false, 
    }
}, {
    sequelize,
    modelName: 'PuntoV'
})

module.exports = PuntoV
