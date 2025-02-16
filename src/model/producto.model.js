const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión
const Categoria = require('../model/categoria.model'); // Importar el modelo Categoria

class Producto extends Model{}

Producto.init({
    producto_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    categoria_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Categoria, 
            key: 'categoria_id'
        }
    },
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_sunat :{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    tipo_producto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_existencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    compra: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kardex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre_comercial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock_minimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // validate: {
        //     isInt: true  // Asegura que el valor sea un número entero
        // }
    },
    stock_maximo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // validate: {
        //     isInt: true  // Asegura que el valor sea un número entero
        // }
    },
    peso: { 
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    
}, {
    sequelize,
    modelName: 'Producto'
});

// Definir las asociaciones entre modelos
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id' });
Categoria.hasMany(Producto, { foreignKey: 'categoria_id' });

module.exports = Producto;

