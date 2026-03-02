const ApiError = require('../exeptions/appError')

module.exports = function (requiredRoles) {
    return function (req, res, next) {
        try {
            if (!req.user) {
                return next(ApiError.UnauthorizedError('Пользователь не авторизован'))
            }

            const hasRole = requiredRoles.includes(req.user.role)

            if (!hasRole) {
                return next(ApiError.Conflict('Нет прав доступа'))
            }

            next()
        } catch (e) {
            next()
        }
    }
}