class ResponseFormatter {
    static success(res, data = null, statusCode = 200, message = 'ok') {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        })
    }

    static error(res, error, statusCode = 500) {
        const message = error.message || 'server error'
        const errors = error.errors || null

        return res.status(statusCode).json({
            success: false,
            message,
            errors
        })
    }
}

module.exports = ResponseFormatter