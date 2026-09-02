const ListingsRepository = require('../repository/listingsRepository')
const ItemsRepository = require('../repository/itemsRepository')
const CollectionsRepository = require('../repository/collectionsRepository')
const ApiError = require('../exceptions/apiError')
const {ListingsDto, PublicListingDto, PersonalListingDto} = require('../dtos/listingDto')
const SearchService = require('../services/searchService')

class ListingsService {
    async getAll() {
        const listingsData = await ListingsRepository.getAll()

        if (!listingsData || listingsData.length === 0) {
            return []
        }

        return listingsData.map(listing => new ListingsDto(listing))
    }

    async getMyListings(userId) {
        const listingsData = await ListingsRepository.getMyListings(userId)

        if (!listingsData || listingsData.length === 0) {
            return []
        }

        return listingsData.map(listing => new ListingsDto(listing))
    }

        async getOne(userId, listingId) {
            const listingData = await ListingsRepository.getOne(listingId)

            if (!listingData) {
                throw ApiError.BadRequest('Запрашиваемое объявление не найдено')
            }

            const isOwner = listingData.sellerId === userId

            if (!isOwner && listingData.status !== 'ACTIVE') {
                throw ApiError.Forbidden('Объявление недоступно для просмотра')
            }

            return isOwner
                ? new PersonalListingDto(listingData)
                : new PublicListingDto(listingData)
        }

    async create(userId, data) {
        let listingData
        const {name, type, categoryId, price, description} = data

        if (type === 'SALE') {
            if (!price || price <= 0) {
                throw ApiError.BadRequest('Для продажи необходимо указать цену больше 0')
            }
        } else if (type === 'EXCHANGE') {
            if (price) {
                throw ApiError.BadRequest('Для обмена цену указывать не нужно')
            }
        }

        if (!data.itemId) {
            listingData = await ListingsRepository.create({
                name,
                sellerId: userId,
                type,
                categoryId,
                price,
                description,
                status: 'PENDING'
            })
        } else {
            const {itemId, type, price} = data

            const itemData = await ItemsRepository.findByPk(itemId)
            if (!itemData || itemData.isForTrade) {
                throw ApiError.NotFound('Предмет не найден или уже выставлен на продажу')
            }

            const collectionData = await CollectionsRepository.findByPk(itemData.collectionId)
            if (itemData.collectionId) {
                if (collectionData.userId !== userId) {
                    throw ApiError.Forbidden('Нельзя создать объявление на чужой предмет')
                }
            }

            listingData = await ListingsRepository.create({
                name: itemData.name,
                itemId,
                sellerId: userId,
                type,
                categoryId: collectionData.categoryId,
                price,
                description: itemData.description,
                status: 'PENDING'
            })

            await ItemsRepository.updateItem(itemData, {isForTrade: true})
        }

        if (!listingData) {
            throw ApiError.Conflict('Произошла ошибка при создании объявления')
        }

        await SearchService.indexListing(listingData)
        return new PersonalListingDto(listingData)
    }

    async update(userId, listingId, data) {
        const {name, type, categoryId, price, description} = data

        let listingData = await ListingsRepository.getOne(listingId)

        if (!listingData) {
            throw ApiError.BadRequest('Запрашиваемое объявление не найдено')
        }
        if (listingData.sellerId !== userId) {
            throw ApiError.BadRequest('Нельзя изменить чужое объявление')
        }
        if (!['DRAFT', 'HIDDEN', 'REJECTED'].includes(listingData.status)) {
            throw ApiError.BadRequest('Нельзя редактировать объявления снятые, на модерации и активные')
        }

        listingData = await ListingsRepository.update(listingData, {
            name,
            type,
            categoryId,
            price,
            description
        })

        await SearchService.indexListing(listingData)
        return new PersonalListingDto(listingData)
    }

    async updateStatus(userId, listingId, status) {
        let listingData = await ListingsRepository.getOne(listingId)

        if (!listingData) {
            throw ApiError.BadRequest('Запрашиваемое объявление не найдено')
        }
        if (listingData.sellerId !== userId) {
            throw ApiError.BadRequest('Нельзя изменить статус чужого объявления')
        }
        if (listingData.status === status || status === 'PENDING') {
            throw ApiError.BadRequest('Некорректное изменение статуса объявления')
        }

        listingData = await ListingsRepository.update(listingData, {status})

        await SearchService.indexListing(listingData)
        return new PersonalListingDto(listingData)
    }

    async delete(userId, listingId) {
        let listingData = await ListingsRepository.getOne(listingId)

        if (!listingData) {
            throw ApiError.BadRequest('Запрашиваемое объявление не найдено')
        }
        if (listingData.sellerId !== userId) {
            throw ApiError.BadRequest('Нельзя изменить статус чужого объявления')
        }

        await SearchService.removeIndexedListing(listingData.id)
        await ListingsRepository.delete(listingData)
    }

    async getPendingListings() {
        const listingData = await ListingsRepository.getAll('PENDING')

        if (!listingData) {
            throw ApiError.NotFound('Запрашиваемый ресурс не найден')
        }

        return new PersonalListingDto(listingData)
    }

    async moderStatusListing(listingId, status='PENDING') {
        let listingData = await ListingsRepository.getOne(listingId)

        if (!listingData) {
            throw ApiError.NotFound('Запрашиваемый ресурс не найден')
        }

        listingData = ListingsRepository.update(listingData, status)

        await SearchService.indexListing(listingData)
        return new PersonalListingDto(listingData)
    }
}

module.exports = new ListingsService()