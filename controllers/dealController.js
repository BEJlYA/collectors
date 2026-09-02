const DealService = require('../services/dealService')
const ResponseFormatter = require('../utils/responseFormatter')

class DealController {
    async getOrCreateDeal(req, res, next) {
        try {
            const { listingId } = req.params
            const userId = req.user.id

            const deal = await DealService.getOrCreate(listingId, userId)
            ResponseFormatter.success(res, { deal })
        } catch (e) {
            next(e)
        }
    }

    async getMyDeals(req, res, next) {
        try {
            const userId = req.user.id
            const deals = await DealService.getUserDeals(userId)
            ResponseFormatter.success(res, { deals })
        } catch (e) {
            next(e)
        }
    }

    async getDeal(req, res, next) {
        try {
            const { dealId } = req.params
            const userId = req.user.id

            const deal = await DealService.getDealWithMessages(dealId, userId)
            ResponseFormatter.success(res, { deal })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new DealController()