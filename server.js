const app = require('./config/app')
const { createServer } = require('http')
const socketInit = require('./socket')
const models = require('./config/associations')
const sequelize = models.sequelize
const searchService = require('./services/searchService')

const server = createServer(app)
socketInit.init(server)

const PORT = process.env.PORT || 3000

// { alter: true } - обновляет структуру, сохраняя данные
// { force: true } - пересоздаёт таблицы (ВСЕ ДАННЫЕ ПРОПАДУТ!)
sequelize.sync()
    .then(async () => {
        await searchService.init()
        server.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`))
    })
    .catch(console.error)