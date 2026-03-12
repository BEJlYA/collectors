const models = require('../models')
const Tokens = models.Tokens

class TokenRepository {
    async saveTokens(userId, refreshToken) {
        await Tokens.create({
            userId,
            refreshToken
        })
    }

    async findByUserId(userId) {
        return await Tokens.findByPk(userId)
    }

    async update(tokenData, refreshToken) {
        await tokenData.updateCategory({refreshToken})
    }

    async delete(tokenData) {
        return await tokenData.destroy()
    }
}

module.exports = new TokenRepository()