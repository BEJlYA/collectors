const PhotosService = require("../services/photosService")
const ResponseFormatter = require("../utils/ResponseFormatter")
const ApiError = require('../exeptions/appError')

class PhotosController {
    async getAll(req, res, next) {
        try {
            const {collectionId, itemId} = req.params

            const photosData = await PhotosService.getAll(collectionId, itemId)

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

            const photosData = await PhotosService.getOne(collectionId, itemId, photoId)

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

            const photosData = await PhotosService.upload({
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

    async delete(req, res, next) {
        try {
            const {collectionId, itemId, photoId} = req.params

            await PhotosService.delete({
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

module.exports = new PhotosController()