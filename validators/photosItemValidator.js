const {param, body} = require('express-validator')

class PhotosItemValidator {
    ids() {
        return [
            param('collectionId')
                .isInt({min: 1}).withMessage('ID коллекции некорректный'),
            param('itemId')
                .isInt({min: 1}).withMessage('ID предмета некорректный'),
            param('photoId')
                .optional()
                .isInt({min: 1}).withMessage('ID фото некорректный')
        ]
    }

    data() {
        return [
            body('isPrimary')
                .isBoolean().withMessage('isPrimary должно быть true или false')
                .toBoolean(),
            body('sortOrder')
                .isInt({min: 0}).withMessage('sortOrder должен быть ≥ 0')
                .toInt(),
            body().custom((value, {req}) => {
                if (!req.files || req.files.length === 0) {
                    throw new Error('Не выбраны файлы для загрузки')
                }

                if (req.files.length > 5) {
                    throw new Error('Максимум 5 файлов за раз')
                }

                return true
            })
        ]
    }

    update() {
        return [
            body('isPrimary')
                .optional()
                .isBoolean().withMessage('isPrimary должно быть true или false')
                .toBoolean(),
            body('sortOrder')
                .optional()
                .isInt({min: 0}).withMessage('sortOrder должен быть ≥ 0')
                .toInt()
        ]
    }
}

module.exports = new PhotosItemValidator()