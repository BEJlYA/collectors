const ApiError = require('../exceptions/apiError')
const TokenService = require('../services/tokenService')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = req.headers.authorization.split(' ')[1]

        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = TokenService._validateAccessToken(accessToken)

        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        next()

    } catch (e) {
        next(ApiError.UnauthorizedError())
    }
}