const {Op} = require("sequelize")
const models = require("../models")
const User = models.Users

class UserRepository {
    async isBusyData(username, email, phoneNumber) {
        return await User.findOne({
            where: {
                [Op.or]: [
                    {username},
                    {email},
                    {phoneNumber}
                ].filter(Boolean)
            }
        })
    }

    async createUser(username, email, phoneNumber, hashPassword, activationLink) {
        return await User.create({
            username,
            email,
            phoneNumber,
            passwordHash: hashPassword,
            activationLink: activationLink,
            role: 'USER'
        })
    }

    async existsUser(identifier) {
        return await User.findOne({
            where: {
                [Op.or]: [
                    {username: identifier},
                    {email: identifier},
                    {phoneNumber: identifier}
                ]
            }
        })
    }

    async activateUser(activationLink){
        return await User.findOne({
            where: {
                activationLink
            }
        })
    }
}

module.exports = new UserRepository()