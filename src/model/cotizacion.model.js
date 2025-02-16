const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión
const PuntoV = require('../model/punto_ventas.model');
const Cliente = require('../model/cliente.model');
const Producto = require('../model/producto.model');
const Vendedor = require('../model/user.model');


class Cotizacion extends Model{}

Cotizacion.init({
    cotizacion_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    punto_venta:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: PuntoV, 
            key: 'puntoV_id'
        }
    },
    cliente : {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Cliente, 
            key: 'cliente_id'
        }
    },
    forma_pago: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modena : {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendedor : {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Vendedor, 
            key: 'user_id'
        }
    }

})

