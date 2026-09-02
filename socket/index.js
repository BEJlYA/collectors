const { Server } = require("socket.io")
const authMiddleware = require("./middleware/auth")
const dealHandler = require("./handlers/dealHandler")
const messageHandler = require("./handlers/messageHandler")
const typingHandler = require("./handlers/typingHandler")

let io

module.exports = {
    init: (server) => {
        io = new Server(server, {
            cors: {
                origin: '*',
                credentials: true
            }
        })

        io.use(authMiddleware)

        io.on('connection', (socket) => {
            console.log(`🔌 User ${socket.userId} connected`)

            dealHandler(io, socket)
            messageHandler(io, socket)
            typingHandler(io, socket)

            socket.on('disconnect', () => {
                console.log(`🔌 User ${socket.userId} disconnected`)
            })
        })

        return io
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.IO not initialized')
        }
        return io
    }
}