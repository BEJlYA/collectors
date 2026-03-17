const models = require('../config/associations')
const ItemPhotos = models.ItemPhotos

class PhotosRepository {
    async findAll(itemId) {
        return await ItemPhotos.findAll({where: { itemId }})
    }

    async findOne(itemId, photoId) {
        return await ItemPhotos.findOne({
            where: {
                id: photoId,
                itemId
            }
        })
    }

    async create(data) {
        return await ItemPhotos.findOrCreate({
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

module.exports = new PhotosRepository()