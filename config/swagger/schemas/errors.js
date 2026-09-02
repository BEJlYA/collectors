module.exports = {
    // ===== ERROR =====
    ErrorResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        field: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        }
    },
    ValidationErrorResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Ошибка валидации' },
            errors: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        field: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        }
    },
    BadRequestResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Некорректный запрос' }
        }
    },
    UnauthorizedResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Пользователь не авторизован' }
        }
    },
    ForbiddenResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Доступ запрещён' }
        }
    },
    NotFoundResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Ресурс не найден' }
        }
    },
    ConflictResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Конфликт данных' }
        }
    },
    TooManyRequestsResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Слишком много запросов' }
        }
    }
}