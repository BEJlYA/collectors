const ItemsService = require("../services/itemsService")
const ResponseFormatter = require("../utils/ResponseFormatter")
const ItemDto = require('../dtos/itemDto')

class ItemsController {
    async getAll(req, res, next) {
        try {
            const collectionId = req.params.collectionId
            const itemsData = await ItemsService.getAll(collectionId)

            ResponseFormatter.success(res, {
                items: itemsData
            })
        } catch (e) {
            return next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {collectionId, itemId} = req.params
            const itemsData = await ItemsService.getOne(collectionId, itemId)

            ResponseFormatter.success(res, {
                items: itemsData
            })
        } catch (e) {
            return next(e)
        }
    }

    async upload(req, res, next) {
        try {
            const collectionId = req.params.collectionId
            const {name, description, isForTrade} = req.body

            const itemsData = await ItemsService.create(
                {
                    collectionId,
                    name,
                    description,
                    isForTrade
                }
            )

            ResponseFormatter.success(res, {
                items: itemsData
            }, 201)
        } catch (e) {
            return next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {collectionId, itemId} = req.params
            const {newCollectionId, name, description, isForTrade} = req.body

            const itemsData = await ItemsService.update(
                {
                    itemId,
                    collectionId,
                    newCollectionId,
                    name,
                    description,
                    isForTrade
                }
            )

            ResponseFormatter.success(res, {
                items: itemsData
            }, 202)
        } catch (e) {
            return next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {collectionId, itemId} = req.params

            await ItemsService.delete(
                itemId,
                collectionId
            )

            ResponseFormatter.success(res)
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new ItemsController()