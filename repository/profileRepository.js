const models = require('../config/associations')
const {Collections, Category} = require("../config/associations");
const {Profile, Users, Feedbacks} = models

class ProfileRepository {
    async findByUserId(userId) {
        return await Profile.findOne({
                where: {
                    userId
                },
                include: [
                    {
                        model: Users,
                        as: 'user',
                        attributes: ['phoneNumber', 'email', 'role', 'publicId']
                    }
                ]
            })
    }

    async update(profile, data) {
        return await profile.update(data)
    }

    async findByPublicId(publicId) {
        return await Users.findOne({
            where: {
                publicId
            },
            include: [
                {
                    model: Profile,
                    as: 'profiles',
                    attributes: ['id', 'userId', 'firstName', 'lastName', 'avatarUrl', 'geo', 'rating', 'categories', 'createdAt']
                }
            ]
        })
    }

    async findPublicCollections(publicId) {
        return await Users.findOne({
            where: {
                publicId
            },
            include: [
                {
                    model: Collections,
                    as: 'collections',
                    attributes: ['id', 'name', 'category_type_id', 'is_public', 'createdAt'],
                    include: [
                        {
                            model: Category,
                            as: 'category',
                            attributes: ['id', 'name', 'displayName', 'isActive']
                        }
                    ]
                }
            ]
        })
    }

    async findPublicFeedbacks(publicId) {
        return await Users.findOne({
            where: {
                publicId
            },
            include: [
                {
                    model: Feedbacks,
                    as: 'feedbacks',
                    attributes: ['id', 'comment', 'rating', 'createdAt']
                }
            ]
        })
    }
}

module.exports = new ProfileRepository()