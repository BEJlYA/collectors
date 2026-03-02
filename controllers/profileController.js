const {validationResult} = require("express-validator")
const models = require("../models")
const ProfileType = models.ProfileType
const ProfileService = require('../services/profileService')
const ProfileRepository = require('../repository/profileRepository')

class ProfileController {
    async getAllProfile(req, res) {
        try {
            const profles = await ProfileRepository.getAll()

            return res.json(profles)
        } catch (e) {
            console.log(e)
        }
    }

    async getProfile(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(401).json({message: "Некорректный ID: ", errors})
            }

            const profile = await ProfileService.getProfile(req.params.id)

            return res.json(profile)
        } catch (e) {
            console.log(e)
        }
    }

    async newProfile(req, res) {
        try {
            const {name, displayName, description, isActive} = req.body

            const profile = await ProfileService.newProfile({
                name,
                displayName,
                description,
                isActive
            })

            return res.json({message: 'Новая профилизация создана успешно!'})
        } catch (e) {
            console.log(e)
        }
    }

    async updateProfile(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(401).json({message: "Некорректный ID: ", errors})
            }

            const {name, displayName, description, isActive} = req.body
            const id = req.params.id

            const profile = await ProfileService.updateProfile(id, {
                name,
                displayName,
                description,
                isActive
            })

            return res.json({message: 'Вид коллекционирования обновлен'})
        } catch (e) {
            console.log(e)
        }
    }

    async deleteProfile(req, res){
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(401).json({message: "Некорректный ID: ", errors})
            }

            const existingProfile = await ProfileType.findByPk(req.params.id)

            if (!existingProfile) {
                return res.status(404).json({message: 'Вид коллекционирования не найден'})
            }

            await existingProfile.destroy()

            return res.json({message: 'Вид коллекционирования удален'})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ProfileController()