module.exports = (io, socket) => {
    socket.on('typing', (data) => {
        const { dealId, isTyping } = data

        if (!dealId) return

        socket.to(`deal-${dealId}`).emit('user-typing', {
            userId: socket.userId,
            isTyping: !!isTyping
        })
    })
}