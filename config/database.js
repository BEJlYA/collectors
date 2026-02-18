const { Sequelize } = require('@sequelize/core')
const { PostgresDialect } = require('@sequelize/postgres')
require('dotenv').config({path: require('path').join(__dirname, './.env')})

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: false
    // logging: console.log
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Database connection error:', err))
    .finally(() => console.log('Database closed...'))

module.exports = sequelize