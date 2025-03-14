const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión
const productoAG = require('../model/productoAG.model');

class Carrito extends Model{}

Carrito.init({
    carrito_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    producto_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: productoAG, 
            key: 'producto_id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ocupacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Carrito'
});

Carrito.belongsTo(productoAG, { foreignKey: 'producto_id' });
productoAG.hasMany(Carrito, { foreignKey: 'producto_id' });

module.exports = Carrito;