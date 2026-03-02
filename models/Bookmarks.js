const { DataTypes, Model } = require("@sequelize/core")
const sequelize = require('../config/database');

class Bookmarks extends Model {}
Bookmarks.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'user_id'
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'item_id'
    }
}, {
    sequelize,
    modelName: 'Bookmarks',
    tableName: 'bookmarks',
    timestamps: true
})

module.exports = Bookmarks