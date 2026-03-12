const PhotosRepository = require('../repository/photosRepository')
const ApiError = require("../exeptions/appError")
const queue = require("../workers/imageQueue")
const fs = require("fs")
const {PhotoDto, ListPhotoDto} = require('../dtos/photoDto')

class PhotosService {
    async getAll(collectionId, itemId) {
        const photosData = await PhotosRepository.findAll(itemId)

        if (!photosData || photosData.length === 0) {
            throw ApiError.Conflict('Не обнаружено фотографий предмета')
        }

        return photosData.map(photosData => new ListPhotoDto(photosData))
    }

    async getOne(collectionId, itemId, photoId) {
        const photosData = await PhotosRepository.findOne(itemId, photoId)

        if (!photosData) {
            throw ApiError.Conflict('Не обнаружена фотография по указанному ID')
        }

        return new PhotoDto(photosData)
    }

        async upload(data) {
            const { itemId, files, isPrimary, sortOrder } = data
            const savedPhotos = []

            for (const file of files) {
                const [photoData, created] = await PhotosRepository.create({
                    itemId,
                    photoUrl: `/uploads/items/${file.filename}`,
                    isPrimary: isPrimary || false,
                    sortOrder: sortOrder || 0
                })

                if (!created) {
                    await fs.unlink(file.path).catch(() => {})
                    continue
                }

                savedPhotos.push(photoData)

                await queue.add('processImage', {
                    path: file.path,
                    filename: file.filename,
                    itemId
                })
            }

            return new PhotoDto(savedPhotos)
        }

    async delete(data) {
        const photoData = await PhotosRepository.findOne(data.itemId, data.photoId)

        if (!photoData) {
            throw ApiError.Conflict('Такая фотография отсутствует')
        }

        await PhotosRepository.delete(photoData)
    }
}

module.exports = new PhotosService()