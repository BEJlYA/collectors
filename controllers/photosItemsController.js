const PhotosItemsService = require("../services/photosItemsService")
const ResponseFormatter = require("../utils/responseFormatter")
const ApiError = require('../exceptions/apiError')

class PhotosItemsController {
    async getAll(req, res, next) {
        try {
            const {collectionId, itemId} = req.params

            const photosData = await PhotosItemsService.getAll(collectionId, itemId)

            ResponseFormatter.success(res, {
                photos: photosData
            })
        } catch (e) {
            return next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {collectionId, itemId, photoId} = req.params

            const photosData = await PhotosItemsService.getOne(collectionId, itemId, photoId)

            ResponseFormatter.success(res, {
                photos: photosData
            })
        } catch (e) {
            return next(e)
        }
    }

    async upload(req, res, next) {
        try {
            const {itemId} = req.params
            const {isPrimary, sortOrder} = req.body
            const files = req.files

            if (!files || files.length === 0) {
                return next(ApiError.BadRequest('Файлы не загружены'))
            }

            const photosData = await PhotosItemsService.upload({
                itemId,
                files,
                isPrimary: isPrimary === 'true',
                sortOrder: Number(sortOrder) || 0
            })

            ResponseFormatter.success(res, {
                photos: photosData
            }, 201)
        } catch (e) {
            return next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {itemId, photoId} = req.params
            const {isPrimary, sortOrder} = req.body

            const photosData = await PhotosItemsService.update({
                itemId,
                photoId,
                isPrimary: isPrimary === 'true',
                sortOrder: Number(sortOrder) || 0
            })

            ResponseFormatter.success(res, {
                photos: photosData
            }, 201)
        } catch (e) {
            return next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {collectionId, itemId, photoId} = req.params

            await PhotosItemsService.delete({
                collectionId,
                itemId,
                photoId
            })

            ResponseFormatter.success(res)
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new PhotosItemsController()