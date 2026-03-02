const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database');

class CollectionsProfile extends Model {
}

CollectionsProfile.init({
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
    profileName: {
        type: DataTypes.STRING,
        columnName: 'profile_name',
        defaultValue: 'Not defined'
    },
    profileTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        columnName: 'profile_type_id'
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        columnName: 'is_public'
    }
}, {
    sequelize,
    modelName: 'CollectionsProfile',
    tableName: 'collections_profile'
})

module.exports = CollectionsProfile