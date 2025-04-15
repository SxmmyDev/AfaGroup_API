const { Sequelize, Model, DataTypes } = require("sequelize")
const bcrypt = require('bcrypt');
const sequelize = require('../db/connection'); // Importar la conexión

class User_afa extends Model {
    // Método para comparar contraseñas
    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}

User_afa.init({
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Nombre de usuario único
        validate: {
            notEmpty: true,
            len: [3, 50] // Longitud mínima y máxima
        }
    },
    user_correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email único
        validate: {
            isEmail: true // Valida que sea un email correcto
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100] // Longitud mínima y máxima
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    },{
        sequelize, //conexion
        modelName: 'User',
        timestamps: true, // Agrega createdAt y updatedAt
        hooks: {
            // Antes de crear o actualizar, hasheamos la contraseña
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

module.exports = User_afa;