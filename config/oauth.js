module.exports = {
    google: {
        strategy: require('../strategies/googleStrategy'),
        scope: ['email', 'profile'],
        callbackPath: '/google/callback'
    },
    yandex: {
        strategy: require('../strategies/yandexStrategy'),
        callbackPath: '/yandex/callback'
    }
}