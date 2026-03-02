const { DataTypes, Model } = require("@sequelize/core")
const sequelize = require('../config/database');

class Collections extends Model {}
Collections.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'profile_id'
    },
    itemName: {
        type: DataTypes.STRING,
        columnName: 'item_name',
        defaultValue: 'Not defined'
    },
    description: {
        type: DataTypes.TEXT
    },
    isForTrade: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Collections',
    tableName: 'collections',
    timestamps: true
})

module.exports = Collections