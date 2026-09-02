const PhotosItemsRepository = require('../repository/photosItemsRepository')
const ApiError = require("../exceptions/apiError")
const queue = require("../workers/imageQueue")
const fs = require("fs")
const {PhotoDto, ExtendedPhotoDto} = require('../dtos/photoDto')

class PhotosItemsService {
    async getAll(collectionId, itemId) {
        const photosData = await PhotosItemsRepository.findAll(itemId)

        if (!photosData || photosData.length === 0) {
            throw ApiError.BadRequest('Не обнаружено фотографий предмета')
        }

        return photosData.map(photosData => new ExtendedPhotoDto(photosData))
    }

    async getOne(collectionId, itemId, photoId) {
        const photosData = await PhotosItemsRepository.findOne(itemId, photoId)

        if (!photosData) {
            throw ApiError.BadRequest('Не обнаружена фотография по указанному ID')
        }

        return new PhotoDto(photosData)
    }

    async upload(data) {
        const {itemId, files, isPrimary, sortOrder} = data
        const savedPhotos = []

        const existsPhoto = await PhotosItemsRepository.findAll(itemId)

        if (existsPhoto + files.length > 5) {
            throw ApiError.BadRequest(`Нельзя загрузить более 5 фото на предмет. Сейчас: ${existingPhotos}, пробуете добавить: ${files.length}`)
        }

        for (const file of files) {
            const [photoData, created] = await PhotosItemsRepository.create({
                itemId,
                photoUrl: `/uploads/items/${file.filename}`,
                isPrimary: isPrimary || false,
                sortOrder: sortOrder || 0
            })

            if (!created) {
                await fs.unlink(file.path).catch(() => {
                })
                continue
            }

            savedPhotos.push(photoData)

            await queue.add('processImage', {
                path: file.path,
                filename: file.filename
            })
        }

        return savedPhotos.map(photo => new ExtendedPhotoDto(photo))
    }

    async update(data) {
        const {itemId, photoId, isPrimary, sortOrder} = data

        let photoData = await PhotosItemsRepository.findOne(itemId, photoId)

        if (!photoData) {
            throw ApiError.BadRequest('Такая фотография отсутствует')
        }

        photoData = await PhotosItemsRepository.update(photoData, isPrimary, sortOrder)

        return new ExtendedPhotoDto(photoData)
    }

    async delete(data) {
        const photoData = await PhotosItemsRepository.findOne(data.itemId, data.photoId)

        if (!photoData) {
            throw ApiError.BadRequest('Такая фотография отсутствует')
        }

        await PhotosItemsRepository.delete(photoData)
    }
}

module.exports = new PhotosItemsService()