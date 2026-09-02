const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database')

class Deals extends Model {
}

Deals.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    listingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'listing_id'
    },
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'buyer_id'
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'seller_id'
    }
}, {
    sequelize,
    modelName: 'Deals',
    tableName: 'deals',
    timestamps: true
})

module.exports = Deals