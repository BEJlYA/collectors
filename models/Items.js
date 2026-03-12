    const {DataTypes, Model} = require('@sequelize/core')
    const sequelize = require('../config/database');

    class Items extends Model {
    }

    Items.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        collectionId: {
            type: DataTypes.INTEGER,
            columnName: 'collection_id'
        },
        name: {
            type: DataTypes.STRING,
            columnName: 'name',
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
        modelName: 'Items',
        tableName: 'items',
        timestamps: true
    })

    module.exports = Items