const asyncHandler = require('../utils/asyncHandler')
const ListingsService = require('../services/listingsService')
const ResponseFormatter = require("../utils/responseFormatter")
const ModerService = require("../services/moderService")

class ModerController {
    getPendingListings = asyncHandler(async (req, res) => {
        const listingData = await ListingsService.getPendingListings()

        ResponseFormatter.success(res, {
            listings: listingData
        })
    })

    approveListing = asyncHandler(async (res, req) => {
        const { listingId } = req.params

        const listingData = await ListingsService.moderStatusListing(listingId, 'ACTIVE')

        ResponseFormatter.success(res, {
            listing: listingData
        })
    })

    rejectListing = asyncHandler(async (res, req) => {
        const { listingId } = req.params

        const listingData = await ListingsService.moderStatusListing(listingId, 'REJECTED')

        ResponseFormatter.success(res, {
            listing: listingData
        })
    })

    blockUser = asyncHandler(async (res, req) => {
        const { userId } = req.params

        const userData = await ModerService.blockUser(userId)

        ResponseFormatter.success(res, {
            user: userData
        })
    })

    unblockUser = asyncHandler(async (res, req) => {
        const { userId } = req.params

        const userData = await ModerService.unblockUser(userId)

        ResponseFormatter.success(res, {
            user: userData
        })
    })
}

module.exports = new ModerController()