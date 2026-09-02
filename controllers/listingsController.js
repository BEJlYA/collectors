const ListingsService = require('../services/listingsService')
const ResponseFormatter = require("../utils/responseFormatter")
const SearchService = require('../services/searchService')

class ListingsController {
    async getAll(req, res, next) {
        try {
            const listingsData = await ListingsService.getAll()

            ResponseFormatter.success(res, {
                listings: listingsData
            })
        } catch (e) {
            return next(e)
        }
    }

    async getMyListings(req, res, next) {
        try {
            const userId = req.user.id

            const listingsData = await ListingsService.getMyListings(userId)

            ResponseFormatter.success(res, {
                listings: listingsData
            })
        } catch (e) {
            return next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const userId = req.user.id
            const listingId = req.params.listingId

            const listingData = await ListingsService.getOne(userId, listingId)

            ResponseFormatter.success(res, {
                listing: listingData
            })
        } catch (e) {
            return next(e)
        }
    }

    async create(req, res, next) {
        try {
            const userId = req.user.id
            const {name, type, categoryId, price, description} = req.body

            const listingData = await ListingsService.create(userId, {
                name, type, categoryId, price, description
            })

            ResponseFormatter.success(res, {
                listing: listingData
            })
        } catch (e) {
            return next(e)
        }
    }

    async update(req, res, next) {
        try {
            const userId = req.user.id
            const listingId = req.params.listingId

            const listingData = await ListingsService.update(userId, listingId, ...req.body)

            ResponseFormatter.success(res, {
                listing: listingData
            })
        } catch (e) {
            return next(e)
        }
    }

    async updateStatus(req, res, next) {
        try {
            const userId = req.user.id
            const listingId = req.params.listingId
            const status = req.body

            const listingData = await ListingsService.updateStatus(userId, listingId, status)

            ResponseFormatter.success(res, {
                listing: listingData
            })
        } catch (e) {
            return next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.user.id
            const listingId = req.params.listingId

            await ListingsService.delete(userId, listingId)

            ResponseFormatter.success(res)
        } catch (e) {
            return next(e)
        }
    }

    async search(req, res, next) {
        try {
            const { q, type, minPrice, maxPrice, hasPhoto, categoryId, page = 1, limit = 20 } = req.query

            const results = await SearchService.searchListings(q, { type, minPrice, maxPrice, hasPhoto, categoryId }, page, limit)

            ResponseFormatter.success(res, {
                searchResult: results
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ListingsController()