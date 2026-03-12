const models = require('../models')
const {Profiles, Category, Items, ItemPhotos} = require("../models");
const Collections = models.Collections

class CollectionsRepository {
    async findAll(userId){
        return await Collections.findAll(
            {
                where: {
                    userId
                },
                include: [
                    {
                        model: Profiles,
                        as: 'profile',
                        attributes: ['userId', 'firstName', 'lastName', 'avatarUrl']
                    },
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
                    model: Profiles,
                    as: 'profiles',
                    attributes: ['userId', 'firstName', 'lastName', 'avatarUrl']
                },
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
            where: {
                userId,
                name: data.name,
                categoryTypeId: data.categoryTypeId,
                isPublic: data.isPublic ?? true
            }
        })
    }

    async findByPk(collectionId) {
        return await Collections.findByPk(collectionId)
    }

    async updateCollection(collectionData, data) {
        return await collectionData.updateCategory({
            name: data.name,
            categoryTypeId: data.categoryTypeId,
            isPublic: data.isPublic
        })
    }

    async deleteCollection(collectionData) {
        await collectionData.destroy()
    }
}

module.exports = new CollectionsRepository()