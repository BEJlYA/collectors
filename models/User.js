const { DataTypes, Model } = require("@sequelize/core")

const sequelize = require('../config/database');

class User extends Model {}
    User.init({
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
                len: [3, 50]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'USER'
            // user, technical, moder, garant, admin
        },
        phoneNumber: {
            type: DataTypes.STRING,
            unique: true,
            field: 'phone_number'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        geo: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING,
            defaultValue: 'none'
            // add default image
        },
        categories: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true
    })

module.exports = User