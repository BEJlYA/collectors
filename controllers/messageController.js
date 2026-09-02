const MessageService = require('../services/messageService')
const ResponseFormatter = require('../utils/responseFormatter')

class MessageController {
    async getMessages(req, res, next) {
        try {
            const { dealId } = req.params
            const userId = req.user.id
            const { page = '1', limit = '50' } = req.query

            const result = await MessageService.getMessages(dealId, userId, parseInt(page), parseInt(limit))

            ResponseFormatter.success(res, {
                messages: result
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MessageController()