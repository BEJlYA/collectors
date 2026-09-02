const {Router} = require('express')
const router = Router()
const RateLimitMiddleware = require('../middleware/limitMiddleware')
const AuthMiddleware = require('../middleware/authMiddleware')
const PhotosItemsValidator = require('../validators/photosItemValidator')
const ResourcesMiddleware = require('../middleware/resourcesMiddleware')
const OwnerMiddleware = require('../middleware/ownerMiddleware')
const ValidateMiddleware = require("../middleware/validateMiddleware")
const PhotosItemsController = require('../controllers/photosItemsController')


router.use(AuthMiddleware)
router.use(PhotosItemsValidator.ids())
router.use(ResourcesMiddleware.collection)
router.use(OwnerMiddleware('collection'))
router.use(ResourcesMiddleware.item)
router.use(OwnerMiddleware('item'))


router.get('/',
    ValidateMiddleware,
    PhotosItemsController.getAll
)

router.get('/:photoId',
    ValidateMiddleware,
    PhotosItemsController.getOne
)

router.post('/',
    RateLimitMiddleware.upload(),
    PhotosItemsValidator.data(),
    ValidateMiddleware,
    PhotosItemsController.upload
)

router.put('/:photoId',
    PhotosItemsValidator.update(),
    ValidateMiddleware,
    PhotosItemsController.update
)

router.delete('/:photoId',
    ValidateMiddleware,
    PhotosItemsController.delete
)

module.exports = router