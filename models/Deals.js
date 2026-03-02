const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database');

class Deals extends Model {
}

Deals.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    initiatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'initiator_id'
    },
    targetUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'target_user_id'
    },
    status: {
        type: DataTypes.ENUM('STARTED', 'IN PROGRESS', 'COMPLETED', 'CANCELED'),
        allowNull: false,
        defaultValue: 'STARTED'
    }
}, {
    sequelize,
    modelName: 'Deals',
    tableName: 'deals',
    timestamps: true
})

module.exports = Deals