const FeedbackRepository = require('../repository/feedbackRepository')
const ProfileRepository = require('../repository/profileRepository')
const ApiError = require('../exceptions/apiError')
const {ExtendedFeedbackDto} = require('../dtos/feedbackDto')

class FeedbackService {
    async create(data) {
        const {fromUserId, targetUserId, initiatorType, comment, rating} = data

        if (fromUserId === targetUserId) {
            throw ApiError.BadRequest('Нельзя оставить отзыв самому себе')
        }

        const targetUser = await ProfileRepository.findByUserId(targetUserId)
        if (!targetUser) {
            throw ApiError.NotFound('Пользователь не найден')
        }

        const existing = await FeedbackRepository.findByPair(fromUserId, targetUserId)
        if (existing) {
            throw ApiError.Conflict('Вы уже оставляли отзыв этому пользователю')
        }

        const feedback = await FeedbackRepository.create({
            fromUserId,
            targetUserId,
            initiatorType,
            comment,
            rating
        })

        await this._updateUserRating(targetUserId)

        return new ExtendedFeedbackDto(feedback)
    }

    async _updateUserRating(userId) {
        const feedbacks = await FeedbackRepository.findByTargetUser(userId)

        if (feedbacks.length === 0) return

        const avgRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length

        const profileData = await ProfileRepository.findByUserId(userId)
        await ProfileRepository.update(profileData, {rating: avgRating})
    }
}

module.exports = new FeedbackService()