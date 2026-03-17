const CollectionsService = require('../services/collectionsService')
const ResponseFormatter = require("../utils/responseFormatter");

class CollectionsController {
    async getAll(req, res, next) {
        try {
            const userId = req.user.id
            const collectionsData = await CollectionsService.getAll(userId)

            ResponseFormatter.success(res, {
                collections: collectionsData
            })
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const userId = req.user.id
            const collectionId = req.params.collectionId
            const collectionsData = await CollectionsService.getOne(userId, collectionId)

            ResponseFormatter.success(res, {
                collections: collectionsData
            })
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const userId = req.user.id
            const {name, categoryTypeId, isPublic} = req.body

            const collectionsData = await CollectionsService.create(
                userId,
                {
                    name,
                    categoryTypeId,
                    isPublic
                }
            )

            ResponseFormatter.success(res, {
                collections: collectionsData
            }, 201)
        } catch (e) {
            next(e)
        }

    }

        async update(req, res, next) {
            try {
                const collectionId = req.params.collectionId
                const {name, categoryTypeId, isPublic} = req.body

                const collectionsData = await CollectionsService.update(
                    collectionId,
                    {
                        name,
                        categoryTypeId,
                        isPublic
                    }
                )

                ResponseFormatter.success(res, {
                    collections: collectionsData
                }, 202)
            } catch (e) {
                next(e)
            }
        }

        async delete(req, res, next) {
            try {
                const collectionId = req.params.collectionId

                await CollectionsService.delete(collectionId)

                ResponseFormatter.success(res)
            } catch (e) {
                return next(e)
            }
        }
}

module.exports = new CollectionsController()