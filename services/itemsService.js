const ItemsRepository = require('../repository/itemsRepository')
const ApiError = require("../exceptions/appError")
const { ItemDto, ListItemDto } = require('../dtos/itemDto')

class ItemsService {
    async getAll(collectionId) {
        const itemsData = await ItemsRepository.findAllItems(collectionId)

        if (!itemsData || itemsData.length === 0) {
            return []
        }

        return itemsData.map(itemsData => new ListItemDto(itemsData))
    }

    async getOne(collectionId, itemId) {
        const itemsData = await ItemsRepository.findOneItem(collectionId, itemId)

        if (!itemsData) {
            throw ApiError.NotFound('Не найден предмет коллекции')
        }

        return new ItemDto(itemsData)
    }

    async create(data) {
        const existing = await ItemsRepository.findExists(
            data.collectionId,
            data.name
        )

        if (existing) {
            throw ApiError.Conflict('Предмет с таким именем уже существует')
        }

        const itemData = await ItemsRepository.createItem(data)
        return new ItemDto(itemData)
    }

    async update(data) {
        let itemsData = await ItemsRepository.findOneItem(data.collectionId, data.itemId)

        if (!itemsData) {
            throw ApiError.NotFound('Обновляемый предмет не найден')
        }
        if (
            itemsData.name === data.name &&
            itemsData.description === data.description &&
            itemsData.isForTrade === data.isForTrade
        ) {
                throw ApiError.Conflict('Нет изменений для обновления')
        }

        itemsData = await ItemsRepository.updateItem(itemsData, data)

        return new ItemDto(itemsData)
    }

    async delete(collectionId, itemId) {
        const itemsData = await ItemsRepository.findOneItem(collectionId, itemId)

        if (!itemsData) {
            throw ApiError.NotFound('Удаляемый предмет не найден')
        }

        await ItemsRepository.deleteItem(itemsData)
    }
}

module.exports = new ItemsService()