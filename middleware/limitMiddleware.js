const {rateLimit} = require('express-rate-limit')

class RateLimit {
    auth() {
        return rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 5,
            skipSuccessfulRequests: true,
            standardHeaders: true,
            legacyHeaders: false,
            message: {
                status: 'error',
                message: 'Слишком много попыток. Подождите 15 минут'
            },
            statusCode: 429
        })
    }

    api() {
        return rateLimit({
            windowMs: 60 * 1000,
            max: 60,
            standardHeaders: true,
            legacyHeaders: false,
            message: {
                status: 'error',
                message: 'Превышен лимит запросов'
            },
            statusCode: 429
        })
    }

    upload() {
        return rateLimit({
            windowMs: 60 * 60 * 1000,
            max: 100,
            message: {
                status: 'error',
                message: 'Слишком много загрузок. Подождите час'
            },
            statusCode: 429
        })
    }
}

module.exports = new RateLimit()