const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database')

class Profiles extends Model {
}

Profiles.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        columnName: 'user_id'
    },
    firstName: {
        type: DataTypes.STRING,
        columnName: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        columnName: 'last_name'
    },
    avatarUrl: {
        type: DataTypes.STRING,
        defaultValue: 'default-avatar.png',
        columnName: 'avatar_url'
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.00
    },
    categories: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    preferences: {
        type: DataTypes.JSONB,
        defaultValue: {}
    }
}, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles',
    timestamps: true
})

module.exports = Profiles