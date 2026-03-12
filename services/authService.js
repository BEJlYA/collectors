const bcrypt = require('bcrypt')
const {v4: uuid} = require('uuid')
const TokenService = require('../services/TokenService')
const UserRepository = require('../repository/UserRepository')
const mailQueue = require('../workers/mailQueue')
const TokenRepository = require('../repository/tokenRepository')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exeptions/appError')

class AuthService {
    async registration(data) {
        const { email, phoneNumber, password } = data

        if (!email && !phoneNumber) {
            throw ApiError.BadRequest('Укажите email или номер телефона')
        }

        const existingUser = await UserRepository.findSimilar(
            email || null,
            phoneNumber || null
        )

        if (existingUser) {
            if (existingUser.email === email) {
                throw ApiError.Conflict('Email уже зарегистрирован')
            }
            if (existingUser.phoneNumber === phoneNumber) {
                throw ApiError.Conflict('Телефон уже используется')
            }
        }

        const hashPassword = bcrypt.hashSync(password, 7)
        const activationLink = uuid()

        const userData = await UserRepository.createUser(
            email || null,
            phoneNumber || null,
            hashPassword,
            activationLink
        )

        if (userData.email) {
            await mailQueue.add('sendActivation', {
                to: userData.email,
                link: `${process.env.API_URL}/api/v1/auth/activate/${activationLink}`
            })
        }

        const userDto = new UserDto(userData)
        const {accessToken, refreshToken} = await TokenService.generateTokens({
            id: userData.id,
            role: userData.role
        })

        return {
            accessToken,
            refreshToken,
            userDto
        }
    }

    async login(identifier, password) {
        const userData = await UserRepository.findSimilar(identifier, identifier)

        if (!userData || !await bcrypt.compare(password, userData.passwordHash)) {
            throw ApiError.BadRequest('Неверные данные')
        }

        const userDto = new UserDto(userData)
        const {accessToken, refreshToken} = await TokenService.generateTokens({
            id: userData.id,
            role: userData.role
        })

        return {
            accessToken,
            refreshToken,
            userDto
        }
    }

    async handleOAuth(provider, profile) {
        const email = profile.emails?.[0]?.value
        const firstName = profile.name?.givenName || ''
        const lastName = profile.name?.familyName || ''
        const avatarUrl = profile.photos?.[0]?.value || ''

        if (!email) {
            throw ApiError.BadRequest('Email не предоставлен провайдером')
        }

        let userData = await UserRepository.findByOAuth(provider, profile.id)

        if (!userData) {
            userData = await UserRepository.findByEmail(email)

            if (userData) {
                userData = await UserRepository.updateOAuthData(userData.id, {
                    oauthProvider: provider,
                    oauthId: profile.id
                })
            }
        }

        if (!userData) {
            userData = await UserRepository.createOAuthUser({
                email,
                oauthProvider: provider,
                oauthId: profile.id,
                isActivated: true,
                role: 'USER',
                firstName,
                lastName,
                avatarUrl
            })
        }

        const userDto = new UserDto(userData)
        const {accessToken, refreshToken} = await TokenService.generateTokens({
            id: userData.id,
            role: userData.role
        })

        return {
            accessToken,
            refreshToken,
            userDto
        }
    }
    
    async activate(activationLink) {
        const userData = await UserRepository.activateUser(activationLink)

        if (!userData) {
            throw ApiError.NotFound('Ошибка активации профиля')
        }

        await UserRepository.updateData(userData, {isActivated: true})
    }

    async refresh(userId) {
        const modelToken = await TokenRepository.findByUserId(userId)

        if (!modelToken) {
            throw ApiError.UnauthorizedError('Refresh токен отозван')
        }

        const userData = await UserRepository.findUserPk(userId)
        const userDto = new UserDto(userData)
        const {accessToken, refreshToken} = await TokenService.generateTokens({...userDto})

        return {
            accessToken,
            refreshToken,
            userDto
        }
    }

    async logout(userId) {
        return await TokenService.deleteToken(userId)
    }
}

module.exports = new AuthService()