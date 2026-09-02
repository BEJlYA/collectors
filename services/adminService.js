const ProfileRepository = require('../repository/profileRepository')
const ApiError = require('../exceptions/apiError')
const { ProfileTemplate, AdminProfileDto } = require('../dtos/profileDto')

class AdminService {
    async getUsers() {
        const profileData = await ProfileRepository.getAllProfiles()

        if (!profileData) {
            throw ApiError.Conflict('Произошла ошибка на стороне сервера')
        }

        return profileData.map(profileData => new ProfileTemplate(profileData))
    }

    async getUser(userId) {
        const profileData = await ProfileRepository.findByUserIdExtended(userId)

        if (!profileData) {
            throw ApiError.NotFound('Запрашиваемый пользователь не найден')
        }

        return new AdminProfileDto(profileData)
    }

    async updateUserRole(userId, data) {
        let profileData = await ProfileRepository.findByUserId(userId)

        if (!profileData) {
            throw ApiError.NotFound('Запрашиваемый пользователь не найден')
        }
        if (profileData.role === data.role) {
            throw ApiError.BadRequest('Пользователь имеет уже такую роль')
        }

        profileData = await ProfileRepository.update(profileData, data)

        return new AdminProfileDto(profileData)
    }
}

module.exports = new AdminService()