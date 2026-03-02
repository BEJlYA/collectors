const jwt = require("jsonwebtoken")
const TokenRepository = require('../repository/tokenRepository')

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "20m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"})

        const existsTokens = await TokenRepository.getTokens(payload.id)

        if (existsTokens) {
            await TokenRepository.updateRefreshToken(existsTokens, refreshToken)
            return {
                accessToken,
                refreshToken
            }
        }
        await TokenRepository.saveTokens(payload.id, {accessToken, refreshToken})

        return {
            accessToken,
            refreshToken
        }
    }
}

module.exports = new TokenService()