const models = require('../models')
const {Collections, Users, ItemPhotos} = require("../models");
const Items = models.Items

class ItemsRepository {
    async findByPk(itemId) {
        return await Items.findByPk(itemId)
    }

    async findAllItems(collectionId) {
        return await Items.findAll({
            where: { collectionId },
            order: [['createdAt', 'DESC']],
            include: [{
                model: ItemPhotos,
                as: 'photos',
                attributes: ['id', 'photoUrl', 'isPrimary'],
                limit: 1
            }]
        })
    }

    async findOneItem(collectionId, itemId) {
        return await Items.findOne({
            where: {
                id: itemId,
                collectionId
            },
            include: [{
                    model: ItemPhotos,
                    as: 'photos',
                    attributes: ['id', 'photoUrl', 'isPrimary']
                }]
        })
    }

    async findExists(collectionId, name) {
        return await Items.findOne({
            where: {
                collectionId,
                name,
            }
        })
    }

    async createItem(data) {
        return await Items.create({
            collectionId: data.collectionId,
            name: data.name,
            description: data.description,
            isForTrade: data.isForTrade ?? false
        })
    }

    async updateItem(itemData, data) {
        return await itemData.updateCategory(data)
    }

    async deleteItem(itemData) {
        await itemData.destroy()
    }
}

module.exports = new ItemsRepository()