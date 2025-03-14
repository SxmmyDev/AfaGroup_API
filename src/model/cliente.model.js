const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión

class Cliente extends Model{}

Cliente.init({
    cliente_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    codigo_ruc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true, // Asegura que solo contenga números
            len: [8, 11],   // Acepta entre 8 y 11 caracteres
        },
    },
    tipo_persona:{
        type: DataTypes.STRING,
        allowNull: false, //no puede ser null
    },
    razon_social:{
        type: DataTypes.STRING,
        allowNull: false, //no puede ser null
    },
    tipo_empleador:{
        type: DataTypes.STRING,
        allowNull: false, //no puede ser null
    },
    documento_ruc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true, // Asegura que solo contenga números
            len: [8, 11],   // Acepta entre 8 y 11 caracteres
        },
    },
    nro_dni: {
        type: DataTypes.STRING,
        allowNull: true, // Permitir que sea nulo
        validate: {
            isNumeric: {
                msg: "El número de DNI debe contener solo números",
                args: true, // Asegura que solo contenga números, si no está vacío
            },
            len: {
                msg: "El DNI debe tener exactamente 8 caracteres",
                args: [8], // Asegura que tenga exactamente 8 caracteres, si no está vacío
            },
            notEmpty: {
                msg: "El DNI no puede estar vacío si se proporciona",
                args: false, // Permite valores vacíos, pero si hay algo, aplica las validaciones
            }
        }
    },
    nombre_persona: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pais:{
        type: DataTypes.STRING,
        allowNull: false, //no puede ser null
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false, //no puede ser null
    },
    telefono: {
        type: DataTypes.STRING,
        validate: {
            isNumeric: true, // Asegura que solo contenga números
            len: [9],   // Acepta entre 8 y 11 caracteres
        },
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true 
        }
    }
}, {
    sequelize,
    modelName: 'Cliente'
})

module.exports = Cliente