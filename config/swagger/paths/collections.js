/**
 * @swagger
 * /collections/:
 *   get:
 *     summary: Получение всех коллекций пользователя
 *     tags: [Collections]
 *     responses:
 *       200:
 *         description: Данные коллекций успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CollectionsAllResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}:
 *   get:
 *     summary: Получение данных коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные о коллекции успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CollectionResponse'
 */

/**
 * @swagger
 * /collections/:
 *   post:
 *     summary: Создание новой коллекции пользователя
 *     tags: [Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CollectionRequests'
 *     responses:
 *       200:
 *         description: Коллекция успешно создана
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CollectionResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}:
 *   put:
 *     summary: Обновление коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CollectionRequests'
 *     responses:
 *       200:
 *         description: Данные коллекции обновлены успешно
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CollectionResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}:
 *   delete:
 *     summary: Удаление коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные о коллекции удалены успешно
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/EmptyResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/:
 *   get:
 *     summary: Получение данных о предметах коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные о предметах коллекции успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ItemsAllResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/{itemId}:
 *   get:
 *     summary: Получение данных о предмете коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные о предмете коллекции успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ItemResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/:
 *   post:
 *     summary: Создание нового предмета коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemCollectionRequests'
 *     responses:
 *       200:
 *         description: Данные о предмете коллекции успешно созданы
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ItemResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/{itemId}:
 *   put:
 *     summary: Обновление предмета коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemCollectionsRequests'
 *     responses:
 *       200:
 *         description: Данные о предмете коллекции успешно обновлены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ItemResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/{itemId}:
 *   delete:
 *     summary: Обновление предмета коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные о предмете коллекции успешно обновлены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/EmptyResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/{itemId}/photos/:
 *   get:
 *     summary: Получение данных об изображениях предмета коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные об изображениях предмета коллекции успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PhotosAllResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/{itemId}/photos/{photoId}:
 *   get:
 *     summary: Получение данных об изображении предмета коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные об изображении предмета коллекции успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PhotosResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/{itemId}/photos/:
 *   post:
 *     summary: Загрузка изображений предмета коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhotoRequests'
 *     responses:
 *       200:
 *         description: Данные об изображении предмета коллекции успешно созданы
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PhotosAllResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/{itemId}/photos/{photoId}:
 *   put:
 *     summary: Обновление данных изображений предмета коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhotoRequests'
 *     responses:
 *       200:
 *         description: Данные об изображении предмета коллекции успешно обновлены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PhotoResponse'
 */

/**
 * @swagger
 * /collections/{collectionId}/items/{itemId}/photos/{photoId}:
 *   delete:
 *     summary: Обновление данных изображений предмета коллекции пользователя
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные об изображении предмета коллекции успешно обновлены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/EmptyResponse'
 */