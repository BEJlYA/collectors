const {Router} = require('express')
const router = Router()
const RateLimitMiddleware = require('../middleware/limitMiddleware')
const AuthMiddleware = require('../middleware/authMiddleware')
const PhotosListingsValidator = require('../validators/photosListingsValidator')
const ResourcesMiddleware = require('../middleware/resourcesMiddleware')
const OwnerMiddleware = require('../middleware/ownerMiddleware')
const ValidateMiddleware = require("../middleware/validateMiddleware")
const PhotosListingsController = require('../controllers/photosItemsController')


router.use(AuthMiddleware)
router.use(PhotosListingsValidator.ids())
router.use(ResourcesMiddleware.collection)
router.use(OwnerMiddleware('listing'))


router.get('/',
    ValidateMiddleware,
    PhotosListingsController.getAll
)

router.get('/:photoId',
    ValidateMiddleware,
    PhotosListingsController.getOne
)

router.post('/',
    RateLimitMiddleware.upload(),
    PhotosListingsValidator.data(),
    ValidateMiddleware,
    PhotosListingsController.upload
)

router.put('/:photoId',
    PhotosListingsValidator.update(),
    ValidateMiddleware,
    PhotosListingsController.update
)

router.delete('/:photoId',
    ValidateMiddleware,
    PhotosListingsController.delete
)

module.exports = router