const {DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../config/database');

class Reviews extends Model {
}

Reviews.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fromUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'from_user'
    },
    targetUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        columnName: 'target_user'
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 10
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Reviews',
    tableName: 'reviews',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['from_user', 'target_user']
        }
    ]
})

module.exports = Reviews