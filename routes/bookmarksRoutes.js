const {Router} = require('express')
const router = Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const BookmarksValidator = require('../validators/bookmarksValidator')
const ValidateMiddleware = require('../middleware/validateMiddleware')
const BookmarksController = require('../controllers/bookmarksController')

router.use(AuthMiddleware)
router.use(BookmarksValidator.id())
router.use(BookmarksValidator.data())
router.use(ValidateMiddleware)

router.get('/',
    BookmarksController.getAll)

router.post('/',
    BookmarksController.create)

router.delete('/:bookmarkId',
    BookmarksController.delete)

module.exports = router