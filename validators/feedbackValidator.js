const {body} = require('express-validator')

class FeedbackValidator {
    data() {
        return [
            body('targetUserId')
                .isInt({min: 1}).withMessage('ID получателя должен быть положительным числом')
                .toInt(),
            body('initiatorType')
                .isIn(['SELLER', 'BUYER'])
                .withMessage('Тип инициатора должен быть SELLER или BUYER'),
            body('rating')
                .isInt({min: 1, max: 5}).withMessage('Оценка должна быть от 1 до 5')
                .toInt(),
            body('comment')
                .optional()
                .isString()
                .isLength({max: 200}).withMessage('Комментарий не может быть длиннее 200 символов')
                .trim()
                .escape()
        ]
    }
}

module.exports = new FeedbackValidator()