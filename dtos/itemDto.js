const {PhotoDto} = require("./photoDto")

class ItemDto {
    constructor(model) {
        this.id = model.id
        this.collectionId = model.collectionId
        this.name = model.name
        this.description = model.description
        this.createdAt = model.createdAt

        this.photos = model.photos?.map(photo => new PhotoDto(photo)) || []
    }
}

class ListItemDto {
        constructor(model) {
        this.id = model.id
        this.name = model.name
        this.createdAt = model.createdAt

        this.previewPhoto = model.photos?.find(p => p.isPrimary)?.photoUrl
            || model.photos?.[0]?.photoUrl
            || null
    }
}

module.exports = {ItemDto, ListItemDto}