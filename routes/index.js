const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes.js')
const profileRoutes = require('./profileRoutes')
const feedbackRoutes = require('./feedbackRoutes')
const categoryRoutes = require('./categoryRoutes')
const collectionsRoutes = require('./collectionsRoutes')
const bookmarksRoutes = require('./bookmarksRoutes')
const listingRoutes = require('./listingsRoutes')
const messageRoutes = require('./messageRoutes')
const dealsRoutes = require('./dealRoutes')
const adminRoutes = require('./adminRoutes')
const moderRoutes = require('./moderRoutes')
const path = require("path");


router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)
router.use('/feedback', feedbackRoutes)
router.use('/category', categoryRoutes)
router.use('/collections', collectionsRoutes)

router.use('/bookmarks', bookmarksRoutes)
router.use('/listings', listingRoutes)
router.use('/messages', messageRoutes)
router.use('/deals', dealsRoutes)

router.use('/admin', adminRoutes)
router.use('/moder', moderRoutes)

router.use('/uploads', express.static(path.join(__dirname, 'uploads')))

module.exports = router