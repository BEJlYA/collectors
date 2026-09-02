const models = require('../config/associations')
const ListingPhotos = models.ListingPhotos

class PhotosListingsRepository {
    async findAll(itemId) {
        return await ListingPhotos.findAll({where: {itemId}})
    }

    async findOne(itemId, photoId) {
        return await ListingPhotos.findOne({
            where: {
                id: photoId,
                itemId
            }
        })
    }

    async create(data) {
        return await ListingPhotos.findOrCreate({
            where: {
                itemId: data.itemId,
                photoUrl: data.photoUrl
            },
            defaults: {
                itemId: data.itemId,
                photoUrl: data.photoUrl,
                isPrimary: data.isPrimary,
                sortOrder: data.sortOrder
            }
        })
    }

    async update(model, isPrimary, sortOrder) {
        return await model.update({
            isPrimary,
            sortOrder
        })
    }

    async delete(photoData) {
        await photoData.destroy()
    }
}

module.exports = new PhotosListingsRepository()