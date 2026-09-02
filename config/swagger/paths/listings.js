/**
 * @swagger
 * /listings/:
 *   get:
 *     summary: Получение всех публичных объявлений
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Данные публичных объявлений успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ListingsAllResponse'
 */

/**
 * @swagger
 * /listings/my/:
 *   get:
 *     summary: Получение всех объявлений пользователя
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Данные объявлений пользователя успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ListingsAllResponse'
 */

/**
 * @swagger
 * /listings/{listingId}:
 *   get:
 *     summary: Получение публичного или персонального объявления
 *     description: |
 *       Если пользователь является владельцем — возвращает PersonalListingDto.
 *       Если нет — PublicListingDto (только активные объявления).
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Объявление найдено (владелец)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListingPersonalResponse'
 *       201:
 *         description: Объявление найдено (не владелец)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListingPublicResponse'
 */

/**
 * @swagger
 * /listings/:
 *   post:
 *     summary: Создание нового объявления пользователем
 *     tags: [Listings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListingRequests'
 *     responses:
 *       200:
 *         description: Новое объявление пользователя успешно создано
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ListingPersonalResponse'
 */

/**
 * @swagger
 * /listings/{listingId}:
 *   put:
 *     summary: Обновление объявления пользователя
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListingRequests'
 *     responses:
 *       200:
 *         description: Данные объявления пользователя успешно обновлены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ListingPersonalResponse'
 */

/**
 * @swagger
 * /listings/{listingId}/status:
 *   patch:
 *     summary: Обновление статуса объявления пользователя
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusListingRequests'
 *     responses:
 *       200:
 *         description: Статус объявления пользователя успешно обновлен
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ListingPersonalResponse'
 */

/**
 * @swagger
 * /listings/{listingId}:
 *   delete:
 *     summary: Удаление объявления пользователя
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные объявления пользователя успешно удалены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/EmptyResponse'
 */

/**
 * @swagger
 * /listings/search/:
 *   get:
 *     summary: Поиск публичных объявлений по фильтрам
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные поиска публичных объявлений успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/'
 */

/**
 * @swagger
 * /listings/photos/:
 *   get:
 *     summary: Получение всех фотографий публичных объявлений
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: Данные всех фотографий публичных объявлений успешно получены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PhotosAllResponse'
 */

/**
 * @swagger
 * /listings/photos/{photoId}:
 *   get:
 *     summary: Получение определенной фотографии публичного объявления
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные фотографии публичного объявления успешно получено
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PhotoResponse'
 */

/**
 * @swagger
 * /listings/photos/:
 *   post:
 *     summary: Добавление фотографий объявления пользователя
 *     tags: [Listings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhotoRequests'
 *     responses:
 *       200:
 *         description: Данные фотографий объявления пользователя успешно загружены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PhotosAllResponse'
 */

/**
 * @swagger
 * /listings/photos/{photoId}:
 *   put:
 *     summary: Обновление данных фотографии объявления пользователя
 *     tags: [Listings]
 *     parameters:
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
 *         description: Данные фотографии объявления пользователя успешно обновлены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PhotoAllResponse'
 */

/**
 * @swagger
 * /listings/photos/{photoId}:
 *   delete:
 *     summary: Удаление фотографии объявления пользователя
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Данные фотографии объявления пользователя успешно удалены
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/EmptyResponse'
 */