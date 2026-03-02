const sequelize = require('../config/database')
const Users = require('./Users')
const Token = require('./Token')
const CollectionsProfile = require('./CollectionsProfile')
const ProfileType = require('./ProfileType')
const Collections = require('./Collections')
const Bookmarks = require('./Bookmarks')
const ItemPhotos = require('./ItemPhotos')
const Deals = require('./Deals')
const Messages = require('./Messages')
const Reviews = require('./Reviews')

// Пользователь -> Профили коллекций
Users.hasMany(CollectionsProfile, {
    foreignKey: 'userId'
})
CollectionsProfile.belongsTo(Users, {
    foreignKey: 'userId'
})

// Пользователь -> Токены
Users.hasMany(Token, {
    foreignKey: 'userId',
    as: 'tokens'
})

Token.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'user'
})

// Профиль коллекции -> Предметы
CollectionsProfile.hasMany(Collections, {
    foreignKey: 'profileId'
})
Collections.belongsTo(CollectionsProfile, {
    foreignKey: 'profileId'
})

// Тип профиля -> Профили коллекций (ОДИН РАЗ)
ProfileType.hasMany(CollectionsProfile, {
    foreignKey: 'profileTypeId',
    as: 'profiles'
})
CollectionsProfile.belongsTo(ProfileType, {
    foreignKey: 'profileTypeId',
    as: 'profileType'
})

// Предметы -> Фото
Collections.hasMany(ItemPhotos, {
    foreignKey: 'itemId'
})
ItemPhotos.belongsTo(Collections, {
    foreignKey: 'itemId'
})

// Закладки
Users.hasMany(Bookmarks, {
    foreignKey: 'userId'
})
Bookmarks.belongsTo(Users, {
    foreignKey: 'userId'
})

Collections.hasMany(Bookmarks, {
    foreignKey: 'itemId'
})
Bookmarks.belongsTo(Collections, {
    foreignKey: 'itemId'
})

// Сделки
Users.hasMany(Deals, {
    foreignKey: 'initiatorId',
    as: 'initiatedDeals',
    inverse: {
        as: 'initiator'
    }
})

Users.hasMany(Deals, {
    foreignKey: 'targetUserId',
    as: 'receivedDeals',
    inverse: {
        as: 'targetUser'
    }
})

// Отзывы
Users.hasMany(Reviews, {
    foreignKey: 'fromUser',
    as: 'givenReviews',
    inverse: {
        as: 'reviewer'
    }
})

Users.hasMany(Reviews, {
    foreignKey: 'targetUser',
    as: 'receivedReviews',
    inverse: {
        as: 'reviewedUser'
    }
})

//Сообщения сделки
Deals.hasMany(Messages, {
    foreignKey: 'dealId',
    as: 'messages'
})

Messages.belongsTo(Deals, {
    foreignKey: 'dealId',
    as: 'deal'
})

Users.hasMany(Messages, {
    foreignKey: 'userId',
    as: 'messages'
})

Messages.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'user'
})

module.exports = {
    sequelize,
    Users,
    Token,
    CollectionsProfile,
    Collections,
    ProfileType,
    Bookmarks,
    ItemPhotos,
    Deals,
    Messages,
    Reviews
}