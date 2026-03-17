const Queue = require('bull')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs').promises

const imageQueue = new Queue('image', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

imageQueue.process('processImage', async (job) => {
    const { path: filePath, fileName} = job.data

    await sharp(filePath)
        .resize(300, 300)
        .toFile(path.join('uploads/items/previews', fileName))

    await sharp(filePath)
        .resize(1200)
        .toFile(path.join('uploads/items/optimized', fileName))

    await fs.unlink(filePath)
})

module.exports = imageQueue