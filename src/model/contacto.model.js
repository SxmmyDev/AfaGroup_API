const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection');

class Contacto extends Model{}

Contacto.init({
    contacto_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    correo_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true 
        }
    },
    numero_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudad_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mensaje : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Opcional: establece la fecha actual como valor por defecto
    }
},{
    sequelize,
    modelName: 'Contacto'
})

module.exports = Contacto