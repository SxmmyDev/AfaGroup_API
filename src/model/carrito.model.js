const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión

class Carrito extends Model{}

Carrito.init({
    carrito_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    productos: {
        type: DataTypes.JSON, // Guarda los productos como un array en formato JSON
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ocupacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Carrito'
});

module.exports = Carrito;