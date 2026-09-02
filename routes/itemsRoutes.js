const {Router} = require('express')
const router = Router({mergeParams: true})
const photosItemsRouter = require('./photosItemsRoutes')
const AuthMiddleware = require('../middleware/authMiddleware')
const ItemsValidator = require('../validators/itemsValidator')
const ResourcesMiddleware = require('../middleware/resourcesMiddleware')
const OwnerMiddleware = require('../middleware/ownerMiddleware')
const ValidateMiddleware = require("../middleware/validateMiddleware")
const ItemsController = require('../controllers/itemsController')


router.use('/:itemId/photos', photosItemsRouter)


router.use(AuthMiddleware)
router.use(ItemsValidator.ids())
router.use(ResourcesMiddleware.collection)
router.use(OwnerMiddleware('collection'))


router.get('/',
    ValidateMiddleware,
    ItemsController.getAll)

router.get('/:itemId',
    ValidateMiddleware,
    ItemsController.getOne)

router.post('/',
    ItemsValidator.data(),
    ValidateMiddleware,
    ItemsController.create)

router.put('/:itemId',
    ItemsValidator.data(),
    ValidateMiddleware,
    ItemsController.update)

router.delete('/:itemId',
    ValidateMiddleware,
    ItemsController.delete)

module.exports = router