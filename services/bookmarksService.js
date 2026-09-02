const BookmarksRepository = require('../repository/bookmarksRepository')
const ItemsRepository = require('../repository/itemsRepository')
const ApiError = require('../exceptions/apiError')
const BookmarkDto = require('../dtos/bookmarkDto')

class BookmarksService {
    async getAll(userId) {
        const bookmarksData = await BookmarksRepository.getAll(userId)

        if (!bookmarksData) {
            throw ApiError.Conflict('У вас нет закладок')
        }

        return bookmarksData.map(bookmarksData => new BookmarkDto(bookmarksData))
    }

    async create(userId, itemId) {
        const itemsData = await ItemsRepository.findByPk(itemId)

        if (!itemsData) {
            throw ApiError.BadRequest('Такого объявления не существует')
        }

        const [bookmarksData, create] = await BookmarksRepository.create()

        if (!create) {
            throw ApiError.Conflict('У вас уже существует такая закладка')
        }

        return new BookmarkDto(bookmarksData)
    }

    async delete(bookmarkId, userId) {
        const bookmarksData = await BookmarksRepository.findOne(bookmarkId, userId)

        if (!bookmarksData) {
            throw ApiError.BadRequest('Такой закладки нет или не вы её владелец')
        }

        await BookmarksRepository.delete(bookmarksData)
    }
}

module.exports = new BookmarksService()