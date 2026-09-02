/**
 * @swagger
 * /deals/:
 *   get:
 *     summary: Получение всех диалогов пользователя
 *     tags: [Deals]
 *     responses:
 *       200:
 *         description: Данные диалогов пользователя успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AllDealsResponse'
 */

/**
 * @swagger
 * /deals/{dealId}:
 *   get:
 *     summary: Получение определенного диалога пользователя
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: dealId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные диалога пользователя успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/DealResponse'
 */

/**
 * @swagger
 * /deals/{listingId}:
 *   post:
 *     summary: Получение или создание нового диалога по объявлению
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные диалога по объявлению успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/FeedbackResponse'
 */

