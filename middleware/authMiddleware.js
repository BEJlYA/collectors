const jwt = require('jsonwebtoken')
const ApiError = require('../exeptions/appError')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.BadRequest('Нет токена авторизации'))
        }

        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return next(ApiError.UnauthorizedError('Пользователь не авторизован'))
        }

        req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        next()

    } catch (e) {
        next()
    }
}