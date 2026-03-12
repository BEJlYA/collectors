const BookmarksRepository = require('../repository/bookmarksRepository')
const ItemsRepository = require('../repository/itemsRepository')
const ApiError = require('../exeptions/appError')

class BookmarksService {
    async getAll(userId) {
        const bookmarksData = await BookmarksRepository.getAll(userId)

        if (!bookmarksData) {
            return ApiError.Conflict('У вас нет закладок')
        }

        return bookmarksData
    }

    async create(userId, itemId) {
        const itemsData = await ItemsRepository.findByPk(itemId)

        if (!itemsData) {
            return ApiError.BadRequest('Такого закладки нет')
        }

        const [bookmarksData, create] = await BookmarksRepository.create()

        if (!create) {
            return ApiError.Conflict('У вас уже существует такая закладка')
        }

        return bookmarksData
    }

    async delete(bookmarkId, userId) {
        const bookmarksData = await BookmarksRepository.findOne(bookmarkId, userId)

        if (!bookmarksData) {
            return ApiError.BadRequest('Такой закладки нет или не вы её владелец')
        }

        await BookmarksRepository.delete(bookmarksData)
    }
}

module.exports = new BookmarksService()