const router = require('express').Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const DealValidator = require('../validators/dealValidator')
const DealController = require('../controllers/dealController')


router.use(AuthMiddleware)


router.get('/',
    DealController.getMyDeals
)

router.get('/:dealId',
    DealValidator.dealId(),
    DealController.getDeal
)

router.post('/:listingId',
    DealValidator.listingId(),
    DealController.getOrCreateDeal
)

module.exports = router