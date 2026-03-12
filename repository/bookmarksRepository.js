const models = require('../models')
const Bookmarks = models.Bookmarks

class BookmarksRepository {
    async getAll(userId) {
        return await Bookmarks.findAll({
            where: {
                userId
            }
        })
    }

    async findOne(bookmarkId, userId) {
        return await Bookmarks.findOne({
            where: {
                id: bookmarkId,
                userId
            }
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