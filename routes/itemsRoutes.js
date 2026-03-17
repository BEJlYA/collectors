const {Router} = require('express')
const router = Router({ mergeParams: true })
const photosRouter = require('./photosRoutes')
const AuthMiddleware = require('../middleware/authMiddleware')
const itemsValidator = require('../validators/itemsValidator')
const ResourcesMiddleware = require('../middleware/resourcesMiddleware')
const OwnerMiddleware = require('../middleware/ownerMiddleware')
const ValidateMiddleware = require("../middleware/validateMiddleware")
const itemsController = require('../controllers/itemsController')

router.use('/:itemId/photos', photosRouter)

router.use(AuthMiddleware)
router.use(itemsValidator.ids())
router.use(ResourcesMiddleware.collection)
router.use(OwnerMiddleware('collection'))

router.get('/',
    ValidateMiddleware,
    itemsController.getAll)

router.get('/:itemId',
    ValidateMiddleware,
    itemsController.getOne)

router.post('/',
    itemsValidator.data(),
    ValidateMiddleware,
    itemsController.create)

router.put('/:itemId',
    itemsValidator.data(),
    ValidateMiddleware,
    itemsController.update)

router.delete('/:itemId',
    ValidateMiddleware,
    itemsController.delete)

module.exports = router