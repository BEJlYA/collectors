const {param, body} = require('express-validator')

class CollectionValidator {
    id() {
        return [
            param('id')
                .isInt({min:1}).withMessage('ID некорректный'),
        ]
    }

    data() {
        return [
            body('name')
                .isLength({min: 5, max: 30}).withMessage('Имя коллекции не может быть меньше 5 и более 30 символов')
                .notEmpty().withMessage('Имя коллекции не может быть пустым')
                .matches(/^[a-zA-Zа-яА-Я0-9\s\-]+$/).withMessage('Имя может содержать буквы, цифры, пробелы и дефисы')
                .trim()
                .escape(),
            body('categoryTypeId')
                .notEmpty().withMessage('ID Категории коллекции не может быть пустым')
                .isInt({min:1}).withMessage('Укажите ID категории коллекции в числовом формате'),
            body('isPublic')
                .optional()
                .isBoolean().withMessage('Укажите видимость коллекции в булевом значении')
        ]
    }
}

module.exports = new CollectionValidator()