const CollectionsRepository = require('../repository/collectionsRepository')
const ApiError = require("../exceptions/apiError")
const CollectionDto = require('../dtos/collectionDto')

class CollectionsService {
    async getAll(userId) {
        const collectionsData = await CollectionsRepository.findAll(userId)

        if (!collectionsData || collectionsData.length === 0) {
            return []
        }

        return collectionsData.map(collectionsData => new CollectionDto(collectionsData))
    }

    async getOne(userId, collectionId) {
        const collectionsData = await CollectionsRepository.findOne(userId, collectionId)

        if (!collectionsData) {
            throw ApiError.NotFound('Коллекция не найдена')
        }

        return new CollectionDto(collectionsData)
    }

    async create(userId, data) {
        const exists = await CollectionsRepository.findExists(data.name, userId)

        if (exists) {
            throw ApiError.Conflict('У вас уже существует коллекция с таким именем')
        }

        const collectionsData = await CollectionsRepository.createCollection(data)
        return new CollectionDto(collectionsData)
    }

    async update(collectionId, data) {
        let collectionsData = await CollectionsRepository.findByPk(collectionId)

        if (!collectionsData) {
            throw ApiError.NotFound('Обновляемая коллекция не найдена')
        }
        if (
            collectionsData.name === data.name &&
            collectionsData.categoryId === data.categoryId &&
            collectionsData.isPublic === data.isPublic
        ) {
            throw ApiError.Conflict('Нет изменений для обновления')
        }

        collectionsData = await CollectionsRepository.updateCollection(collectionsData, data)

        return new CollectionDto(collectionsData)
    }

    async delete(collectionId) {
        const collectionsData = await CollectionsRepository.findByPk(collectionId)

        if (!collectionsData) {
            throw ApiError.NotFound('Коллекция не найдена')
        }

        await CollectionsRepository.deleteCollection(collectionsData)
    }
}

module.exports = new CollectionsService()