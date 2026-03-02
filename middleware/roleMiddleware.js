module.exports = function (requiredRoles) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).json({message: "Пользователь не авторизован"})
        }

        const hasRole = requiredRoles.includes(req.user.role)

        if (!hasRole) {
            return res.status(403).json({message: "Нет прав доступа"})
        }

        next()
    }
}