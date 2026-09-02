/**
 * @swagger
 * /admin/users/:
 *   get:
 *     summary: Получение данных о всех профилях пользователей
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Данные о всех профилях пользователей успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AdminUsersResponse'
 */



/**
 * @swagger
 * /admin/users/{userId}/:
 *   get:
 *     summary: Получение данных о определенном профиле пользователя
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные о определенном профиле пользователя успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AdminUserResponse'
 */

/**
 * @swagger
 * /admin/users/{userId}/role:
 *   patch:
 *     summary: Переназначение роли пользователя
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminRoleRequests'
 *     responses:
 *       200:
 *         description: Данные о роли пользователя успешно изменены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AdminUserResponse'
 */

/**
 * @swagger
 * /admin/categories:
 *   post:
 *     summary: Добавление новой категории коллекционирования
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCategoriesRequests'
 *     responses:
 *       200:
 *         description: Данные о новой категории коллекционирования успешно добавлены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CategoryResponse'
 */

/**
 * @swagger
 * /admin/categories/{categoryId}:
 *   patch:
 *     summary: Изменение данных категории коллекционирования
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCategoriesRequests'
 *     responses:
 *       200:
 *         description: Данные о категории коллекционирования успешно изменены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CategoryResponse'
 */

/**
 * @swagger
 * /admin/categories/{categoryId}:
 *   delete:
 *     summary: Удаление данных категории коллекционирования
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные о категории коллекционирования успешно удалены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/EmptyResponse'
 */