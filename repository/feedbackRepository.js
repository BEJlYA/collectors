const models = require('../config/associations')
const Feedbacks = models.Feedbacks

class FeedbackRepository {
    async findByPair(fromUserId, targetUserId) {
        return await Feedbacks.findOne({
            where: {
                fromUserId,
                targetUserId
            }
        })
    }

    async findByTargetUser(targetUserId) {
        return await Feedbacks.findAll({
            where: { targetUserId }
        })
    }

    async create(data) {
        return await Feedbacks.create(data)
    }
}

module.exports = new FeedbackRepository()