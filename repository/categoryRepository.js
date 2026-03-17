const models = require('../config/associations')
const {Op} = require('sequelize');
const Category = models.Category

class CategoryRepository {
    async findAll() {
        return await Category.findAll()
    }

    async findOne(categoryId) {
        return await Category.findByPk(categoryId)
    }

    async findExists(data) {
        return await Category.findOne({
            where: {
                [Op.or]: [
                    {name: data.name},
                    {displayName: data.displayName}
                ].filter(Boolean)
            }
        })
    }

    async createCategory(data) {
        return await Category.create({
            name: data.name,
            displayName: data.displayName,
            description: data.description,
            isActive: data.isActive
        })
    }

    async updateCategory(categoryData, data) {
        return await categoryData.update(data)
    }

    async deleteCategory(categoryData) {
        await categoryData.destroy()
    }
}

module.exports = new CategoryRepository()