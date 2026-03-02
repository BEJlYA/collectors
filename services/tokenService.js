const jwt = require('jsonwebtoken')
const TokenRepository = require('../repository/tokenRepository')

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '20m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})

        const tokenData = await TokenRepository.getTokens(payload.id)

        if (tokenData) {
            await TokenRepository.updateRefreshToken(tokenData, refreshToken)
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

    async deleteToken(refreshToken) {
        return await TokenRepository.deleteRefreshToken(refreshToken)
    }
}

module.exports = new TokenService()