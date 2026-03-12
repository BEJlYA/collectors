const sequelize = require('../config/database')
const Users = require('./Users')
const Tokens = require('./Tokens')
const Profiles = require('./Profiles')
const Feedbacks = require('./Feedbacks')
const Bookmarks = require('./Bookmarks')
const Collections = require('./Collections')
const Category = require('./Category')
const Items = require('./Items')
const ItemPhotos = require('./ItemPhotos')
const Messages = require('./Messages')

// Пользователь -> Токены
Users.hasMany(Tokens, {
    foreignKey: 'userId',
    as: 'tokens'
})
Tokens.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'user'
})

//Пользователь -> Профиль
Users.hasOne(Profiles, {
    foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE'
    },
    as: 'profile'
})

// Пользователь -> Отзывы
Users.hasMany(Feedbacks, {
    foreignKey: {
        name: 'fromUser',
        onDelete: 'CASCADE'
    },
    as: 'givenReviews',
    inverse: {
        as: 'reviewer'
    }
})

Users.hasMany(Feedbacks, {
    foreignKey: {
        name: 'targetUser',
        onDelete: 'CASCADE'
    },
    as: 'receivedReviews',
    inverse: {
        as: 'reviewedUser'
    }
})

// Пользователь -> Закладки
Users.hasMany(Bookmarks, {
    foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE'
    }
})

Items.hasMany(Bookmarks, {
    foreignKey: {
        name: 'itemId',
        onDelete: 'CASCADE'
    }
})

// Пользователь -> Коллекции
Users.hasMany(Collections, {
    foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE'
    }
})

// Категории -> Коллекции
Category.hasMany(Collections, {
    foreignKey: {
        name: 'categoryTypeId',
        onDelete: 'CASCADE'
    },
    as: 'collections'
})
Collections.belongsTo(Category, {
    foreignKey: 'categoryTypeId',
    as: 'categoryType'
})

// Коллекции -> Предметы
Collections.hasMany(Items, {
    foreignKey: {
        name: 'collectionId',
        onDelete: 'CASCADE'
    }
})

// Предметы -> Фото
Items.hasMany(ItemPhotos, {
    foreignKey: {
        name: 'itemId',
        onDelete: 'CASCADE'
    }
})

//Пользователь -> Сообщения
Users.hasMany(Messages, {
    foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE'
    },
    as: 'messages'
})

module.exports = {
    sequelize,
    Users,
    Tokens,
    Profiles,
    Feedbacks,
    Bookmarks,
    Collections,
    Category,
    Items,
    ItemPhotos,
    Messages,
}