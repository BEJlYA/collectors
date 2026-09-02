const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database')

class Tokens extends Model {
}

Tokens.init({
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
    modelName: 'Tokens',
    tableName: 'tokens',
    timestamps: false
})

module.exports = Tokens