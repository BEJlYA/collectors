const {Router} = require('express')
const router = Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const ProfileValidator = require('../validators/profileValidator')
const ValidateMiddleware = require('../middleware/validateMiddleware')
const ProfileController = require('../controllers/profileController')


router.use(AuthMiddleware)


router.get('/me',
    ValidateMiddleware,
    ProfileController.getMyProfile)

router.put('/me',
    ProfileValidator.update(),
    ValidateMiddleware,
    ProfileController.updateMyProfile)

router.put('/me/avatar',
    ProfileValidator.avatar(),
    ValidateMiddleware,
    ProfileController.updateAvatar)

router.get('/:publicId',
    ProfileValidator.id(),
    ValidateMiddleware,
    ProfileController.getPublicProfile)

router.get('/:publicId/collections',
    ProfileValidator.id(),
    ValidateMiddleware,
    ProfileController.getUserCollections)

router.get('/:publicId/feedbacks',
    ProfileValidator.id(),
    ValidateMiddleware,
    ProfileController.getUserFeedbacks)

router.get('/settings',
    ValidateMiddleware,
    ProfileController.getSettings)

router.put('/settings',
    ProfileValidator.settings(),
    ValidateMiddleware,
    ProfileController.updateSettings)

module.exports = router