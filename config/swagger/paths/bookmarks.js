/**
 * @swagger
 * /bookmarks/:
 *   get:
 *     summary: Получение всех закладок объявлений пользователя
 *     tags: [Bookmarks]
 *     responses:
 *       200:
 *         description: Закладки пользователя успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/BookmarksAllResponse'
 */

/**
 * @swagger
 * /bookmarks/:
 *   post:
 *     summary: Добавление объявления в закладки
 *     tags: [Bookmarks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookmarksRequest'
 *     responses:
 *       201:
 *         description: Закладка успешно добавлена
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/BookmarksAllResponse'
 */

/**
 * @swagger
 * /bookmarks/{bookmarkId}:
 *   delete:
 *     summary: Удаление закладки
 *     tags: [Bookmarks]
 *     parameters:
 *       - in: path
 *         name: bookmarkId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Закладка успешно удалена
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/EmptyResponse'
 *       400:
 *         description: Такой закладки нет или не вы её владелец
 */