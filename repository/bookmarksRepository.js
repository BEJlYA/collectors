const models = require('../config/associations')
const {Bookmarks, Items, ItemPhotos} = models.Bookmarks

class BookmarksRepository {
    async getAll(userId) {
        return await Bookmarks.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: Items,
                    as: 'items',
                    attributes: ['id', 'name', 'description'],
                    include: [{
                        model: ItemPhotos,
                        as: 'photos',
                        attributes: ['id', 'photoUrl', 'isPrimary'],
                        limit: 1
                    }]
                }
            ]
        })
    }

    async findOne(bookmarkId, userId) {
        return await Bookmarks.findOne({
            where: {
                id: bookmarkId,
                userId
            },
            include: [
                {
                    model: Items,
                    as: 'items',
                    attributes: ['id', 'name', 'description'],
                    include: [{
                        model: ItemPhotos,
                        as: 'photos',
                        attributes: ['id', 'photoUrl', 'isPrimary'],
                        limit: 1
                    }]
                }
            ]
        })
    }

    async create(userId, itemId) {
        return await Bookmarks.findOrCreate({
            where: {
                userId,
                itemId
            },
            defaults: {
                userId,
                itemId
            }
        })
    }

    async delete(bookmarksData) {
        await bookmarksData.destroy()
    }
}

module.exports = new BookmarksRepository()