const {validationResult} = require("express-validator")
const UserService = require('../services/userService')

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка регистрации: ", errors})
            }

            const {username, password, phoneNumber, email} = req.body

            const userData = await UserService.registration({username, password, phoneNumber, email})

            return res.json({message: 'Пользователь создан!'}, userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(401).json({message: "Ошибка входа: ", errors})
            }

            const {identifier, password} = req.body

            const userData = await UserService.login(identifier, password)

            return res.json({message: 'Успешная авторизация!', userData})
        } catch (e) {
            console.log(e)
        }
    }

    async activate(req, res){
        try {
            await UserService.activate(req.params.link)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = new AuthController()