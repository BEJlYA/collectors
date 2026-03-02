const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database');

class ProfileType extends Model {
}

ProfileType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'display_name'
    },
    description: {
        type: DataTypes.TEXT
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        columnName: 'is_active'
    }
}, {
    sequelize,
    modelName: 'ProfileType',
    tableName: 'profile_types'
})

module.exports = ProfileType