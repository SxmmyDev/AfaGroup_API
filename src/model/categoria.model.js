const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión

class Categoria extends Model{}

Categoria.init({
    categoria_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    categoria_name: {
        type: DataTypes.STRING,
        allowNull: false, //no puede ser null
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false, //no puede ser null
    }
},{
    sequelize, //conexion
    modelName: 'Categoria',
}
);

module.exports = Categoria