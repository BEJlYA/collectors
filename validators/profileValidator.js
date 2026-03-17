const {param, body} = require('express-validator')

class ProfileValidator {
    id() {
        return [
            param('publicId')
                .isString()
                .notEmpty().withMessage('Public ID обязателен')
                .isLength({min: 24, max: 24})
        ]
    }

    update() {
        return [
            body('firstName')
                .isLength({min: 2, max: 30}).withMessage('Имя не может быть меньше 2 и более 30 символов')
                .notEmpty().withMessage('Ваше имя не может быть пустым')
                .matches(/^[a-zA-Zа-яА-Я]+$/).withMessage('Ваше имя может содержать только буквы')
                .trim()
                .escape(),
            body('lastName')
                .isLength({min: 3, max: 30}).withMessage('Ваша фамилия не может быть меньше 3 и более 30 символов')
                .notEmpty().withMessage('Ваша фамилия не может быть пустой')
                .matches(/^[a-zA-Zа-яА-Я]+$/).withMessage('Ваша фамилия может содержать только буквы')
                .trim()
                .escape(),
            body('country')
                .optional({ nullable: true })
                .isLength({ min: 2, max: 100 })
                .withMessage('Название страны должно быть от 2 до 100 символов')
                .matches(/^[a-zA-Zа-яА-Я\s\-]+$/)
                .withMessage('Название страны может содержать только буквы, пробелы и дефисы')
                .trim()
                .escape(),
            body('city')
                .optional({ nullable: true })
                .isLength({ min: 2, max: 100 })
                .withMessage('Название города должно быть от 2 до 100 символов')
                .matches(/^[a-zA-Zа-яА-Я\s\-]+$/)
                .withMessage('Название города может содержать только буквы, пробелы и дефисы')
                .trim()
                .escape(),
            body('categories')
                .optional()
                .isArray().withMessage('Список категорий коллекционирования не валиден')
        ]
    }

    avatar() {
        return [
            body().custom((value, { req }) => {
                if (!req.file) {
                    throw new Error('Файл не загружен')
                }
                return true
            })
        ]
    }

    settings() {
        return [
            body('emailNotifications')
                .optional()
                .isBoolean()
                .withMessage('emailNotifications должно быть true/false'),

            body('pushNotifications')
                .optional()
                .isBoolean()
                .withMessage('pushNotifications должно быть true/false'),

            body('language')
                .optional()
                .isIn(['ru', 'en', 'by'])
                .withMessage('Язык должен быть ru, en или by'),

            body('theme')
                .optional()
                .isIn(['light', 'dark', 'system'])
                .withMessage('Тема должна быть light, dark или system')
        ]
    }

}

module.exports = new ProfileValidator()