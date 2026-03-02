const models = require("../models")
const Token = models.Token

class TokenRepository{
    async saveTokens(userId, tokens) {
        const model = await this.getTokens(userId)
        await model.update({
            refreshToken: tokens.refreshToken
        })
    }

    async getTokens(userId) {
        return await Token.findByPk(userId)
    }

    async updateRefreshToken(userTokens, Token) {
        userTokens.refreshToken = Token
        await userTokens.save()
    }
}

module.exports = new TokenRepository()