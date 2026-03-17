const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const RateLimitMiddleware = require('./middleware/limitMiddleware')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, './config/.env') })
const passport = require('./config/passport')
const models = require('./config/associations')
const sequelize = models.sequelize
const authRoute = require('./routes/authRoutes.js')
const profileRoute = require('./routes/profileRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const collectionsRoutes = require('./routes/collectionsRoutes')
const bookmarksRoutes = require('./routes/bookmarksRoutes')
const ErrorMiddleware = require('./middleware/errorMiddleware')


const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev')) //combined
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}))

app.use('/api/', RateLimitMiddleware.api())
app.use(passport.initialize())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/profile/', profileRoute)
app.use('/api/v1/feedback', feedbackRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/collections', collectionsRoutes)
app.use('/api/v1/bookmarks', bookmarksRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(ErrorMiddleware)


// { alter: true } - обновляет структуру, сохраняя данные
// { force: true } - пересоздаёт таблицы (ВСЕ ДАННЫЕ ПРОПАДУТ!)
sequelize.sync()
    .then(() => app.listen(PORT))
    .then(() => console.log(`🚀 http://localhost:${PORT}`))
    .catch(console.error)