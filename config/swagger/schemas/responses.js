module.exports = {
    // ===== ОТВЕТЫ =====
    AuthResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: {
                type: 'object',
                properties: {
                    accessToken: { type: 'string' },
                    refreshToken: { type: 'string' },
                    user: { $ref: '#/components/schemas/AuthDto' }
                }
            }
        }
    },
    BookmarksAllResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/BookmarkDto'
                }
            }
        }
    },
    CategoryAllResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/CategoryDto'
                }
            }
        }
    },
    CategoryResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/CategoryDto'
            }
        }
    },
    CollectionsAllResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/CollectionDto'
                }
            }
        }
    },
    CollectionResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/CollectionDto'
            }
        }
    },
    AllDealsResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/DealListDto'
            }
        }
    },
    DealResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/DealDto'
            }
        }
    },
    FeedbackResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/ExtendedFeedbackDto'
            }
        }
    },
    ItemsAllResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/ListItemDto'
                }
            }
        }
    },
    ItemResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/ItemDto'
            }
        }
    },
    PhotosAllResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/ExtendedPhotoDto'
                }
            }
        }
    },
    PhotoAllResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                $ref: '#/components/schemas/ExtendedPhotoDto'
            }
        }
    },
    PhotosResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/ExtendedPhotoDto'
                }
            }
        }
    },
    PhotoResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/PhotoDto'
            }
        }
    },
    EmptyResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {}
        }
    },
    ListingsAllResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/ListingsDto'
                }
            }
        }
    },
    ListingPublicResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/PublicListingDto'
            }
        }
    },
    ListingPersonalResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/PersonalListingDto'
            }
        }
    },
    MessageResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/MessageListDto'
            }
        }
    },
    ProfileResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/ProfileDto'
            }
        }
    },
    ProfileCollectionsResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/ProfileCollectionsDto'
            }
        }
    },
    ProfileFeedbacksResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/ProfileFeedbacksDto'
            }
        }
    },
    ProfileSettingsResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/ProfileSettingsDto'
            }
        }
    },
    AdminUsersResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/ProfileTemplate'
                }
            }
        }
    },
    AdminUserResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
                type: 'object',
                $ref: '#/components/schemas/AdminProfileDto'
            }
        }
    },
}