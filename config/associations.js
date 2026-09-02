const sequelize = require('./database')
const Users = require('../models/Users')
const Tokens = require('../models/Tokens')
const Profiles = require('../models/Profiles')
const Feedbacks = require('../models/Feedbacks')
const Bookmarks = require('../models/Bookmarks')
const Collections = require('../models/Collections')
const Category = require('../models/Category')
const Items = require('../models/Items')
const ItemPhotos = require('../models/ItemPhotos')
const Messages = require('../models/Messages')
const Deals = require('../models/Deals')
const Listings = require('../models/Listings')
const ListingPhotos = require('../models/ListingPhotos')

// ====================================================
// ПОЛЬЗОВАТЕЛЬ (Users) — всё, что связано с пользователем
// ====================================================

// Токены
Users.hasMany(Tokens, {
    foreignKey: 'userId',
    as: 'tokens'
})
Tokens.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'user'
})

// Профиль
Users.hasOne(Profiles, {
    foreignKey: {name: 'userId', onDelete: 'CASCADE'},
    as: 'profile'
})

// Отзывы (которые оставил)
Users.hasMany(Feedbacks, {
    foreignKey: {name: 'fromUser'},
    as: 'givenReviews',
    inverse: {as: 'reviewer'}
})

// Отзывы (которые получил)
Users.hasMany(Feedbacks, {
    foreignKey: {name: 'targetUser', onDelete: 'CASCADE'},
    as: 'receivedReviews',
    inverse: {as: 'reviewedUser'}
})

// Закладки
Users.hasMany(Bookmarks, {
    foreignKey: {name: 'userId', onDelete: 'CASCADE'},
    as: 'bookmarks'
})

// Коллекции
Users.hasMany(Collections, {
    foreignKey: {name: 'userId', onDelete: 'CASCADE'},
    as: 'collections'
})

// Сообщения
Users.hasMany(Messages, {
    foreignKey: {name: 'userId', onDelete: 'CASCADE'},
    as: 'messages'
})

// Объявления (как продавец)
Users.hasMany(Listings, {
    foreignKey: 'sellerId',
    as: 'listings'
})

// ====================================================
// КАТЕГОРИИ (Category) и КОЛЛЕКЦИИ (Collections)
// ====================================================

Category.hasMany(Collections, {
    foreignKey: {name: 'categoryId', onDelete: 'CASCADE'},
    as: 'collections'
})
Collections.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'categoryType'
})

Collections.hasMany(Items, {
    foreignKey: {name: 'collectionId', onDelete: 'CASCADE'},
    as: 'items'
})
Items.belongsTo(Collections, {
    foreignKey: 'collectionId',
    as: 'collection'
})

// ====================================================
// ПРЕДМЕТЫ (Items) и ФОТО (ItemPhotos)
// ====================================================

Items.hasMany(ItemPhotos, {
    foreignKey: {name: 'itemId', onDelete: 'CASCADE'},
    as: 'photos'
})
ItemPhotos.belongsTo(Items, {
    foreignKey: 'itemId',
    as: 'item'
})

// ====================================================
// ЧАТЫ (Deals) и ОБЪЯВЛЕНИЯ (Listings)
// ====================================================

Deals.belongsTo(Items, {
    foreignKey: 'itemId',
    as: 'item'
})
Deals.belongsTo(Users, {
    foreignKey: 'sellerId',
    as: 'seller'
})
Deals.belongsTo(Users, {
    foreignKey: 'buyerId',
    as: 'buyer'
})

Listings.belongsTo(Users, {
    foreignKey: 'sellerId',
    as: 'seller'
})
Listings.belongsTo(Items, {
    foreignKey: 'itemId',
    as: 'item'
})

// ====================================================
// ОБЪЯВЛЕНИЯ (Listings) и ФОТО (ListingPhotos)
// ====================================================

Listings.hasMany(ListingPhotos, {
    foreignKey: {name: 'listingId', onDelete: 'CASCADE'},
    as: 'photos'
})
ListingPhotos.belongsTo(Listings, {
    foreignKey: 'listingId',
    as: 'listing'
})
Listings.hasMany(Bookmarks, {
    foreignKey: {name: 'listingId'},
    as: 'bookmarks'
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
    Deals,
    Listings,
    ListingPhotos
}