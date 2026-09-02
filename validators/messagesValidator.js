const { param, body } = require('express-validator')

class MessageValidator {
    dealId() {
        return [
            param('dealId')
                .isInt({ min: 1 })
                .withMessage('ID чата должен быть положительным числом')
        ]
    }

    send() {
        return [
            body('message')
                .notEmpty()
                .withMessage('Сообщение не может быть пустым')
                .isLength({ max: 2000 })
                .withMessage('Сообщение не может быть длиннее 2000 символов')
                .trim()
                .escape(),
            body('replyToId')
                .optional()
                .isInt({ min: 1 })
                .withMessage('ID ответа должен быть положительным числом')
        ]
    }

    edit() {
        return [
            param('messageId')
                .isInt({ min: 1 })
                .withMessage('ID сообщения должен быть положительным числом'),
            body('message')
                .notEmpty()
                .withMessage('Сообщение не может быть пустым')
                .isLength({ max: 2000 })
                .trim()
                .escape()
        ]
    }

    delete() {
        return [
            param('messageId')
                .isInt({ min: 1 })
                .withMessage('ID сообщения должен быть положительным числом')
        ]
    }

    markRead() {
        return [
            body('messageIds')
                .isArray({ min: 1 })
                .withMessage('Необходимо передать массив ID сообщений')
        ]
    }
}

module.exports = new MessageValidator()