const Queue = require('bull')
const nodemailer = require('nodemailer')

const mailQueue = new Queue('email', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

mailQueue.process('sendActivation', async (job) => {
    const { to, link } = job.data

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    })

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта на Bifare.by',
        text: '',
        html:
            `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке:</h1>
                    <a href='${link}'>${link}</a>
                </div>
            `

    })
})

module.exports = mailQueue