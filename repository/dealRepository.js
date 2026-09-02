const models = require('../config/associations')
const Deals = models.Deals
const {Op} = require('sequelize')

class DealRepository {
    async findById(dealId) {
        return await Deals.findByPk(dealId)
    }

    async findByListingAndUsers(listingId, buyerId, sellerId) {
        return await Deals.findOne({
            where: {
                listingId,
                buyerId,
                sellerId
            }
        })
    }

    async findByUserId(userId) {
        return await Deals.findAll({
            where: {
                [Op.or]: [
                    { sellerId: userId },
                    { buyerId: userId }
                ]
            },
            include: [
                { model: models.Listings, as: 'listing', attributes: ['id', 'name', 'photoUrl'] },
                { model: models.Users, as: 'seller' }
            ],
            order: [['updatedAt', 'DESC']]
        })
    }

    async findByIdWithMessages(dealId) {
        return await Deals.findByPk(dealId, {
            include: [
                { model: models.Listings, as: 'listing' },
                { model: models.Users, as: 'seller', attributes: ['id', 'username', 'avatarUrl'] },
                { model: models.Users, as: 'buyer', attributes: ['id', 'username', 'avatarUrl'] },
                {
                    model: models.Messages,
                    as: 'messages',
                    order: [['createdAt', 'ASC']],
                    include: [{
                        model: models.Users,
                        as: 'user',
                        attributes: ['id', 'username', 'avatarUrl']
                    }]
                }
            ]
        })
    }

    async updateDealTime(dealId) {
        return await Deals.update(
            { updatedAt: new Date() },
            { where: { id: dealId } }
        )
    }

    async getUserDeals(userId) {
        return await Deals.findAll({
            where: {
                [Op.or]: [
                    { sellerId: userId },
                    { buyerId: userId }
                ]
            },
            include: [
                {
                    model: models.Listings,
                    as: 'listing',
                    attributes: ['id', 'name', 'photoUrl']
                },
                {
                    model: models.Users,
                    as: 'seller',
                    attributes: ['id', 'username', 'avatarUrl']
                },
                {
                    model: models.Users,
                    as: 'buyer',
                    attributes: ['id', 'username', 'avatarUrl']
                },
                {
                    model: models.Messages,
                    as: 'lastMessage',
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                    separate: true
                }
            ],
            order: [['updatedAt', 'DESC']]
        })
    }

    async create(data) {
        return await Deals.create({
            listingId: data.listingId,
            sellerId: data.sellerId,
            buyerId: data.buyerId
        })
    }
}

module.exports = new DealRepository()