const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return new Error('Нет токена авторизации')
        }

        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return new Error("Пользователь не авторизован")
        }

        req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        next()

    } catch (e) {
        console.log(e)
    }
}