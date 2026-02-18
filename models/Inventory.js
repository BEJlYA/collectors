const { DataTypes, Model } = require("@sequelize/core")

const sequelize = require('../config/database');

class Inventory extends Model {}
    Inventory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        catalogItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'catalog_item_id'
        },
        condition: {
            type: DataTypes.ENUM('mint', 'excellent', 'good', 'fair', 'poor'),
            allowNull: false,
            defaultValue: 'good'
        },
        isForTrade: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_for_trade'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        },
        photoUrls: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            field: 'photo_urls',
            defaultValue: []
            // add default image

        }
    }, {
        sequelize,
        modelName: 'Inventory',
        tableName: 'inventory',
        timestamps: true
    })

module.exports = Inventory