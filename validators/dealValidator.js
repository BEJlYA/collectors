const { param } = require('express-validator')

class DealValidator {
    listingId() {
        return [
            param('listingId')
                .isInt({ min: 1 })
                .withMessage('ID объявления должен быть положительным числом')
        ]
    }

    dealId() {
        return [
            param('dealId')
                .isInt({ min: 1 })
                .withMessage('ID чата должен быть положительным числом')
        ]
    }
}

module.exports = new DealValidator()