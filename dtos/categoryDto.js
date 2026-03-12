class CategoryDto {
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.displayName = model.displayName
        this.description = model.description
        this.isActive = model.isActive
    }
}

module.exports = CategoryDto