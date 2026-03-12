const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database');

class Messages extends Model {
}

Messages.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'item_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'user_id'
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        columnName: 'is_read'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        columnName: 'created_at'
    }
}, {
    sequelize,
    modelName: 'Messages',
    tableName: 'messages',
    timestamps: false
})

module.exports = Messages