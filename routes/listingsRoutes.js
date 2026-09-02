const {Router} = require('express')
const router = Router({mergeParams: true})
const AuthMiddleware = require('../middleware/authMiddleware')
const ListingsValidator = require('../validators/listingsValidator')
const ValidateMiddleware = require('../middleware/validateMiddleware')
const ListingsController = require('../controllers/listingsController')
const photosListingsRouter = require("./photosListingsRoutes")


router.use('/:listingId/photos', photosListingsRouter)


router.use(AuthMiddleware)


router.get('/',
    ListingsValidator.getAll(),
    ValidateMiddleware,
    ListingsController.getAll
)

router.get('/my',
    ValidateMiddleware,
    ListingsController.getMyListings
)

router.get('/:listingId',
    ListingsValidator.id(),
    ValidateMiddleware,
    ListingsController.getOne
)

router.post('/',
    ListingsValidator.create(),
    ValidateMiddleware,
    ListingsController.create
)

router.put('/:listingId',
    ListingsValidator.id(),
    ListingsValidator.update(),
    ValidateMiddleware,
    ListingsController.update
)

router.patch('/:listingId/status',
    ListingsValidator.id(),
    ListingsValidator.status(),
    ValidateMiddleware,
    ListingsController.updateStatus
)

router.delete('/:listingId',
    ListingsValidator.id(),
    ValidateMiddleware,
    ListingsController.delete)

router.get('/search',
    AuthMiddleware,
    ListingsController.search)

module.exports = router