const DealRepository = require('../repository/dealRepository')
const ApiError = require('../exceptions/apiError')
const ListingRepository = require('../repository/listingsRepository')
const { DealDto, DealListDto } = require('../dtos/dealDto')

class DealService {
    async getOrCreate(listingId, userId) {
        const listing = await ListingRepository.findById(listingId)
        if (!listing) throw ApiError.NotFound('Объявление не найдено')

        let deal = await DealRepository.findByListingAndUsers(listingId, userId, listing.sellerId)

        if (!deal) {
            deal = await DealRepository.create({
                listingId,
                sellerId: listing.sellerId,
                buyerId: userId
            })
        }

        return new DealDto(await DealRepository.findById(deal.id))
    }

    async getUserDeals(userId) {
        return new DealListDto(await DealRepository.findByUserId(userId))
    }

    async getDealWithMessages(dealId, userId) {
        const deal = await DealRepository.findByIdWithMessages(dealId)
        if (!deal) throw ApiError.NotFound('Чат не найден')

        if (deal.sellerId !== userId && deal.buyerId !== userId) {
            throw ApiError.Forbidden('Нет доступа')
        }

        return new DealDto(deal)
    }
}

module.exports = new DealService()