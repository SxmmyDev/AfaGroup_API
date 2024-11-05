const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = require('../db/connection'); // Importar la conexión

class User extends Model {}

User.init({
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_name:{
        type: DataTypes.STRING,
        allowNull: false, //no puede ser null
    },
    user_correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true // Valida que sea un email correcto
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    },{
        sequelize, //conexion
        modelName: 'User'
    }
);

module.exports = User;