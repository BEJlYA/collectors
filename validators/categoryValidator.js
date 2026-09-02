const {param, body} = require('express-validator')

class CategoryValidator {
    id() {
        return [
            param('id')
                .optional()
                .isInt({min: 1}).withMessage('ID некорректный')
        ]
    }

    data() {
        return [
            body('name')
                .isLength({min: 5, max: 30}).withMessage('Имя категории не может быть меньше 5 и более 30 символов')
                .notEmpty().withMessage('Имя категории не может быть пустым')
                .matches(/^[a-zA-Z]$/).withMessage('Имя категории может содержать буквы английского алфавита')
                .trim()
                .escape(),
            body('displayName')
                .isLength({
                    min: 5,
                    max: 30
                }).withMessage('Отображаемое имя категории не может быть меньше 5 и более 30 символов')
                .notEmpty().withMessage('Отображаемое имя категории не может быть пустым')
                .matches(/^[a-zA-Zа-яА-Я]+$/).withMessage('Отображаемое имя категории может содержать буквы')
                .trim()
                .escape(),
            body('description')
                .isLength({
                    min: 5,
                    max: 250
                }).withMessage('Описание категории не может быть меньше 5 и более 250 символов')
                .notEmpty().withMessage('Описание категории не может быть пустым')
                .matches(/^[a-zA-Zа-яА-Я0-9\s\-.,]+$/).withMessage('Описание категории может содержать буквы, цифры, пробелы, дефисы, точки и запятые')
                .trim()
                .escape(),
            body('isActive')
                .optional()
                .isBoolean().withMessage('Укажите видимость коллекции в булевом значении')
        ]
    }
}

module.exports = new CategoryValidator()