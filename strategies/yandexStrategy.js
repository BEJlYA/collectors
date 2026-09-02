const YandexStrategy = require('passport-yandex').Strategy
const AuthService = require('../services/authService')

module.exports = new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/v1/auth/yandex/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const result = await AuthService.handleOAuth('yandex', profile)
            return done(null, result)
        } catch (err) {
            return done(err, null)
        }
    })