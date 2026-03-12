const {param, body} = require('express-validator')

class BookmarksValidator {
    id() {
        return [
            param('bookmarkId')
                .optional()
                .isInt({min: 1}).withMessage('ID некорректный')
        ]
    }

    data() {
        return [
            body('itemId')
                .optional()
                .isInt({min: 1}).withMessage('ID некорректный')
        ]
    }
}

module.exports = new BookmarksValidator()