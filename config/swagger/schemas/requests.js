module.exports = {
    // ===== ЗАПРОСЫ =====
    LoginRequest: {
        type: 'object',
        required: ['identifier', 'password'],
        properties: {
            identifier: { type: 'string' },
            password: { type: 'string' }
        }
    },
    RegisterRequest: {
        type: 'object',
        required: ['password'],
        properties: {
            email: { type: 'string', format: 'email' },
            phoneNumber: { type: 'string' },
            password: { type: 'string' }
        }
    },
    BookmarksRequest: {
        type: 'object',
        required: ['itemId'],
        properties: {
            itemId: { type: 'integer' }
        }
    },
    AdminRoleRequests: {
        type: 'object',
        required: ['role'],
        properties: {
            role: { type: 'string' }
        }
    },
    AdminCategoriesRequests: {
        type: 'object',
        required: ['name', 'displayName', 'description', 'isActive'],
        properties: {
            name: { type: 'string' },
            displayName: { type: 'string' },
            description: { type: 'string' },
            isActive: { type: 'boolean' }
        }
    },
    CollectionRequests: {
        type: 'object',
        required: ['name', 'categoryId', 'isPublic'],
        properties: {
            name: { type: 'string' },
            categoryId: { type: 'integer' },
            isPublic: { type: 'boolean' }
        }
    },
    ItemCollectionRequests: {
        type: 'object',
        required: ['name', 'description'],
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            isForTrade: { type: 'boolean' }
        }
    },
    ItemCollectionsRequests: {
        type: 'object',
        required: ['name', 'description'],
        properties: {
            newCollectionId: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            isForTrade: { type: 'boolean' }
        }
    },
    PhotoRequests: {
        type: 'object',
        properties: {
            isPrimary: { type: 'integer' },
            sortOrder: { type: 'string' },
        }
    },
    FeedbackRequests: {
        type: 'object',
        required: ['fromUserId', 'targetUserId', 'initiatorType', 'rating'],
        properties: {
            fromUserId: { type: 'integer' },
            targetUserId: { type: 'integer' },
            initiatorType: { type: 'string' },
            comment: { type: 'string' },
            rating: { type: 'float' }
        }
    },
    ListingRequests: {
        type: 'object',
        required: ['name', 'type', 'categoryId', 'price'],
        properties: {
            name: { type: 'string' },
            type: { type: 'string' },
            categoryId: { type: 'string' },
            price: { type: 'float' },
            description: { type: 'string' }
        }
    },
    StatusListingRequests: {
        type: 'object',
        required: ['status'],
        properties: {
            status: { type: 'string' }
        }
    },
    ProfileRequests: {
        type: 'object',
        required: ['firstName', 'firstName'],
        properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            country: { type: 'string' },
            city: { type: 'string' },
            categories: { type: 'integer' }
        }
    },
    SettingsRequest: {
        type: 'object',
        required: [],
        properties: {}
    },
}