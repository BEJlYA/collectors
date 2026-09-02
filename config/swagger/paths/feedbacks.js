/**
 * @swagger
 * /feedback/:
 *   post:
 *     summary: Публикация отзыва о пользователе
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackRequests'
 *     responses:
 *       200:
 *         description: Отзыв успешно опубликован
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/DealResponse'
 */