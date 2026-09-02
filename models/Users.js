const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database')
const crypto = require('crypto')

class Users extends Model {
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        columnName: 'phone_number',
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: true,
        columnName: 'password_hash'
    },
    oauthProvider: {
        type: DataTypes.ENUM('google', 'yandex'),
        allowNull: true,
        columnName: 'oauth_provider'
    },
    oauthId: {
        type: DataTypes.STRING,
        columnName: 'oauth_id',
        unique: true,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('USER', 'TECH', 'MODER', 'GARANT', 'ADMIN'),
        allowNull: false,
        defaultValue: 'USER'
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
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        columnName: 'is_blocked'
    },
    complainsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    publicId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: () => crypto.randomUUID(),
        columnName: 'public_id'
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
})

module.exports = Users