const bcrypt = require('bcrypt')
const {v4: uuid} = require('uuid')
const TokenService = require('../services/tokenService')
const UserRepository = require('../repository/userRepository')
const MailService = require('../services/mailService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exeptions/appError')

class AuthService {
    async registration(data) {
        const existingUser = await UserRepository.isBusyData(
            data.username,
            data.email,
            data.phoneNumber
        )

        if (existingUser) {
            if (existingUser.username === data.username) {
                throw ApiError.Conflict('Логин уже занят')
            }
            if (existingUser.email === data.email) {
                throw ApiError.Conflict('Email уже зарегистрирован')
            }
            if (existingUser.phoneNumber === data.phoneNumber) {
                throw ApiError.Conflict('Телефон уже используется')
            }
        }

        const hashPassword = bcrypt.hashSync(data.password, 7)
        const activationLink = uuid()

        const user = await UserRepository.createUser(
            data.username,
            data.email,
            data.phoneNumber,
            hashPassword,
            activationLink
        )

        await MailService.sendActivationMail(
            user.email,
            `${process.env.API_URL}/api/auth/activate/${activationLink}`
        )

        const userDto = new UserDto(user)
        const {accessToken, refreshToken} = await TokenService.generateTokens({...userDto})

        return {
            accessToken,
            refreshToken,
            user: userDto
        }
    }

    async login(identifier, password) {
        const user = await UserRepository.existsUser(identifier)

        if (!user || !await bcrypt.compare(password, user.passwordHash)) {
            throw ApiError.BadRequest('Неверные данные')
        }

        const userDto = new UserDto(user)
        const {accessToken, refreshToken} = await TokenService.generateTokens({...userDto})

        return {
            accessToken,
            refreshToken,
            user: userDto}
    }

    async activate(activationLink) {
        const user = await UserRepository.activateUser(activationLink)

        if (!user) {
            throw ApiError.NotFound('Ошибка активации профиля')
        }

        await UserRepository.updateData(user, {isActivated: true})
    }

    async logout(refreshToken) {
        return await TokenService.deleteToken(refreshToken)
    }
}

module.exports = new AuthService()