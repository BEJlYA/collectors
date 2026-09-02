const model = require('../config/associations')
const {ListingPhotos} = require("../config/associations")
const Listings = model.Listings

class ListingsRepository {
    async getAll(listingStatus = 'ACTIVE') {
        return await Listings.findAll({
            where: {
                status: `${listingStatus}`
            },
            include: [{
                model: ListingPhotos,
                as: 'photos',
                attributes: ['id', 'photoUrl', 'isPrimary']
            }]
        })
    }

    async getMyListings(userId) {
        return await Listings.findAll({
            where: {
                sellerId: userId
            },
            include: [{
                model: ListingPhotos,
                as: 'photos',
                attributes: ['id', 'photoUrl', 'isPrimary']
            }]
        })
    }

    async getOne(listingId) {
        return await Listings.findAll({
            where: {
                id: listingId
            },
            include: [{
                model: ListingPhotos,
                as: 'photos',
                attributes: ['id', 'photoUrl', 'isPrimary', 'sortOrder']
            }]
        })
    }

    async create(data) {
        return await Listings.create(data)
    }

    async update(listingData, data) {
        return await listingData.update(data)
    }

    async delete(listingData) {
        await listingData.destroy()
    }

    async findById(listingId) {
        return await Listings.findByPk(listingId)
    }
}

module.exports = new ListingsRepository()