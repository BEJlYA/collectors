const {Op} = require("sequelize")
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const models = require("../models")
const User = models.User
require('dotenv').config({path: require('path').join(__dirname, './.env')})

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "48h"})
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка регистрации: ", errors})
            }

            const {username, password, phoneNumber, email} = req.body

            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        {username},
                        {email},
                        {phoneNumber}
                    ].filter(Boolean)
                }
            })

            if (existingUser) {
                if (existingUser.username === username) {
                    new Error('Логин уже занят')
                }
                if (existingUser.email === email) {
                    new Error('Email уже зарегистрирован')
                }
                if (existingUser.phoneNumber === phoneNumber) {
                    new Error('Телефон уже используется')
                }
            }

            const hashPassword = bcrypt.hashSync(password, 7)

            await User.create({
                username,
                email,
                phoneNumber,
                password: await hashPassword,
                role: 'USER'
            })

            return res.status(200).json({message: 'Пользователь создан!'})
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                const field = e.errors[0].path
                const messages = {
                    username: 'Логин уже занят',
                    email: 'Email уже зарегистрирован',
                    phoneNumber: 'Телефон уже используется'
                }
                return res.status(409).json({
                    message: messages[field] || 'Данные уже используются'
                })
            }

            return res.status(500).json({
                message: 'Ошибка регистрации',
                error: e.message
            })
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(401).json({message: "Ошибка входа: ", errors})
            }

            const {identifier, password} = req.body

            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        {username: identifier},
                        {email: identifier},
                        {phoneNumber: identifier}
                    ]
                }
            })

            if (!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
                return res.status(401).json({ message: 'Неверные данные' })
            }

            const token = generateAccessToken(existingUser.id, existingUser.role)

            return res.status(200).json({message: 'Успешная авторизация!', token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка аунтетификации: ', e})
        }
    }
}

module.exports = new AuthController()