const {Router} = require("express")
const router = Router()

router.get("/users")

router.get("/users/:id")

router.put("/users/:id")

module.exports = router