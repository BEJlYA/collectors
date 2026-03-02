const { DataTypes, Model } = require("@sequelize/core")
const sequelize = require('../config/database');

class ItemPhotos extends Model {}
ItemPhotos.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'item_id'
    },
    photoUrl: {
        type: DataTypes.STRING,
        columnName: 'photo_url',
        defaultValue: 'Not defined'
    },
    isPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        columnName: 'is_primary'
    },
    sortOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        columnName: 'sort_order'
    }
}, {
    sequelize,
    modelName: 'ItemPhotos',
    tableName: 'item_photos'
})

module.exports = ItemPhotos