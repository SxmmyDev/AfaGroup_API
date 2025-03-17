const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión

class CotizacionWeb extends Model{}

CotizacionWeb.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_cambio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    punto_venta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    razon_social: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nombre_contacto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni_persona: {
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
    forma_pago: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dias_ofertas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    moneda: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendedor_trabajador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productos: {
        type: DataTypes.JSON, 
        allowNull: false
    },
    total_precio_productos: {
        type: DataTypes.FLOAT, 
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CotizacionWeb'
});

module.exports = CotizacionWeb;