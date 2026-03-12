const {param, body} = require('express-validator')

class PhotosValidator {
    ids() {
        return [
            param('collectionId').isInt({min:1}).withMessage('ID коллекции некорректный'),
            param('itemId').isInt({min:1}).withMessage('ID предмета некорректный'),
            param('photoId').optional().isInt({min:1}).withMessage('ID фото некорректный')
        ]
    }

    data() {
        return [
            body('photoUrl')
                .notEmpty().withMessage('URL фото не может быть пустым')
                .matches(/^[a-zA-Z0-9\/\-_\.]+$/).withMessage('Некорректный формат пути к фото')
                .trim()
                .escape(),
            body('isPrimary')
                .optional()
                .isBoolean().withMessage('Укажите принадлежность обмена предмета в булевом значении'),
            body('sortOrder')
                .isInt({min:0}).withMessage('Приоритет фотографии некорректный')
        ]
    }
}

module.exports = new PhotosValidator()