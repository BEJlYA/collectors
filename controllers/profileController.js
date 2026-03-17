const ProfileService = require('../services/profileService')
const ResponseFormatter = require("../utils/responseFormatter")

class ProfileController {
    async getMyProfile(req, res, next) {
        try {
            const userId = req.user.id

            const profileData = await ProfileService.getMyProfile(userId)

            ResponseFormatter.success(res, {
                profile: profileData
            })
        } catch (e) {
            return next(e)
        }
    }

    async updateAvatar(req, res, next) {
        try {
            const userId = req.user.id
            const file = req.file

            const profileData = await ProfileService.updateAvatar(userId, file)

            ResponseFormatter.success(res, {
                profile: profileData
            })
        } catch (e) {
            return next(e)
        }
    }

    async updateMyProfile(req, res, next) {
        try {
            const userId = req.user.id
            const {
                firstName,
                lastName,
                country,
                city,
                categories,
            } = req.body
            const file = req.files

            const profileData = await ProfileService.updateMyProfile({
                userId,
                firstName,
                lastName,
                country,
                city,
                categories,
                file
            })

            ResponseFormatter.success(res, {
                profile: profileData
            })
        } catch (e) {
            return next(e)
        }
    }

    async getPublicProfile(req, res, next) {
        try {
            const publicId = req.params.publicId

            const profileData = await ProfileService.getPublicProfile(publicId)

            ResponseFormatter.success(res, {
                profile: profileData
            })
        } catch (e) {
            return next(e)
        }
    }

    async getUserCollections(req, res, next) {
        try {
            const publicId = req.params.publicId

            const profileData = await ProfileService.getUserCollections(publicId)

            ResponseFormatter.success(res, {
                collections: profileData
            })
        } catch (e) {
            return next(e)
        }
    }

    async getUserFeedbacks(req, res, next) {
        try {
            const publicId = req.params.publicId

            const profileData = await ProfileService.getUserFeedbacks(publicId)

            ResponseFormatter.success(res, {
                feedbacks: profileData
            })
        } catch (e) {
            return next(e)
        }
    }

    async getSettings(req, res, next) {
        try {
            const userId = req.user.id

            const profileData = await ProfileService.getSettings(userId)

            ResponseFormatter.success(res, {
                settings: profileData
            })
        } catch (e) {
            return next(e)
        }
    }

    async updateSettings(req, res, next) {
        try {
            const userId = req.user.id
            const {
                none
            } = req.body

            const profileData = await ProfileService.updateSettings(userId, {
                none
            })

            ResponseFormatter.success(res, {
                settings: profileData
            })
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new ProfileController()