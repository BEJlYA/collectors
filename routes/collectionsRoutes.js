const {Router} = require('express')
const router = Router({ mergeParams: true })
const itemsRoutes = require("./itemsRoutes")
const AuthMiddleware = require('../middleware/authMiddleware')
const CollectionValidator = require('../validators/collectionValidator')
const ValidateMiddleware = require("../middleware/validateMiddleware")
const CollectionsController = require('../controllers/collectionsController')

router.use(AuthMiddleware)

router.use('/:collectionId/items', itemsRoutes)

router.get('/',
    CollectionsController.getAll)

router.get('/:collectionId',
    CollectionValidator.id(),
    CollectionsController.getOne)

router.post('/',
    CollectionValidator.data(),
    ValidateMiddleware,
    CollectionsController.create)

router.put('/:collectionId',
    CollectionValidator.id(),
    CollectionValidator.data(),
    ValidateMiddleware,
    CollectionsController.update)

router.delete('/:collectionId',
    CollectionValidator.id(),
    ValidateMiddleware,
    CollectionsController.delete)

module.exports = router