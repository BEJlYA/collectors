const {Router} = require("express")
const router = Router()
const ProfileController = require("../controllers/ProfileController")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const ProfileValidator = require('validators/profileValidator')

router.get("/",
    authMiddleware,
    ProfileController.getAllProfile
)

router.get("/:id",
    authMiddleware,
    ProfileValidator.id,
    ProfileController.getProfile
)

router.post("/",
    authMiddleware,
    roleMiddleware(['ADMIN']),
    ProfileController.newProfile
)

router.put("/:id",
    authMiddleware,
    roleMiddleware(['ADMIN']),
    ProfileValidator.id,
    ProfileController.updateProfile
)

router.delete("/:id",
    authMiddleware,
    roleMiddleware(['ADMIN']),
    ProfileValidator.id,
    ProfileController.deleteProfile
)

module.exports = router