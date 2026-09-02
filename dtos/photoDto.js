class PhotoDto {
    constructor(model) {
        this.id = model.id
        this.itemId = model.itemId
        this.photoUrl = model.photoUrl
    }
}

class ExtendedPhotoDto extends PhotoDto {
    constructor(model) {
        super(model)
        this.isPrimary = model.isPrimary
        this.sortOrder = model.sortOrder
    }
}

module.exports = {PhotoDto, ExtendedPhotoDto}