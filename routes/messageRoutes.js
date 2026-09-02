const { Router } = require('express')
const router = Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const MessagesValidator = require('../validators/messagesValidator')
const MessageController = require('../controllers/messageController')


router.get('/:dealId',
    AuthMiddleware,
    MessagesValidator.dealId(),
    MessageController.getMessages
)

module.exports = router