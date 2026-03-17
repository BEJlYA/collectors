const {Router} = require('express')
const router = Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const profileValidator = require('../validators/profileValidator')
const ValidateMiddleware = require('../middleware/validateMiddleware')
const ProfileController = require('../controllers/profileController')

router.use(AuthMiddleware)

router.get('/me',
    ValidateMiddleware,
    ProfileController.getMyProfile)

router.put('/me',
    profileValidator.update(),
    ValidateMiddleware,
    ProfileController.updateMyProfile)

router.put('/me/avatar',
    profileValidator.avatar(),
    ValidateMiddleware,
    ProfileController.updateAvatar)

router.get('/:publicId',
    profileValidator.id(),
    ValidateMiddleware,
    ProfileController.getPublicProfile)

router.get('/:publicId/collections',
    profileValidator.id(),
    ValidateMiddleware,
    ProfileController.getUserCollections)

router.get('/:publicId/feedbacks',
    profileValidator.id(),
    ValidateMiddleware,
    ProfileController.getUserFeedbacks)

router.get('/settings',
    ValidateMiddleware,
    ProfileController.getSettings)

router.put('/settings',
    profileValidator.settings(),
    ValidateMiddleware,
    ProfileController.updateSettings)

module.exports = router