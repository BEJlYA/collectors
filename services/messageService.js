const MessageRepository = require('../repository/messageRepository')
const ApiError = require('../exceptions/apiError')
const DealRepository = require('../repository/dealRepository')
const { MessageDto, MessageListDto } = require('../dtos/messageDto')

class MessageService {
    async create(data) {
        const { dealId, userId, message, replyToId } = data

        const deal = await DealRepository.findById(dealId)
        if (!deal) {
            throw ApiError.NotFound('Чат не найдена')
        }

        if (deal.sellerId !== userId && deal.buyerId !== userId) {
            throw ApiError.Forbidden('Вы не участник этой чата')
        }

        const newMessage = await MessageRepository.create({
            dealId,
            userId,
            message,
            replyToId
        })

        await DealRepository.updateDealTime(dealId)

        return new MessageDto(await MessageRepository.findById(newMessage.id))
    }

    async getMessages(dealId, userId, page = 1, limit = 50) {
        const deal = await DealRepository.findById(dealId)
        if (!deal) {
            throw ApiError.NotFound('Чат не найден')
        }

        if (deal.sellerId !== userId && deal.buyerId !== userId) {
            throw ApiError.Forbidden('Нет доступа к сообщениям')
        }

        const offset = (page - 1) * limit
        const { rows, count } = await MessageRepository.findByDeal(dealId, limit, offset)
        const unreadCount = await MessageRepository.getUnreadCount(dealId, userId)

        return new MessageListDto(
            rows,
            count,
            page,
            limit,
            unreadCount
        )
    }

    async edit(messageId, userId, newMessage) {
        const message = await MessageRepository.findById(messageId)
        if (!message) {
            throw ApiError.NotFound('Сообщение не найдено')
        }

        if (message.userId !== userId) {
            throw ApiError.Forbidden('Нельзя редактировать чужое сообщение')
        }

        const updateMessage = await MessageRepository.update(message, {
            message: newMessage,
            isEdited: true
        })

        return new MessageDto(updateMessage)
    }

    async delete(messageId, userId) {
        const message = await MessageRepository.findById(messageId)
        if (!message) {
            throw ApiError.NotFound('Сообщение не найдено')
        }

        if (message.userId !== userId) {
            throw ApiError.Forbidden('Нельзя удалять чужое сообщение')
        }

        return await MessageRepository.delete(message)
    }

    async markAsRead(messageIds, userId, dealId) {
        const deal = await DealRepository.findById(dealId)
        if (!deal) {
            throw ApiError.NotFound('Чат не найдена')
        }

        const receiverId = deal.sellerId === userId ? deal.buyerId : deal.sellerId
        if (receiverId !== userId) {
            throw ApiError.Forbidden('Нет прав')
        }

        return await MessageRepository.markAsRead(messageIds, userId, dealId)
    }
}

module.exports = new MessageService()