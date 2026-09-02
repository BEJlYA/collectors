const GoogleStrategy = require('passport-google-oauth20').Strategy
const AuthService = require('../services/authService')

module.exports = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
        scope: ['email', 'profile']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const result = await AuthService.handleOAuth('google', profile)
            return done(null, result)
        } catch (err) {
            return done(err, null)
        }
    })