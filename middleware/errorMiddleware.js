const ApiError = require('../exeptions/appError')
const ResponseFormatter = require('../utils/ResponseFormatter')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return ResponseFormatter.error(res, err, err.status)
    }

    return ResponseFormatter.error(res, err, 500)
}