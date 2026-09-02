const jwt = require('jsonwebtoken')

module.exports = (socket, next) => {
    try {
        const token = socket.handshake.auth.token || socket.handshake.query.token

        if (!token) {
            return next(new Error('Authentication error'))
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        socket.userId = decoded.id
        socket.userRole = decoded.role
        next()
    } catch (err) {
        next(new Error('Authentication error'))
    }
}