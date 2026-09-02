/**
 * @swagger
 * /messages/{dealId}:
 *   get:
 *     summary: Получение сообщений определенного чата
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: dealId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные о сообщениях успешно получены
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */