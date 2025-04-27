const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión
const Carrito = require('../model/carrito.model');
const User_afa = require('../model/user.model')

class CotizacionWeb extends Model{}

CotizacionWeb.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    carrito_id:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Carrito, 
            key: 'carrito_id'
        }
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serie: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "001"
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        defaultValue: 1  // Si no hay registros, empieza en 1
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
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDIENTE' // Valores posibles: PENDIENTE, EN_PROCESO, FINALIZADO
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User_afa, 
            key: 'user_id'
        }
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_finalizacion: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'CotizacionWeb'
});

CotizacionWeb.beforeCreate(async (cotizacion, options) => {
    const lastCotizacion = await CotizacionWeb.findOne({
        order: [['numero', 'DESC']]
    });

    cotizacion.numero = lastCotizacion ? lastCotizacion.numero + 1 : 1;
});

CotizacionWeb.belongsTo(Carrito, { foreignKey: 'carrito_id' });
Carrito.hasMany(CotizacionWeb, { foreignKey: 'carrito_id' });

CotizacionWeb.belongsTo(User_afa, { foreignKey: 'user_id' });
User_afa.hasMany(CotizacionWeb, { foreignKey: 'user_id' });

module.exports = CotizacionWeb;