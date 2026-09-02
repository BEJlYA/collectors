const asyncHandler = require('../utils/asyncHandler')
const CategoryService = require('../services/categoryService')
const ResponseFormatter = require("../utils/responseFormatter")
const AdminService = require('../services/adminService')
const SearchService = require("../services/searchService");

class AdminController {
    async getUsers(req, res, next) {
        try {
            const userData = await AdminService.getUsers()

            ResponseFormatter.success(res, {
                users: userData
            })
        } catch (e) {
            next(e)
        }
    }

    search = asyncHandler(async (res, req) => {
        const { q, role, isBlocked, isActivated, minRating, page = 1, limit = 20 } = req.query

        const results = await SearchService.searchUsers(q, { role, isBlocked, isActivated, minRating, maxRating }, page, limit)

        ResponseFormatter.success(res, {
            searchResult: results
        })
    })

    async getUser(req, res, next) {
        try {
            const { userId } = req.params

            const userData = await AdminService.getUser(userId)

            ResponseFormatter.success(res, {
                user: userData
            })
        } catch (e) {
            next(e)
        }
    }

    async updateUserRole(req, res, next) {
        try {
            const { userId } = req.params
            const role = req.body.role

            const userData = await AdminService.updateUserRole(userId,
                {'role': role}
            )

            ResponseFormatter.success(res, {
                user: userData
            })
        } catch (e) {
            next(e)
        }
    }

    async createCategory(req, res, next) {
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

    async updateCategory(req, res, next) {
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

    async deleteCategory(req, res, next) {
        try {
            const categoryId = req.params.id

            await CategoryService.delete(categoryId)

            ResponseFormatter.success(res)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AdminController()