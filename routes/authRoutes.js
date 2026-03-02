const {Router} = require('express')
const router = Router()
const AuthController = require('../controllers/AuthController')
const AuthValidator = require('../validators/authValidator')
const AuthMiddleware = require('../middleware/authMiddleware')

router.post('/register',
    AuthValidator.registration(),
    AuthController.registration
)

router.post('/login',
    AuthValidator.login(),
    AuthController.login
)

router.get('/activate/:link',
    AuthController.activate
)

router.get('/logout',
    AuthMiddleware,
    AuthController.logout)

module.exports = router