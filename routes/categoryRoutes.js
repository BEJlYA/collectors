const {Router} = require('express')
const router = Router()
const CategoryController = require('../controllers/categoryController')
const CategoryValidator = require('../validators/categoryValidator')
const ValidateMiddleware = require("../middleware/validateMiddleware")
const AuthMiddleware = require('../middleware/authMiddleware')


router.use(AuthMiddleware)
router.use(CategoryValidator.id())


router.get('/',
    ValidateMiddleware,
    CategoryController.getAll
)

router.get('/:id',
    ValidateMiddleware,
    CategoryController.getOne
)

module.exports = router