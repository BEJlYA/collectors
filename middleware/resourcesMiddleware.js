const ApiError = require('../exeptions/appError')
const models = require('../models')
const { Collection, Item, Photo } = models
const CollectionsRepository = require('../repository/collectionsRepository')
const ItemsRepository = require('../repository/itemsRepository')
const PhotosRepository = require('../repository/photosRepository')

module.exports = {
    collection: async (req, res, next) => {
        try {
            const collectionData = await CollectionsRepository.findByPk(req.params.collectionId)

            if (!collectionData) {
                next(ApiError.NotFound('Коллекция не найдена'))
            }

            req.collection = collectionData
            next()
        } catch (e) {
            next(e)
        }
    },

    item: async (req, res, next) => {
        try {
            const itemData = await ItemsRepository.findOneItem(
                req.params.collectionId,
                req.params.itemId
            )

            if (!itemData) {
                next(ApiError.NotFound('Предмет не найден в этой коллекции'))
            }

            req.item = itemData
            next()
        } catch (e) {
            next(e)
        }
    }
}