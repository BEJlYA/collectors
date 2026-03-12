const CategoryRepository = require('../repository/categoryRepository')
const ApiError = require('../exeptions/appError')
const CategoryDto = require('../dtos/categoryDto')

class CategoryService {
    async getAll() {
        const categoryData = await CategoryRepository.findAll()

        if (!categoryData || categoryData.length === 0) {
            return []
        }

        return categoryData.map(categoryData => new CategoryDto(categoryData))
    }

    async getOne(categoryId) {
        const categoryData = await CategoryRepository.findOne(categoryId)

        if (!categoryData) {
            throw ApiError.NotFound('Вид коллекционирования не найден')
        }

        return new CategoryDto(categoryData)
    }

    async create(data) {
        let categoryData = await CategoryRepository.findExists(data)

        if (categoryData) {
            if (categoryData.name === data.name) {
                throw ApiError.Conflict('Такой профиль уже есть')
            }
            if (categoryData.displayName === data.displayName) {
                throw ApiError.Conflict('Такое имя профиля уже есть')
            }
        }

        categoryData = await CategoryRepository.createCategory(data)

        return new CategoryDto(categoryData)
    }

    async update(categoryId, data) {
        let categoryData = await CategoryRepository.findOne(categoryId)

        if (!categoryData) {
            throw ApiError.NotFound('Вид коллекционирования не найден')
        }
        if (
            categoryData.name === data.name &&
            categoryData.displayName === data.displayName &&
            categoryData.description === data.description &&
            categoryData.isActive === data.isActive
        ) {
            throw ApiError.Conflict('Нет данных для обновления')
        }

        categoryData = await CategoryRepository.updateCategory(categoryData, data)

        return new CategoryDto(categoryData)
    }

    async delete(categoryId) {
        const categoryData = await CategoryRepository.findOne(categoryId)

        if (!categoryData) {
            throw ApiError.NotFound('Вид коллекционирования не найден')
        }

        await CategoryRepository.deleteCategory(categoryData)
    }
}

module.exports = new CategoryService()