const models = require("../models")
const {Op} = require("sequelize");
const ProfileType = models.ProfileType

class ProfileRepository{
    async getAll(){
        return await ProfileType.findAll()
    }

    async findCurrent(id){
        return await ProfileType.findByPk(id)
    }

    async isBusyData(data){
        return await ProfileType.findOne({
            where: {
                [Op.or]: [
                    {name: data.name},
                    {displayName: data.displayName}
                ].filter(Boolean)
            }
        })
    }

    async createProfile(data) {
        await ProfileType.create({
            name: data.name,
            displayName: data.displayName,
            description: data.description,
            isActive: data.isActive
        })
    }

    async update(profile, data){
        return await profile.update(data)
    }
}

module.exports = new ProfileRepository()