const {Router} = require('express')
const router = Router()
const ProfileController = require('../controllers/ProfileController')
const AuthMiddleware = require('../middleware/authMiddleware')
const RoleMiddleware = require('../middleware/roleMiddleware')
const ProfileValidator = require('../validators/profileValidator')

router.get('/',
    AuthMiddleware,
    ProfileController.getAllProfile
)

router.get('/:id',
    AuthMiddleware,
    ProfileValidator.id(),
    ProfileController.getProfile
)

router.post('/',
    AuthMiddleware,
    RoleMiddleware(['ADMIN']),
    ProfileController.newProfile
)

router.put('/:id',
    AuthMiddleware,
    RoleMiddleware(['ADMIN']),
    ProfileValidator.id(),
    ProfileController.updateProfile
)

router.delete('/:id',
    AuthMiddleware,
    RoleMiddleware(['ADMIN']),
    ProfileValidator.id(),
    ProfileController.deleteProfile
)

module.exports = router