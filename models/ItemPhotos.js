const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database')

class ItemPhotos extends Model {
}

ItemPhotos.init({
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
    photoUrl: {
        type: DataTypes.STRING,
        columnName: 'photo_url',
        defaultValue: null
    },
    isPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        columnName: 'is_primary'
    },
    sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        columnName: 'sort_order'
    }
}, {
    sequelize,
    modelName: 'ItemPhotos',
    tableName: 'item_photos',
    timestamps: false
})

module.exports = ItemPhotos