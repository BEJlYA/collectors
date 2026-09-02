const ProfileRepository = require('../repository/profileRepository')
const ApiError = require("../exceptions/apiError")
const {ProfileDto, ProfileFeedbacksDto, ProfileSettingsDto, ProfileCollectionsDto} = require('../dtos/profileDto')
const queue = require("../workers/imageQueue")

class ProfileService {
    async getMyProfile(userId) {
        const profileData = await ProfileRepository.findByUserId(userId)

        if (!profileData) {
            throw ApiError.BadRequest('Не существующий профиль')
        }

        return new ProfileDto(profileData)
    }

    async updateAvatar(userId, file) {
        let profileData = await ProfileRepository.findByUserId(userId)

        if (!profileData) {
            throw ApiError.BadRequest('Не существующий профиль')
        }

        profileData = await ProfileRepository.update(profileData, {
            avatarUrl: `/uploads/users/${file.filename}`
        })

        await queue.add('processImage', {
            path: file.path,
            filename: file.filename
        })

        return new ProfileDto(profileData)
    }

    async updateMyProfile(data) {
        const {
            userId,
            firstName,
            lastName,
            country,
            city,
            categories,
            preferences
        } = data

        let profileData = await ProfileRepository.findByUserId(userId)

        if (!profileData) {
            throw ApiError.BadRequest('Не существующий профиль')
        }

        profileData = await ProfileRepository.update(profileData, {
            firstName,
            lastName,
            country,
            city,
            categories,
            preferences
        })

        return new ProfileDto(profileData)
    }

    async getPublicProfile(publicId) {
        const profileData = await ProfileRepository.findByPublicId(publicId)

        if (!profileData) {
            throw ApiError.BadRequest('Не существующий профиль')
        }

        return new ProfileDto(profileData)
    }

    async getUserCollections(publicId) {
        const profileData = await ProfileRepository.findPublicCollections(publicId)

        if (!profileData) {
            throw ApiError.BadRequest('Не существующий профиль')
        }

        return new ProfileCollectionsDto(profileData)
    }

    async getUserFeedbacks(publicId) {
        const profileData = await ProfileRepository.findPublicFeedbacks(publicId)

        if (!profileData) {
            throw ApiError.BadRequest('Не существующий профиль')
        }

        return new ProfileFeedbacksDto(profileData)
    }

    async getSettings(userId) {
        const profileData = await ProfileRepository.findByUserId(userId)

        if (!profileData) {
            throw ApiError.BadRequest('Не существующий профиль')
        }

        return new ProfileSettingsDto(profileData)
    }

    async updateSettings(userId, data) {
        let profileData = await ProfileRepository.findByUserId(userId)

        if (!profileData) {
            throw ApiError.BadRequest('Не существующий профиль')
        }

        profileData = await ProfileRepository.update(profileData, data)

        return new ProfileSettingsDto(profileData)
    }
}

module.exports = new ProfileService()