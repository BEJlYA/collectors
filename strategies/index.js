const passport = require('passport')
const GoogleStrategy = require('./googleStrategy')
const YandexStrategy = require('./yandexStrategy')

passport.use('google', GoogleStrategy)
passport.use('yandex', YandexStrategy)

module.exports = passport