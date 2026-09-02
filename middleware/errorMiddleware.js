const ApiError = require('../exceptions/apiError')
const ResponseFormatter = require('../utils/responseFormatter')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return ResponseFormatter.error(res, err, err.status)
    }

    return ResponseFormatter.error(res, err, 500)
}