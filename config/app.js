require('dotenv').config()
const express = require('express')
const { createServer } = require('http')
const swaggerUi = require('swagger-ui-express')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const RateLimitMiddleware = require('../middleware/limitMiddleware')
const path = require('path')
const routes = require('../routes')
const swaggerSpec = require('./swagger')
const passport = require('./passport')
const ErrorMiddleware = require('../middleware/errorMiddleware')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))

app.use('/api/', RateLimitMiddleware.api())
app.use(passport.initialize())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none',
        filter: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha'
    }
}))

app.use('/v1', routes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(ErrorMiddleware)

module.exports = app