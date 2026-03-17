const {Router} = require('express')
const router = Router()
const passport = require('../config/passport')
const oauthConfig = require('../config/oauth')
const RateLimitMiddleware = require('../middleware/limitMiddleware')
const AuthController = require('../controllers/AuthController')
const AuthValidator = require('../validators/authValidator')
const ValidateMiddleware = require('../middleware/validateMiddleware')
const AuthMiddleware = require('../middleware/authMiddleware')

router.post('/register',
    RateLimitMiddleware.auth(),
    AuthValidator.registration(),
    ValidateMiddleware,
    AuthController.registration
)

router.post('/login',
    RateLimitMiddleware.auth(),
    AuthValidator.login(),
    ValidateMiddleware,
    AuthController.login
)

Object.entries(oauthConfig).forEach(([provider, config]) => {
    router.get(`/${provider}`,
        passport.authenticate(provider, {
            scope: config.scope
        })
    )

    router.get(`/${provider}/callback`,
        passport.authenticate(provider, { session: false }),
        AuthController.oauthCallback
    )
})
router.get('/activate/:link',
    AuthController.activate
)

router.post('/refresh',
    AuthController.refresh)

router.get('/logout',
    AuthMiddleware,
    AuthController.logout)

module.exports = router