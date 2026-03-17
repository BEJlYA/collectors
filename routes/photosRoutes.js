const {Router} = require('express')
const router = Router()
const RateLimitMiddleware = require('../middleware/limitMiddleware')
const AuthMiddleware = require('../middleware/authMiddleware')
const photosValidator = require('../validators/photosValidator')
const ResourcesMiddleware = require('../middleware/resourcesMiddleware')
const OwnerMiddleware = require('../middleware/ownerMiddleware')
const ValidateMiddleware = require("../middleware/validateMiddleware")
const photosController = require('../controllers/photosController')

router.use(AuthMiddleware)
router.use(photosValidator.ids())
router.use(ResourcesMiddleware.collection)
router.use(OwnerMiddleware('collection'))
router.use(ResourcesMiddleware.item)
router.use(OwnerMiddleware('item'))


router.get('/',
    ValidateMiddleware,
    photosController.getAll
)

router.get('/:photoId',
    ValidateMiddleware,
    photosController.getOne
)

router.post('/',
    RateLimitMiddleware.upload(),
    photosValidator.data(),
    ValidateMiddleware,
    photosController.upload
)

router.put('/:photoId',
    photosValidator.update(),
    ValidateMiddleware,
    photosController.update
    )

router.delete('/:photoId',
    ValidateMiddleware,
    photosController.delete
)

module.exports = router