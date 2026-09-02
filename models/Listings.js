const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database')

class Listings extends Model {
}

Listings.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
        allowNull: true
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        columnName: 'item_id',
        defaultValue: null
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'seller_id'
    },
    type: {
        type: DataTypes.ENUM('SALE', 'EXCHANGE'), //, 'INSEARCH'
        allowNull: false
    },
    categoryId: {
        type: DataTypes.STRING,
        columnName: 'category_id',
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
    status: {
        type: DataTypes.ENUM('DRAFT', 'PENDING', 'ACTIVE', 'SOLD', 'HIDDEN', 'REJECTED'),
        defaultValue: 'DRAFT'
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    expiresAt: {
        type: DataTypes.DATE,
        columnName: 'expires_at'
    }
}, {
    sequelize,
    modelName: 'Listings',
    tableName: 'listings',
    timestamps: true
})

module.exports = Listings