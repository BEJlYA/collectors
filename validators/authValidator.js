const {body} = require("express-validator")

class AuthValidator{
    login() {
        return [
            body('identifier')
                .notEmpty()
                .withMessage('Укажите логин, email, или номер телефона'),
            body('password')
                .notEmpty()
                .withMessage('Пароль не может быть пустым'),
        ]
    }

    registration() {
        return [
            body('username')
                .notEmpty()
                .withMessage('Имя пользователя не может быть пустым')
                .isLength({min: 3, max: 20})
                .withMessage('Имя пользователя должно иметь длину более 5 символов и не более 30')
                .isAlphanumeric()
                .withMessage('Только буквы или цифры')
                .trim(),
            body('password')
                .notEmpty()
                .withMessage('Пароль обязателен')
                .isLength({min: 5, max: 30})
                .withMessage('Пароль должен иметь длину более 5 символов и не более 30'),
            body('email')
                .notEmpty()
                .withMessage('Email обязателен к указанию')
                .isEmail()
                .withMessage('Почта обязательна к указанию')
                .normalizeEmail(),
            body('phoneNumber')
                .optional({nullable: true, checkFalsy: true})
                .customSanitizer(value => value?.replace(/[\s\-()]/g, ''))
                .isMobilePhone('any')
                .withMessage('Некорректный номер телефона'),
        ]
    }
}

module.exports = new AuthValidator()