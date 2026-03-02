const {validationResult} = require('express-validator')
const ProfileService = require('../services/profileService')
const ProfileRepository = require('../repository/profileRepository')
const ApiError = require('../exeptions/appError');

class ProfileController {
    async getAllProfile(req, res, next) {
        try {
            const profiles = await ProfileRepository.getAll()

            return res.json(profiles)
        } catch (e) {
            next(e)
        }
    }

    async getProfile(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации:', errors.array()))
            }

            const profile = await ProfileService.getProfile(req.params.id)

            return res.json(profile)
        } catch (e) {
            next(e)
        }
    }

    async newProfile(req, res, next) {
        try {
            const {name, displayName, description, isActive} = req.body

            const profile = await ProfileService.newProfile({
                name,
                displayName,
                description,
                isActive
            })

            return res.json({
                message: 'Новая профилизация создана успешно!'
            })
        } catch (e) {
            next(e)
        }
    }

    async updateProfile(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации:', errors.array()))
            }

            const {name, displayName, description, isActive} = req.body
            const id = req.params.id

            const profile = await ProfileService.updateProfile(id, {
                name,
                displayName,
                description,
                isActive
            })

            return res.json({
                message: 'Вид коллекционирования обновлен'
            })
        } catch (e) {
            next(e)
        }
    }

    async deleteProfile(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации:', errors.array()))
            }

            await ProfileService.deleteProfile(req.params.id)

            return res.json({
                message: 'Вид коллекционирования удален'
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProfileController()