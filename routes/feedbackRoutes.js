const {Router} = require('express')
const router = Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const FeedbacksValidator = require('../validators/bookmarksValidator')
const ValidateMiddleware = require('../middleware/validateMiddleware')
const FeedbackController = require('../controllers/feedbackController')

router.use(AuthMiddleware)
router.use(FeedbacksValidator.data())
router.use(ValidateMiddleware)

router.post('/',
    FeedbackController.create)


module.exports = router