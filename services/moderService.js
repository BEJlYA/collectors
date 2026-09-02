const ProfileRepository = require("../repository/profileRepository")
const ApiError = require("../exceptions/apiError")
const { AdminProfileDto } = require("../dtos/profileDto")

class ModerService {
    async blockUser(userId) {
        let profileData = await ProfileRepository.findByUserId(userId)

        if (!profileData) {
            throw ApiError.NotFound('Запрашиваемый пользователь не найден')
        }
        if (profileData.isBlocked) {
            throw ApiError.BadRequest('Пользователь уже заблокирован')
        }

        profileData = await ProfileRepository.update(profileData, {'isBlocked': true})

        return new AdminProfileDto(profileData)
    }

    async unblockUser(userId) {
        let profileData = await ProfileRepository.findByUserId(userId)

        if (!profileData) {
            throw ApiError.NotFound('Запрашиваемый пользователь не найден')
        }
        if (!profileData.isBlocked) {
            throw ApiError.BadRequest('Пользователь уже разблокирован')
        }

        profileData = await ProfileRepository.update(profileData, {'isBlocked': false})

        return new AdminProfileDto(profileData)
    }
}

module.exports = new ModerService()