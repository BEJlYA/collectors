const {Router} = require('express')
const router = Router()
const CategoryController = require('../controllers/categoryController')
const CategoryValidator = require('../validators/categoryValidator')
const ValidateMiddleware = require("../middleware/validateMiddleware")
const AuthMiddleware = require('../middleware/authMiddleware')
const RoleMiddleware = require('../middleware/roleMiddleware')

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

router.post('/',
    RoleMiddleware(['ADMIN']),
    CategoryValidator.data(),
    ValidateMiddleware,
    CategoryController.create
)

router.put('/:id',
    RoleMiddleware(['ADMIN']),
    CategoryValidator.data(),
    ValidateMiddleware,
    CategoryController.update
)

router.delete('/:id',
    RoleMiddleware(['ADMIN']),
    ValidateMiddleware,
    CategoryController.delete
)

module.exports = router