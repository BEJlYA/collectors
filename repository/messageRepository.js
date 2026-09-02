const { Op } = require('sequelize')
const models = require('../config/associations')
const Messages = models.Messages

class MessageRepository {
    async create(data) {
        return await Messages.create({
            dealId: data.dealId,
            userId: data.userId,
            message: data.message,
            replyToId: data.replyToId || null,
            isRead: false,
            isEdited: false
        })
    }

    async findByDeal(dealId, limit = 50, offset = 0) {
        return await Messages.findAndCountAll({
            where: { dealId },
            order: [['createdAt', 'ASC']],
            limit,
            offset,
            include: [{
                model: models.Users,
                as: 'user',
                attributes: ['id', 'username', 'avatarUrl']
            }]
        })
    }

    async findById(id) {
        return await Messages.findByPk(id, {
            include: [{
                model: models.Users,
                as: 'user',
                attributes: ['id', 'username', 'avatarUrl']
            }]
        })
    }

    async update(message, data) {
        return await message.update({
            ...data,
            updatedAt: new Date()
        })
    }

    async delete(message) {
        await message.destroy()
        return true
    }

    async markAsRead(messageIds, userId, dealId) {
        return await Messages.update(
            {
                isRead: true,
                readAt: new Date()
            },
            {
                where: {
                    id: { [Op.in]: messageIds },
                    dealId,
                    userId: { [Op.ne]: userId }
                }
            }
        )
    }

    async getUnreadCount(dealId, userId) {
        return await Messages.count({
            where: {
                dealId,
                userId: { [Op.ne]: userId },
                isRead: false
            }
        })
    }
}

module.exports = new MessageRepository()