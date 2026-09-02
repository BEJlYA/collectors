module.exports = {
    // ===== СУЩНОСТИ =====
    AuthDto: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            phoneNumber: { type: 'string', example: '+375291234567' },
            email: { type: 'string', example: 'user@mail.com' },
            role: {
                type: 'string',
                enum: ['USER', 'MODER', 'ADMIN', 'GARANT', 'TECH'],
                example: 'USER'
            },
            publicId: { type: 'string', example: 'abc123def456' }
        }
    },
    BookmarkDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            itemId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            item: { $ref: '#/components/schemas/ItemDto' }
        }
    },
    ItemDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            collectionId: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            photos: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/PhotoDto' }
            }
        }
    },
    ListItemDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            previewPhoto: { type: 'string' }
        }
    },
    PhotoDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            itemId: { type: 'integer' },
            photoUrl: { type: 'string' }
        }
    },
    ExtendedPhotoDto: {
        allOf: [
            { $ref: '#/components/schemas/PhotoDto' },
            {
                type: 'object',
                properties: {
                    isPrimary: { type: 'boolean' },
                    sortOrder: { type: 'integer' }
                }
            }
        ]
    },
    CategoryDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            displayName: { type: 'string' },
            description: { type: 'string' },
            isActive: { type: 'boolean' }
        }
    },
    CollectionDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            categoryId: { type: 'integer' },
            isPublic: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            items: { type: 'array', $ref: '#/components/schemas/ListItemDto' },
            itemsCount: { type: 'integer' }
        }
    },
    ProfileTemplate: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            firstName: { type: 'string', example: 'Иван' },
            lastName: { type: 'string', example: 'Петров' },
            avatarUrl: { type: 'string', example: '/uploads/avatars/user_1.jpg' },
            country: { type: 'string'},
            city: { type: 'string' },
            rating: { type: 'number', format: 'float', example: 4.5 },
            categories: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' }
        }
    },
    ProfileDto: {
        allOf: [
            { $ref: '#/components/schemas/ProfileTemplate' },
            {
                type: 'object',
                properties: {
                    user: { $ref: '#/components/schemas/AuthDto' }
                }
            }
        ]
    },
    ProfileCollectionsDto: {
        type: 'object',
        properties: {
            collections: {
                type: 'array',
                items: { $ref: '#/components/schemas/CollectionDto' }
            }
        }
    },
    ProfileFeedbacksDto: {
        type: 'object',
        properties: {
            feedbacks: {
                type: 'array',
                items: { $ref: '#/components/schemas/ExtendedFeedbackDto' }
            }
        }
    },
    ProfileSettingsDto: {
        type: 'object',
        properties: {
            // пока пусто — заполнишь позже
        }
    },
    AdminProfileDto: {
        allOf: [
            { $ref: '#/components/schemas/ProfileTemplate' },
            {
                type: 'object',
                properties: {
                    collections: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/CollectionDto' }
                    },
                    feedbacks: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/ExtendedFeedbackDto' }
                    },
                    isActivated: { type: 'boolean' },
                    isBlocked: { type: 'boolean' }
                }
            }
        ]
    },
    ListingsDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            type: { type: 'string', enum: ['SALE', 'EXCHANGE'] },
            price: { type: 'number', format: 'float', nullable: true },
            previewPhoto: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
        }
    },
    PublicListingDto: {
        allOf: [
            { $ref: '#/components/schemas/ListingsDto' },
            {
                type: 'object',
                properties: {
                    sellerId: {type: 'integer'},
                    categoryId: {type: 'integer'},
                    description: {type: 'string'},
                    previewPhoto: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/PhotoDto' }
                    },
                    views: {type: 'integer'},
                    status: {type: 'string', enum: []}
                }
            }
        ]
    },
    PersonalListingDto: {
        allOf: [
            { $ref: '#/components/schemas/PublicListingDto' },
            {
                type: 'object',
                properties: {
                    itemId: { type: 'integer' },
                    updatedAt: { type: 'string', format: 'date-time' },
                    expiresAt: { type: 'string', format: 'date-time' },
                }
            }
        ]
    },
    DealDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            listingId: { type: 'integer' },
            sellerId: { type: 'integer' },
            buyerId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            listing: { type: 'object', nullable: true, $ref: '#/components/schemas/ListingsDto' },
            messages: { type: 'array', nullable: true, $ref: '#/components/schemas/MessageDto' }
        }
    },
    DealListDto: {
        type: 'object',
        properties: {
            deals: {
                type: 'array',
                items: { $ref: '#/components/schemas/DealDto' }
            },
            total: { type: 'integer' },
            page: { type: 'integer' },
            totalPages: { type: 'integer' }
        }
    },
    MessageDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            dealId: { type: 'integer' },
            message: { type: 'string' },
            isRead: { type: 'boolean' },
            isEdited: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            replyToId: { type: 'integer'},
            user: { type: 'object',
                nullable: true,
                properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    avatarUrl: { type: 'string' }
                }
            }
        }
    },
    MessageListDto: {
        type: 'object',
        properties: {
            messages: {
                type: 'array',
                items: { $ref: '#/components/schemas/MessageDto' }
            },
            total: { type: 'integer' },
            page: { type: 'integer' },
            totalPages: { type: 'integer' },
            unreadCount: { type: 'integer' }
        }
    },
    FeedbackDto: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            comment: { type: 'string' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            createdAt: { type: 'string', format: 'date-time' }
        }
    },
    ExtendedFeedbackDto: {
        allOf: [
            { $ref: '#/components/schemas/FeedbackDto' },
            {
                type: 'object',
                properties: {
                    fromUser: { type: 'integer' },
                    targetUser: { type: 'integer' },
                    initiatorType: { type: 'string', enum: ['SELLER', 'BUYER'] }
                }
            }
        ]
    },
}