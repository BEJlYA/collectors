const BookmarkService = require('../services/bookmarksService')
const ResponseFormatter = require("../utils/responseFormatter");

class BookmarksController {
    async getAll(req, res, next) {
        try {
            const userId = req.user.id

            const bookmarksData = await BookmarkService.getAll(userId)

            ResponseFormatter.success(res, {
                bookmarks: bookmarksData
            })
        } catch (e) {
            return next(e)
        }
    }

    async create(req, res, next) {
        try {
            const userId = req.user.id
            const itemId = req.body.itemId

            const bookmarksData = await BookmarkService.create(userId, itemId)

            ResponseFormatter.success(res, {
                bookmarks: bookmarksData
            }, 201)
        } catch (e) {
            return next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.user.id
            const bookmarkId = req.params.bookmarkId

            await BookmarkService.delete(bookmarkId, userId)

            ResponseFormatter.success(res)
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new BookmarksController()