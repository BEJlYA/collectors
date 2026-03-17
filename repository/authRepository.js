const models = require('../config/associations')
const {Users, Profiles} = models.Users
const {Op} = require('sequelize')

class AuthRepository {
    async findByEmail(email) {
        return await Users.findOne({ where: { email }})
    }

    async findByOAuth(provider, oauthId) {
        return await Users.findOne({
            where: {
                oauthProvider: provider,
                oauthId: oauthId
            }
        })
    }

    async updateOAuthData(userId, data) {
        const user = await Users.findByPk(userId)
        if (!user) return null

        await user.update({
            oauthProvider: data.oauthProvider,
            oauthId: data.oauthId
        })
        return user
    }

    async createOAuthUser(data) {
        return await Users.sequelize.transaction(async (t) => {
            const userData = await Users.create({
                email: data.email,
                oauthProvider: data.oauthProvider,
                oauthId: data.oauthId,
                isActivated: data.isActivated ?? true,
                role: data.role ?? 'USER'
            }, { transaction: t })

            if (data.firstName || data.lastName || data.avatarUrl) {
                await Profiles.create({
                    userId: userData.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    avatarUrl: data.avatarUrl
                }, { transaction: t })
            }

            return userData
        })
    }

    async findExisting(email, phoneNumber) {
        return await Users.findOne({
            where: {
                [Op.or]: [
                    {phoneNumber},
                    {email}
                ].filter(Boolean)
            }
        })
    }

    async createUser(email, phoneNumber, hashPassword, activationLink) {
        return await Users.sequelize.transaction(async (t) => {
            const userData = await Users.create({
                phoneNumber,
                email,
                passwordHash: hashPassword,
                activationLink: activationLink,
                role: 'USER'
            }, { transaction: t })

            await Profiles.create({
                userId: userData.id,
            }, { transaction: t })

            return userData
        })
    }

    async activateUser(activationLink) {
        return await Users.findOne({
            where: {
                activationLink
            }
        })
    }

    async updateData(userData, data) {
        await userData.update(data)
    }

    async findUserPk(userId) {
        return await Users.findByPk(userId)
    }
}

module.exports = new AuthRepository()