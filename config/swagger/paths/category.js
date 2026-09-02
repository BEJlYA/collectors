/**
 * @swagger
 * /category/:
 *   get:
 *     summary: Получение всех категорий коллекционирования
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Категории коллекционирования успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CategoryAllResponse'
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Получение определенной категории коллекционирования
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Категория коллекционирования успешно получена
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CategoryResponse'
 */