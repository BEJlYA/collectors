const FeedbackService = require('../services/feedbackService')
const ResponseFormatter = require("../utils/responseFormatter");

class FeedbackController {
    async create(req, res, next) {
        try {
            const fromUserId = req.user.id
            const {targetUserId, initiatorType, comment, rating} = req.body

            const categoryData = await FeedbackService.create({
                fromUserId,
                targetUserId,
                initiatorType,
                comment,
                rating
            })

            ResponseFormatter.success(res, {
                categories: categoryData
            }, 201)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FeedbackController()