class CollectionDto {
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.category = model.categoryTypeId?.displayName || null
        this.isPublic = model.isPublic
        this.createdAt = model.createdAt

        this.owner = model.profile ? {
            id: model.profile.userId,
            firstName: model.profile.firstName,
            lastName: model.profile.lastName,
            avatarUrl: model.profile.avatarUrl
        } : null

        this.items = model.items?.map(item => ({
            id: item.id,
            name: item.name,
            previewPhoto: item.photos?.find(p => p.isPrimary)?.photoUrl
                || item.photos?.[0]?.photoUrl
                || null,
            isForTrade: item.isForTrade
        })) || []

        this.itemsCount = model.items?.length || 0
    }
}

module.exports = CollectionDto