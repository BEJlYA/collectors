const models = require('../config/associations')
const {Collections, Category, Items, ItemPhotos} = models.Collections

class CollectionsRepository {
    async findAll(userId) {
        return await Collections.findAll(
            {
                where: {
                    userId
                },
                include: [
                    {
                        model: Category,
                        as: 'categoryType',
                        attributes: ['id', 'displayName']
                    },
                    {
                        model: Items,
                        as: 'items',
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

    async findExists(name, userId) {
        return await Collections.findOne({
            where: {
                name,
                userId
            }
        })
    }

    async findOne(userId, collectionId) {
        return await Collections.findOne({
            where: {
                id: collectionId,
                userId: userId
            },
            include: [
                {
                    model: Category,
                    as: 'categoryType',
                    attributes: ['id', 'displayName']
                },
                {
                    model: Items,
                    as: 'items',
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

    async createCollection(userId, data) {
        return await Collections.create({
            userId,
            name: data.name,
            categoryId: data.categoryId,
            isPublic: data.isPublic ?? true
        })
    }

    async findByPk(collectionId) {
        return await Collections.findByPk(collectionId)
    }

    async updateCollection(collectionData, data) {
        return await collectionData.update({
            name: data.name,
            categoryId: data.categoryId,
            isPublic: data.isPublic
        })
    }

    async deleteCollection(collectionData) {
        await collectionData.destroy()
    }
}

module.exports = new CollectionsRepository()