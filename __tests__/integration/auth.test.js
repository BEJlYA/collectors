const request = require('supertest')
const app = require('../../config/app')
const Users = require('../../models/Users')
const crypto = require('crypto')

test('должен зарегистрировать пользователя с валидными данными', async () => {
    const res = await request(app)
        .post('/v1/auth/register')
        .send({
            email: 'register@mail.com',
            password: '123456',
            phoneNumber: '+375291234567'
        })

    expect(res.statusCode).toBe(201)

    expect(res.body.data).toHaveProperty('accessToken')
    expect(res.body.data).toHaveProperty('user')
    expect(res.body.data.user).toHaveProperty('id')
})

test('должен вернуть 409 при дубликате email или номера телефона', async () => {
    const userData = {
        email: 'duplicate@mail.com',
        password: '123456',
        phoneNumber: '+375291234568'
    }

    await request(app)
        .post('/v1/auth/register')
        .send(userData)

    const res = await request(app)
        .post('/v1/auth/register')
        .send(userData)

    expect(res.statusCode).toBe(409)
    expect(res.body.message).toContain('уже зарегистрирован')
})

test('должен вернуть ошибку регистрации пользователя с невалидным телефоном', async () => {
    const res = await request(app)
        .post('/v1/auth/register')
        .send({
            email: 'register@mail.com',
            password: '123456',
            phoneNumber: '+375291234567f'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toContain('Ошибка валидации')
})

test('должен вернуть ошибку регистрации пользователя с невалидной почтой', async () => {
    const res = await request(app)
        .post('/v1/auth/register')
        .send({
            email: 'register@mail',
            password: '123456',
            phoneNumber: '+375291234567'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toContain('Ошибка валидации')
})

test('должен вернуть ошибку регистрации пользователя с длинным паролем', async () => {
    const res = await request(app)
        .post('/v1/auth/register')
        .send({
            email: 'register@mail',
            password: '123456789123456789123456789123-',
            phoneNumber: '+375291234567'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toContain('Ошибка валидации')
})

test('должен вернуть ошибку регистрации пользователя с отсутствующими полями почты или телефона', async () => {
    const res = await request(app)
        .post('/v1/auth/register')
        .send({
            email: '',
            password: '123456',
            phoneNumber: ''
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toContain('Ошибка валидации')
})

test('должен вернуть авторизовать пользователя с валидными данными', async () => {
    const res = await request(app)
        .post('/v1/auth/login')
        .send({
            identifier: 'register@mail.com',
            password: '123456'
        })

    expect(res.statusCode).toBe(201)

    expect(res.body.data).toHaveProperty('accessToken')
    expect(res.body.data).toHaveProperty('user')
    expect(res.body.data.user).toHaveProperty('id')
})

test('должен вернуть 400 при неверных данных', async () => {
    const res = await request(app)
        .post('/v1/auth/login')
        .send({
            identifier: 'register1@mail.com',
            password: '1234567'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toContain('Неверные данные')
})

test('должен вернуть 400 при отсутствии почты или телефона', async () => {
    const res = await request(app)
        .post('/v1/auth/login')
        .send({
            identifier: '',
            password: '1234567'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toContain('Ошибка валидации')
})

test('должен вернуть 400 при отсутствии пароля', async () => {
    const res = await request(app)
        .post('/v1/auth/login')
        .send({
            identifier: 'register1@mail.com',
            password: ''
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toContain('Ошибка валидации')
})

test('успешная активация аккаунта пользователя', async () => {
    let email = 'register@mail.com'
    const user = await Users.findOne({ where: { email } })
    const link = user.activationLink

    const res = await request(app)
        .get(`/v1/auth/activate/${link}`)

    expect(res.statusCode).toBe(302)

    const activatedUser = await Users.findOne({ where: { email } })
    expect(activatedUser.isActivated).toBe(true)
})

test('не успешная активация аккаунта пользователя, вернет 404', async () => {
    let link = crypto.randomUUID()

    const res = await request(app)
        .get(`/v1/auth/activate/${link}`)

    expect(res.statusCode).toBe(404)
    expect(res.body.message).toContain('Ошибка активации профиля')
})