const { DataTypes, Model } = require('@sequelize/core')
const sequelize = require('../config/database');

class Listings extends Model {}

Listings.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'item_id',
        defaultValue: null
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'seller_id'
    },
    type: {
        type: DataTypes.ENUM('SALE', 'TRADE', 'INSEARCH'),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    delivery: {
        type: DataTypes.ARRAY(DataTypes.ENUM('PICKUP', 'COURIER', 'PICK-UP POINT'))
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'SOLD', 'INACTIVE'),
        defaultValue: 'ACTIVE'
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    expiresAt: {
        type: DataTypes.DATE,
        columnName: 'expires_at',
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Listings',
    tableName: 'listings',
    timestamps: true
})

module.exports = Listings