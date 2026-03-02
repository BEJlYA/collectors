const ProfileRepository = require("../repository/profileRepository")
const ApiError = require('../exeptions/appError')

class ProfileService {
    async getProfile(id) {
        const existingProfile = await ProfileRepository.findCurrent(id)

        if (!existingProfile) {
            throw ApiError.NotFound('Вид коллекционирования не найден')
        }

        return existingProfile
    }

    async newProfile(data) {
        const existingProfile = await ProfileRepository.isBusyData(data)

        if (existingProfile) {
            if (existingProfile.name === data.name) {
                throw ApiError.BadRequest('Такое профиль уже есть')
            }
            if (existingProfile.displayName === data.displayName) {
                throw ApiError.BadRequest('Такое имя профиля уже есть')
            }
        }

        await ProfileRepository.createProfile(data)
    }

    async updateProfile(id, data) {
        const existingProfile = await ProfileRepository.findCurrent(id)

        if (!existingProfile) {
            throw ApiError.NotFound('Вид коллекционирования не найден')
        }

        const updateData = {}

        if (data.name !== undefined && existingProfile.name !== data.name) {
            updateData.name = data.name
        }
        if (data.displayName !== undefined && existingProfile.displayName !== data.displayName) {
            updateData.displayName = data.displayName
        }
        if (data.description !== undefined && existingProfile.description !== data.description) {
            updateData.description = data.description
        }
        if (data.isActive !== undefined && existingProfile.isActive !== data.isActive) {
            updateData.isActive = data.isActive
        }

        if (Object.keys(updateData).length === 0) {
            throw ApiError.Conflict('Нет данных для обновления')
        }

        await existingProfile.update(updateData)
    }
}

module.exports = new ProfileService()