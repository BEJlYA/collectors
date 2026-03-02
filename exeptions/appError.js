module.exports = class ApiError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static ValidationError(errors) {
        return new ApiError(400, 'Ошибка валидации', errors)
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static Forbidden(message, errors = []) {
        return new ApiError(403, message, errors)
    }

    static NotFound(message = 'Запрашиваемый ресурс не найден') {
        return new ApiError(404, message)
    }

    static Conflict(message = 'Конфликт') {
        return new ApiError(409, message)
    }

    static TooManyRequests(message = 'Слишком много запросов') {
        return new ApiError(429, message)
    }
}