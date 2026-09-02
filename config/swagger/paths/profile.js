/**
 * @swagger
 * /profile/me/:
 *   get:
 *     summary: Получение личных данных о профиле пользователя
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Личных данных о профиле пользователя успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProfileResponse'
 */

/**
 * @swagger
 * /profile/me/:
 *   put:
 *     summary: Обновление личных данных о профиле пользователя
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileRequests'
 *     responses:
 *       200:
 *         description: Личные данные о профиле пользователя успешно обновлены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProfileResponse'
 */

/**
 * @swagger
 * /profile/me/avatar/:
 *   put:
 *     summary: Обновление аватарки профиля пользователя
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Успешное обновление аватарки профиля пользователя
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProfileResponse'
 */

/**
 * @swagger
 * /profile/{publicId}:
 *   get:
 *     summary: Обновление аватарки профиля пользователя
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешное обновление аватарки профиля пользователя
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProfileResponse'
 */

/**
 * @swagger
 * /profile/{publicId}/collections:
 *   get:
 *     summary: Получение публичных коллекций пользователя
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешное получение публичных коллекций пользователя
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProfileCollectionsResponse'
 */

/**
 * @swagger
 * /profile/{publicId}/feedbacks:
 *   get:
 *     summary: Получение отзывов о пользователе
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешное получение отзывов о пользователе
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProfileFeedbacksResponse'
 */

/**
 * @swagger
 * /profile/settings:
 *   get:
 *     summary: Получение настроек аккаунта пользователя
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Успешное получение настроек аккаунта пользователя
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProfileSettingsResponse'
 */

/**
 * @swagger
 * /profile/settings:
 *   put:
 *     summary: Обновление настроек аккаунта пользователя
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SettingsRequest'
 *     responses:
 *       200:
 *         description: Успешное обновление настроек аккаунта пользователя
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProfileSettingsResponse'
 */

