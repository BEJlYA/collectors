const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database')

class Feedbacks extends Model {
}

Feedbacks.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'from_user_id'
    },
    targetUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'target_user_id'
    },
    initiatorType: {
        type: DataTypes.ENUM('SELLER', 'BUYER'),
        allowNull: false,
        columName: 'initiator_type'
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        columnName: 'created_at'
    }
}, {
    sequelize,
    modelName: 'Feedbacks',
    tableName: 'feedbacks',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['from_user_id', 'target_user_id']
        }
    ]
})

module.exports = Feedbacks