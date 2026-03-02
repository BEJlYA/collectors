const {validationResult} = require('express-validator')
const AuthService = require('../services/authService')
const ApiError = require('../exeptions/appError')

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации:', errors.array()))
            }

            const {username, password, phoneNumber, email} = req.body

            const userData = await AuthService.registration({username, password, phoneNumber, email})

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json({
                message: 'Пользователь создан!',
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
                user: userData.user
            })
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации:', errors.array()))
            }

            const {identifier, password} = req.body

            const userData = await AuthService.login(identifier, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json({
                message: 'Успешная авторизация!',
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
                user: userData.user
            })
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            await AuthService.activate(req.params.link)

            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }

    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const tokenData = await AuthService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(tokenData)
        } catch (e) {
            next(e)
    }
    }
}

module.exports = new AuthController()