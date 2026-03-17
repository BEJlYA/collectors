const CategoryService = require('../services/categoryService')
const ResponseFormatter = require("../utils/responseFormatter");

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
            const categoryId= req.params.id

            const categoryData = await CategoryService.getOne(categoryId)

            ResponseFormatter.success(res, {
                categories: categoryData
            })
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const {name, displayName, description, isActive} = req.body

            const categoryData = await CategoryService.create({
                name,
                displayName,
                description,
                isActive
            })

            ResponseFormatter.success(res, {
                categories: categoryData
            }, 201)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const categoryId = req.params.id
            const {name, displayName, description, isActive} = req.body

            const categoryData = await CategoryService.update(categoryId, {
                name,
                displayName,
                description,
                isActive
            })

            ResponseFormatter.success(res, {
                categories: categoryData
            }, 202)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const categoryId = req.params.id

            await CategoryService.delete(categoryId)

            ResponseFormatter.success(res)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CategoryController()