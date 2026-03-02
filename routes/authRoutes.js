const {Router} = require("express")
const router = Router()
const AuthController = require("../controllers/AuthController")
const AuthValidator = require('../validators/authValidator')

router.post("/login",
    AuthValidator.login,
    AuthController.login
)

router.post("/register",
    AuthValidator.registration,
    AuthController.registration
)

router.get('/activate/:link',
    AuthController.activate
)

module.exports = router