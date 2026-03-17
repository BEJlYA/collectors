const jwt = require('jsonwebtoken')
const TokenRepository = require('../repository/tokenRepository')

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '20m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        const tokenData = await TokenRepository.findByUserId(payload.id)
        if (tokenData) {

            await TokenRepository.update(tokenData, refreshToken)
            return {
                accessToken,
                refreshToken
            }
        }

        await TokenRepository.saveTokens(payload.id, refreshToken)

        return {
            accessToken,
            refreshToken
        }
    }

    async deleteToken(userId) {
        const tokenData = await TokenRepository.findByUserId(userId)
        return await TokenRepository.delete(tokenData)
    }

    _validateAccessToken (token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    _validateRefreshToken (token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()