const {Router} = require('express')
const router = Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const BookmarksValidator = require('../validators/bookmarksValidator')
const ValidateMiddleware = require('../middleware/validateMiddleware')
const BookmarksController = require('../controllers/bookmarksController')


router.use(AuthMiddleware)


router.get('/',
    BookmarksController.getAll)

router.post('/',
    BookmarksValidator.data(),
    ValidateMiddleware,
    BookmarksController.create)

router.delete('/:bookmarkId',
    BookmarksValidator.id(),
    ValidateMiddleware,
    BookmarksController.delete)

module.exports = router