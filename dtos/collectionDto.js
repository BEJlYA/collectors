const { ListItemDto } = require('./itemDto')

class CollectionDto {
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.category = model.categoryTypeId?.displayName || null
        this.isPublic = model.isPublic
        this.createdAt = model.createdAt

        this.items = model.items?.map(item => new ListItemDto(item)) || []

        this.itemsCount = model.items?.length || 0
    }
}

module.exports = CollectionDto