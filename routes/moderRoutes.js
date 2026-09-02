const router = require('express').Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const RoleMiddleware = require('../middleware/roleMiddleware')
const moderController = require('../controllers/moderController')


router.use(AuthMiddleware)
router.use(RoleMiddleware(['MODER', 'ADMIN']))


router.get('/listings', moderController.getPendingListings)
router.patch('/listings/:listingId/active', moderController.approveListing)
router.patch('/listings/:listingId/rejected', moderController.rejectListing)

router.patch('/users/:userId/block', moderController.blockUser)
router.patch('/users/:userId/unblock', moderController.unblockUser)

module.exports = router