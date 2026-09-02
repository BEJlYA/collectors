const {PhotoDto} = require("./photoDto")

class ListingsDto {
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.type = model.type
        this.price = model.price
        this.previewPhoto = model.photos?.find(p => p.isPrimary)?.photoUrl
        this.createdAt = model.createdAt
    }
}

class PublicListingDto extends ListingsDto {
    constructor(model) {
        super(model)
        this.sellerId = model.sellerId
        this.categoryId = model.categoryId
        this.description = model.description
        this.previewPhoto = model.photos?.map(photo => new PhotoDto(photo)) || []
        this.views = model.views
        this.status = model.status
    }
}

class PersonalListingDto extends PublicListingDto {
    constructor(model) {
        super(model)
        this.itemId = model.itemId
        this.updatedAt = model.updatedAt
        this.expiresAt = model.expiresAt
    }
}

module.exports = {ListingsDto, PublicListingDto, PersonalListingDto}