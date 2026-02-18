const sequelize = require('../config/database')

const User = require('./User')
const Inventory = require('./Inventory')

User.hasMany(Inventory, {
    foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE'
    },
    as: 'inventory'
})

Inventory.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE'
    },
    as: 'owner'
})


const models = {
    sequelize,
    User,
    Inventory
}

module.exports = models