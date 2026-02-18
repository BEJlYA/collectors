const {Router} = require("express")
const {check} = require("express-validator")
const router = Router()
const controller = require("../controllers/authController")


router.get("/login", (req, res) => {

})


router.post("/login", [
    check('identifier', "Укажите логин, email, или номер телефона").notEmpty(),
    check('password', "Пароль не может быть пустым").notEmpty(),
], controller.login)


router.get("/register", (req, res) => {
})


router.post("/register", [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен иметь длину более 5 символов и не более 30").isLength({min: 5, max: 30}),
    check('email', "Почта обязательна к указанию").notEmpty(),
    check('phoneNumber', "Номер телефона обязателен к указанию").notEmpty(),

], controller.registration)

module.exports = router