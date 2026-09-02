const base = require('./base')
const requests = require('./schemas/requests')
const responses = require('./schemas/responses')
const entities = require('./schemas/entities')
const errors = require('./schemas/errors')
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
        ...base,
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Введите токен в формате: Bearer <token>'
                }
            },
            schemas: {
                ...requests,
                ...responses,
                ...entities,
                ...errors
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: [
        './routes/*.js',
        './config/swagger/paths/*.js'
    ]
}

module.exports = swaggerJsdoc(options)