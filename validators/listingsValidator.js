const {param, body} = require('express-validator')

class ListingsValidator {
    id() {
        return [
            param('listingId')
                .isInt({min: 1})
                .withMessage('ID объявления некорректный'),
        ]
    }

    getAll() {
        return [

        ]
    }

    create() {
        return [
            body('name')
                .optional()
                .isLength({min: 5, max: 30})
                .withMessage('Имя предмета не может быть меньше 5 и более 30 символов')
                .matches(/^[a-zA-Zа-яА-Я0-9\s\-_]+$/)
                .withMessage('Имя может содержать буквы, цифры, пробелы, дефисы и подчеркивания')
                .trim()
                .escape(),
            body('itemId')
                .optional()
                .isInt({min: 1}).withMessage('ID предмета некорректный'),
            body('type')
                .isIn(['SALE', 'EXCHANGE'])
                .withMessage('Тип объявления должен быть SALE или EXCHANGE'),
            body('categoryId')
                .if(body('itemId').isEmpty())
                .isInt({ min: 1 })
                .withMessage('Категория обязательна при создании объявления без предмета'),
            body('price')
                .optional({ values: 'falsy' })
                .isFloat({ min: 0.01 })
                .withMessage('Цена должна быть положительным числом')
                .toFloat(),
            body('description')
                .optional()
                .isLength({min: 0, max: 250})
                .withMessage('Описание предмета не может быть больше 250 символов')
                .trim()
                .escape()
        ]
    }

    update() {
        return [
            body('name')
                .optional()
                .isLength({min: 5, max: 30})
                .withMessage('Имя предмета не может быть меньше 5 и более 30 символов')
                .matches(/^[a-zA-Zа-яА-Я0-9\s\-_]+$/)
                .withMessage('Имя может содержать буквы, цифры, пробелы, дефисы и подчеркивания')
                .trim()
                .escape(),
            body('type')
                .isIn(['SALE', 'EXCHANGE'])
                .withMessage('Тип объявления должен быть SALE или EXCHANGE'),
            body('categoryId')
                .optional()
                .isInt({ min: 1 })
                .withMessage('Категория обязательна при создании объявления без предмета'),
            body('price')
                .optional({ nullable: true })
                .if(body('type').equals('SALE'))
                .custom(value => {
                    if (value === null) return true
                    if (typeof value === 'number' && value > 0) return true
                    throw new Error('Цена должна быть положительным числом или не указана')
                })
                .withMessage('Для продажи укажите цену или оставьте пустым для договорной'),
            body('description')
                .optional()
                .isLength({min: 0, max: 250})
                .withMessage('Описание предмета не может быть больше 250 символов')
                .trim()
                .escape()
        ]
    }

    status() {
        return [
            body('status')
                .isIn(['DRAFT', 'HIDDEN', 'REJECTED'])
        ]
    }
}

module.exports = new ListingsValidator()