const {param, body} = require("express-validator")

class ProfileValidator{
    id() {
        return [
            param('id')
                .isInt()
                .toInt()
                .withMessage('ID некорректный')
        ]
    }
}

module.exports = new ProfileValidator()