const DealRepository = require('../../repository/dealRepository')

module.exports = (io, socket) => {
    socket.on('join-deal', async (dealId) => {
        try {
            const deal = await DealRepository.findById(dealId)
            if (!deal || (deal.sellerId !== socket.userId && deal.buyerId !== socket.userId)) {
                socket.emit('error', { message: 'Доступ запрещён' })
                return
            }

            if (socket.currentDealId) {
                socket.leave(`deal-${socket.currentDealId}`)
            }

            socket.join(`deal-${dealId}`)
            socket.currentDealId = dealId
            console.log(`📦 User ${socket.userId} joined deal ${dealId}`)

            socket.emit('joined-deal', { dealId })
            io.to(`user-${deal.sellerId}`).emit('new-deal', { deal })
        } catch (err) {
            socket.emit('error', { message: err.message })
        }
    })

    socket.on('leave-deal', () => {
        if (socket.currentDealId) {
            socket.leave(`deal-${socket.currentDealId}`)
            console.log(`👋 User ${socket.userId} left deal ${socket.currentDealId}`)
            socket.currentDealId = null
            socket.emit('left-deal', { success: true })
        }
    })
}