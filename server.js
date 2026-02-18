const express = require("express")
require('dotenv').config({path: require('path').join(__dirname, './.env')})

const models = require("./models")
const sequelize = models.sequelize

const authRoute = require("./routes/authRoutes.js")


const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use("/", authRoute)

const PORT = process.env.PORT

sequelize.sync() //{alter: true} - для обновления row в таблицах
    .then(() => app.listen(PORT))
    .then(() => console.log(`🚀 http://localhost:${PORT}`))
    .catch(console.error)