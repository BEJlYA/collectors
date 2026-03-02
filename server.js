const express = require("express")
require('dotenv').config({path: require('path').join(__dirname, './.env')})
const models = require("./models")
const sequelize = models.sequelize
const authRoute = require("./routes/authRoutes.js")
const profileRoutes = require("./routes/profileRoutes")
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/auth", authRoute)
app.use("/api/profiles", profileRoutes)

app.use(errorMiddleware)

const PORT = process.env.PORT

sequelize.sync() //{alter: true} - для обновления row в таблицах (старые поля и данные останутся), {force: true} - удаление всех бд и пересоздание с нуля
    .then(() => app.listen(PORT))
    .then(() => console.log(`🚀 http://localhost:${PORT}`))
    .catch(console.error)