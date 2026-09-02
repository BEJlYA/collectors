/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Успешно
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AuthResponse'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       201:
 *         description: Успешно
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AuthResponse'
 */

/**
 * @swagger
 * /auth/{provider}:
 *   get:
 *     summary: Начать OAuth-аутентификацию
 *     description: Перенаправляет на страницу авторизации провайдера (google, yandex)
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum: [google, yandex]
 *         description: Идентификатор OAuth-провайдера
 *     responses:
 *       302:
 *         description: Перенаправление на страницу авторизации провайдера
 *       400:
 *         description: Неподдерживаемый провайдер
 */

/**
 * @swagger
 * /auth/{provider}/callback:
 *   get:
 *     summary: Callback OAuth-провайдера
 *     description: Обработка ответа от провайдера после авторизации
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum: [google, yandex]
 *         description: Идентификатор OAuth-провайдера
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Код авторизации от провайдера
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Состояние (для защиты от CSRF)
 *     responses:
 *       302:
 *         description: Перенаправление на фронтенд с токенами
 *       400:
 *         description: Ошибка авторизации
 *       401:
 *         description: Недействительный код
 */

/**
 * @swagger
 * /auth/activate/{link}:
 *   get:
 *     summary: Активация аккаунта пользователя
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: link
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Перенаправление на фронтенд
 *       404:
 *         description: Ошибка активации профиля
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Обновление access-токена
 *     description: Использует refreshToken из httpOnly cookies для выдачи новой пары токенов.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Токен обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Refresh токен отозван
 */

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Выход из аккаунта
 *     description: Удаляет refreshToken из cookies и базы данных.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Выход выполнен
 *       401:
 *         description: Пользователь не авторизован
 */