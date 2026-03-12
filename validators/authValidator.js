const {body} = require('express-validator')

class AuthValidator {
    login() {
        return [
            body('identifier')
                .notEmpty().withMessage('Укажите логин, email, или номер телефона'),
            body('password')
                .notEmpty().withMessage('Пароль не может быть пустым'),
        ]
    }

    registration() {
        return [
            body().custom((value, { req }) => {
                if (!req.body.phoneNumber && !req.body.email) {
                    throw new Error('Укажите телефон или email')
                }
                return true
            }),
            body('phoneNumber')
                .optional({nullable: true, checkFalsy: true})
                .isMobilePhone('any').withMessage('Некорректный номер телефона')
                .customSanitizer(value => value?.replace(/[\s\-()]/g, ''))
                .trim()
                .escape(),
            body('email')
                .optional()
                .isEmail().withMessage('Неверный формат почты')
                .normalizeEmail()
                .trim()
                .escape(),
            body('password')
                .optional()
                .isLength({min: 5, max: 30}).withMessage('Пароль должен иметь длину более 5 символов и не более 30')
                .trim()
                .escape()
        ]
    }
}

module.exports = new AuthValidator()