module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Collectors API',
        version: '1.0.0',
        description: 'API для платформы коллекционеров...',
        contact: { name: 'API Support', email: 'support@collectors.com' },
        license: { name: 'MIT', url: 'https://opensource.org/licenses/MIT' }
    },
    servers: [
        { url: 'http://localhost:3000/v1', description: 'Development server' },
        { url: 'https://api.collectors.com/v1', description: 'Production server' }
    ],
    tags: [
        { name: 'Auth', description: 'Аутентификация и регистрация' },
        { name: 'Profile', description: 'Управление профилем пользователя' },
        { name: 'Collections', description: 'Управление коллекциями' },
        { name: 'Category', description: 'Управление категориями коллекционирования'},
        { name: 'Listings', description: 'Управление объявлениями' },
        { name: 'Deals', description: 'Управление чатами' },
        { name: 'Messages', description: 'Сообщения в чатах' },
        { name: 'Feedbacks', description: 'Отзывы о пользователях' },
        { name: 'Bookmarks', description: 'Закладки на предметы' },
        { name: 'Search', description: 'Поиск объявлений и пользователей' },
        { name: 'Admin', description: 'Администрирование (только ADMIN)' },
        { name: 'Moder', description: 'Модерация (только MODER)' }
    ],
    security: [{ bearerAuth: [] }]
}