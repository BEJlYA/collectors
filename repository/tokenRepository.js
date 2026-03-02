const models = require('../models')
const token = models.Token

class TokenRepository {
    async saveTokens(userId, refreshToken) {
        await token.create({
            userId,
            refreshToken
        })
    }

    async getTokens(userId) {
        return await token.findByPk(userId)
    }

    async updateRefreshToken(tokenData, token) {
        await tokenData.update({refreshToken: token})
    }

    async deleteRefreshToken(refreshToken) {
        const tokenData = await token.findOne({where: refreshToken})
        return await tokenData.destroy()
    }
}

module.exports = new TokenRepository()