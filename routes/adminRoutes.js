const router = require('express').Router()
const AuthMiddleware = require('../middleware/authMiddleware')
const RoleMiddleware = require('../middleware/roleMiddleware')
const AdminController = require('../controllers/adminController')


router.use(AuthMiddleware)
router.use(RoleMiddleware(['ADMIN']))


router.get('/users', AdminController.getUsers)
router.get('/users/search', AdminController.search)
router.get('/users/:userId', AdminController.getUser)
router.patch('/users/:userId/role', AdminController.updateUserRole)

router.post('/categories', AdminController.createCategory)
router.patch('/categories/:categoryId', AdminController.updateCategory)
router.delete('/categories/:categoryId', AdminController.deleteCategory)

module.exports = router