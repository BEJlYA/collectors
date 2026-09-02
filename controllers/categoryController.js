const CategoryService = require('../services/categoryService')
const ResponseFormatter = require("../utils/responseFormatter")

class CategoryController {
    async getAll(req, res, next) {
        try {
            const categoryData = await CategoryService.getAll()

            ResponseFormatter.success(res, {
                categories: categoryData
            })
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const categoryId = req.params.id

            const categoryData = await CategoryService.getOne(categoryId)

            ResponseFormatter.success(res, {
                categories: categoryData
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CategoryController()