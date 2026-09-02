const AuthService = require('../services/authService')
const ResponseFormatter = require('../utils/responseFormatter')

class AuthController {
    async registration(req, res, next) {
        try {
            const {email, phoneNumber, password} = req.body

            const userData = await AuthService.registration({email, phoneNumber, password})

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            })

            ResponseFormatter.success(res, {
                accessToken: userData.accessToken,
                user: userData.userDto
            }, 201)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {identifier, password} = req.body

            const userData = await AuthService.login(identifier, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            })

            ResponseFormatter.success(res, {
                accessToken: userData.accessToken,
                user: userData.userDto
            }, 201)
        } catch (e) {
            next(e)
        }
    }

    async oauthCallback(req, res, next) {
        try {
            const {tokens} = req.user

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict'
            })

            res.redirect(`${process.env.CLIENT_URL || 'https://localhost:3000'}?accessToken=${tokens.accessToken}`)
        } catch (err) {
            next(err)
        }
    }

    async activate(req, res, next) {
        try {
            await AuthService.activate(req.params.link)

            return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000')
        } catch (e) {
            next(e)
        }

    }

    async refresh(req, res, next) {
        try {
            const userId = req.user.id
            const userData = await AuthService.refresh(userId)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            })

            ResponseFormatter.success(res, {
                accessToken: userData.accessToken,
                user: userData.userDto
            })
        } catch (e) {
            return next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const userId = req.user.id
            await AuthService.logout(userId)

            res.clearCookie('refreshToken')

            ResponseFormatter.success(res)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()