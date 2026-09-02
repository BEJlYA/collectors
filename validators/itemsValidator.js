const {param, body} = require('express-validator')

class ItemsValidator {
    ids() {
        return [
            param('collectionId')
                .isInt({min: 1}).withMessage('ID коллекции некорректный'),
            param('itemId')
                .optional()
                .isInt({min: 1}).withMessage('ID предмета некорректный')
        ]
    }

    data() {
        return [
            body('name')
                .isLength({min: 5, max: 30}).withMessage('Имя предмета не может быть меньше 5 и более 30 символов')
                .notEmpty().withMessage('Имя предмета не может быть пустым')
                .matches(/^[a-zA-Zа-яА-Я0-9\s\-_]+$/).withMessage('Имя может содержать буквы, цифры, пробелы, дефисы и подчеркивания')
                .trim()
                .escape(),
            body('description')
                .isLength({min: 0, max: 250}).withMessage('Описание предмета не может быть больше 250 символов')
                .trim()
                .escape(),
            body('isForTrade')
                .notEmpty().withMessage('Укажите принадлежит ли предмет обмену')
                .isBoolean().withMessage('Укажите принадлежность обмена предмета в булевом значении'),
            body('newCollectionId')
                .optional()
                .isInt({min: 1}).withMessage('ID новой коллекции некорректный')

        ]
    }
}

module.exports = new ItemsValidator()