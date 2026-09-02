const { Meilisearch } = require('meilisearch')

const client = new Meilisearch({
    host: process.env.MELI_HOST || 'http://localhost:7700',
    apiKey: process.env.MELI_API_KEY || null
})

class SearchService {
    constructor() {
        this.usersIndex = null
        this.listingsIndex = null
    }

    async init() {
        try {
            this.usersIndex = await client.index('users')
            this.listingsIndex = await client.index('listings')
        } catch (e) {
            this.usersIndex = await client.createIndex('users', {
                primaryKey: 'id'
            })
            this.listingsIndex = await client.createIndex('listings', {
                primaryKey: 'id'
            })
        }

        await this.usersIndex.updateSettings({
            searchableAttributes: ['firstName', 'lastName', 'email', 'phoneNumber'],
            filterableAttributes: ['role', 'isBlocked', 'isActivated', 'minRating', 'maxRating'],
            sortableAttributes: ['rating', 'createdAt']
        })
        await this.listingsIndex.updateSettings({
            searchableAttributes: ['name', 'description'],
            filterableAttributes: ['type', 'price', 'categoryId', 'hasPhoto'],
            sortableAttributes: ['price', 'createdAt']
        })
    }

    async indexUser(user) {
        await this.usersIndex.addDocuments([{
            id: user.id,
            publicId: user.publicId,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            isActivated: user.isActivated,
            isBlocked: user.isBlocked,
            firstName: user.profile?.firstName || '',
            lastName: user.profile?.lastName || '',
            avatarUrl: user.profile?.avatarUrl || '',
            geo: user.profile?.geo || '',
            rating: user.profile?.rating || 0,
            categories: user.profile?.categories || [],
            createdAt: user.createdAt
        }])
    }
    async indexListing(listing) {
        await this.listingsIndex.addDocuments([{
            id: listing.id,
            name: listing.name,
            description: listing.description,
            type: listing.type,
            price: listing.price,
            categoryId: listing.categoryId,
            hasPhoto: listing.photos && listing.photos.length > 0,
            status: listing.status,
            createdAt: listing.createdAt,
            sellerId: listing.sellerId
        }])
    }

    async searchUsers(query, filters = {}, page = 1, limit = 20) {
        const filterConditions = this.buildUserFilters(filters)

        const result = await this.usersIndex.searchListings(query, {
            filter: filterConditions,
            limit,
            offset: (page - 1) * limit,
            sort: ['rating:desc']
        })

        return {
            items: result.hits,
            total: result.estimatedTotalHits,
            page,
            totalPages: Math.ceil(result.estimatedTotalHits / limit)
        }
    }
    async searchListings(query, filters = {}, page = 1, limit = 20) {
        const result = await this.listingsIndex.searchListings(query, {
            filter: this.buildListingFilters(filters),
            limit,
            offset: (page - 1) * limit,
            sort: ['createdAt:desc']
        })

        return {
            items: result.hits,
            total: result.estimatedTotalHits,
            page,
            totalPages: Math.ceil(result.estimatedTotalHits / limit)
        }
    }

    buildUserFilters(filters) {
        const conditions = []

        if (filters.role && ['USER', 'TECH', 'MODER', 'GARANT', 'ADMIN'].includes(filters.role)) {
            conditions.push(`role = "${filters.role}"`)
        }
        if (filters.isBlocked === true) {
            conditions.push(`isBlocked = true`)
        }
        if (filters.isBlocked === false) {
            conditions.push(`isBlocked = false`)
        }
        if (filters.isActivated === true) {
            conditions.push(`isActivated = true`)
        }
        if (filters.minRating) {
            conditions.push(`rating >= ${filters.minRating}`)
        }

        return conditions.join(' AND ')
    }
    buildListingFilters(filters) {
        const conditions = []

        if (filters.type && ['SALE', 'EXCHANGE'].includes(filters.type)) {
            conditions.push(`type = "${filters.type}"`)
        }
        if (filters.minPrice !== undefined) {
            conditions.push(`price >= ${filters.minPrice}`)
        }
        if (filters.maxPrice !== undefined) {
            conditions.push(`price <= ${filters.maxPrice}`)
        }
        if (filters.hasPhoto === true) {
            conditions.push(`hasPhoto = true`)
        }
        if (filters.hasPhoto === false) {
            conditions.push(`hasPhoto = false`)
        }
        if (filters.categoryId) {
            conditions.push(`categoryId = ${filters.categoryId}`)
        }
        conditions.push(`status = "ACTIVE"`)

        return conditions.join(' AND ')
    }

    async removeIndexedUser(userId) {
        await this.usersIndex.deleteDocument(userId)
    }
    async removeIndexedListing(listingId) {
        await this.listingsIndex.deleteDocument(listingId)
    }
}

module.exports = new SearchService()
