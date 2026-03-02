const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database');

class Token extends Model {
}

Token.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        columnName: 'user_id'
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        columnName: 'refresh_token',
        unique: true
    }
}, {
    sequelize,
    modelName: 'Token',
    tableName: 'token',
    timestamps: false
})

module.exports = Token