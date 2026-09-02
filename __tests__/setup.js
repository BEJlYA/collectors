const sequelize = require('../config/database')
require('./__mocks__/meilisearch')
require('./__mocks__/nodemailer')

beforeAll(async () => {
    await sequelize.sync({ force: true })
})

afterAll(async () => {
    await sequelize.close()
})