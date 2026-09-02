const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database')

class Messages extends Model {
}

Messages.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    dealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'deal_id'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'user_id'
    },
    replyToId: {
        type: DataTypes.INTEGER,
        columnName: 'reply_to_id',
        allowNull: true
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
    isEdited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        columnName: 'is_edited'
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
    timestamps: false,
    indexes: [
        { fields: ['deal_id'] },
        { fields: ['deal_id', 'created_at'] }
    ]
})

module.exports = Messages