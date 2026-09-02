const MessageService = require('../../services/messageService')

module.exports = (io, socket) => {
    socket.on('send-message', async (data) => {
        const { dealId, message, replyToId } = data

        if (!dealId || !message || message.trim() === '') {
            console.log(dealId, message)
            socket.emit('error', { message: 'Некорректное сообщение' })
            return
        }

        try {
            const savedMessage = await MessageService.create({
                dealId,
                userId: socket.userId,
                message: message.trim(),
                replyToId
            })

            io.to(`deal-${dealId}`).emit('new-message', savedMessage)
        } catch (err) {
            socket.emit('error', { message: err.message })
        }
    })

    socket.on('edit-message', async (data) => {
        const { messageId, message } = data

        try {
            const updated = await MessageService.edit(messageId, socket.userId, message)
            io.to(`deal-${socket.currentDealId}`).emit('message-edited', updated)
        } catch (err) {
            socket.emit('error', { message: err.message })
        }
    })

    socket.on('delete-message', async (data) => {
        const { messageId } = data

        try {
            await MessageService.delete(messageId, socket.userId)
            io.to(`deal-${socket.currentDealId}`).emit('message-deleted', { messageId })
        } catch (err) {
            socket.emit('error', { message: err.message })
        }
    })

    socket.on('mark-read', async (data) => {
        const { messageIds, dealId } = data

        if (!messageIds || messageIds.length === 0) return

        try {
            await MessageService.markAsRead(messageIds, socket.userId, dealId)
            io.to(`deal-${dealId}`).emit('messages-read', {
                userId: socket.userId,
                messageIds,
                dealId
            })
        } catch (err) {
            socket.emit('error', { message: err.message })
        }
    })
}