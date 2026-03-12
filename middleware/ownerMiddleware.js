const ApiError = require('../exeptions/appError')

module.exports = (resourceName, ownerField = 'userId') => {
    return (req, res, next) => {
        const resource = req[resourceName]

        if (!resource) {
            return next(ApiError.BadRequest(`${resourceName} не загружен`))
        }

        if (resource[ownerField] !== req.user.id) {
            return next(ApiError.Forbidden(`Нет доступа к этому ${resourceName}`))
        }

        next()
    }
}