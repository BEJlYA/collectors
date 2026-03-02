const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config({path: require('path').join(__dirname, './.env')})
const models = require('./models')
const sequelize = models.sequelize
const authRoute = require('./routes/authRoutes.js')
const profileRoutes = require('./routes/profileRoutes')
const ErrorMiddleware = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/profiles', profileRoutes)

app.use(ErrorMiddleware)

const PORT = process.env.PORT || 3000

// { alter: true } - обновляет структуру, сохраняя данные
// { force: true } - пересоздаёт таблицы (ВСЕ ДАННЫЕ ПРОПАДУТ!)
sequelize.sync()
    .then(() => app.listen(PORT))
    .then(() => console.log(`🚀 http://localhost:${PORT}`))
    .catch(console.error)