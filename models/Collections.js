const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database');

class Collections extends Model {
}

Collections.init({
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
    name: {
        type: DataTypes.STRING,
        columnName: 'name',
        defaultValue: 'New collection'
    },
    categoryTypeId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        columnName: 'category_type_id'
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        columnName: 'is_public'
    }
}, {
    sequelize,
    modelName: 'Collections',
    tableName: 'collections'
})

module.exports = Collections