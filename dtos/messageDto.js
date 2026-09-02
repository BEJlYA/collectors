class MessageDto {
    constructor(message) {
        this.id = message.id
        this.dealId = message.dealId
        this.message = message.message
        this.isRead = message.isRead
        this.isEdited = message.isEdited
        this.createdAt = message.createdAt
        this.replyToId = message.replyToId

        if (message.user) {
            this.user = {
                id: message.user.id,
                username: message.user.username,
                avatarUrl: message.user.avatarUrl
            }
        }
    }
}

class MessageListDto {
    constructor(messages, total, page, limit, unreadCount) {
        this.messages = messages.map(m => new MessageDto(m))
        this.total = total
        this.page = page
        this.totalPages = Math.ceil(total / limit)
        this.unreadCount = unreadCount
    }
}

module.exports = { MessageDto, MessageListDto }