const {ItemDto} = require('./itemDto')

class BookmarkDto {
    constructor(model) {
        this.id = model.id
        this.userId = model.userId
        this.itemId = model.itemId
        this.createdAt = model.createdAt

        this.item = model.items ? new ItemDto(model.items) : null
    }
}

module.exports = BookmarkDto