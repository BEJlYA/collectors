/**
 * @swagger
 * /moder/listings/:
 *   get:
 *     summary: Получение объявлений требующих рассмотрения
 *     tags: [Moder]
 *     responses:
 *       200:
 *         description: Данные о объявлениях требующих рассмотрения успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ListingPersonalResponse'
 */

/**
 * @swagger
 * /moder/listings/{listingId}/active:
 *   patch:
 *     summary: Изменение статуса объявления на "Активное"
 *     tags: [Moder]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Статус объявления изменен на "Активное"
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ListingPersonalResponse'
 */

/**
 * @swagger
 * /moder/listings/{listingId}/rejected:
 *   patch:
 *     summary: Изменение статуса объявления на "Доработать"
 *     tags: [Moder]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Статус объявления изменен на "Доработать"
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ListingPersonalResponse'
 */

/**
 * @swagger
 * /moder/users/{userId}/block:
 *   patch:
 *     summary: Заблокировать пользователя
 *     tags: [Moder]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Статус пользователя изменен на "Заблокирован"
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AdminUserResponse'
 */

/**
 * @swagger
 * /moder/users/{userId}/block:
 *   patch:
 *     summary: Разблокировать пользователя
 *     tags: [Moder]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Статус пользователя изменен на "Разблокирован"
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AdminUserResponse'
 */