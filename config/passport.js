const passport = require('passport')
const GoogleStrategy = require('../strategies/googleStrategy')
const YandexStrategy = require('../strategies/yandexStrategy')

passport.use('google', GoogleStrategy)
passport.use('yandex', YandexStrategy)

module.exports = passport