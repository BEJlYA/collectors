const { DataTypes, Model } = require("@sequelize/core")
const sequelize = require('../config/database');

class Users extends Model {}
Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 20]
        }
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'password_hash'
    },
    role: {
        type: DataTypes.ENUM('USER', 'TECH', 'MODER', 'GARANT', 'ADMIN'),
        allowNull: false,
        defaultValue: 'USER'
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        columnName: 'phone_number'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    activationLink: {
        type: DataTypes.STRING,
        columnName: 'activation_link',
        unique: true
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        columnName: 'is_activated'
    },
    firstName: {
        type: DataTypes.STRING,
        columnName: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        columnName: 'last_name'
    },
    geo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avatarUrl: {
        type: DataTypes.STRING,
        defaultValue: 'default-avatar.png',
        columnName: 'avatar_url'
    },
    categories: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.00
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
})

module.exports = Users