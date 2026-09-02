const {param, body} = require('express-validator')

class PhotosListingsValidator {
    ids() {
        return [
            param('listingId')
                .isInt({min: 1}).withMessage('ID объявления некорректный'),
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

                if (req.files.length > 10) {
                    throw new Error('Максимум 10 файлов за раз')
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

module.exports = new PhotosListingsValidator()