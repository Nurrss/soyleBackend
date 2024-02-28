const router = require('express').Router();
const handleNewUser = require('../controllers/registerController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *           examples:
 *             example1:
 *               value:
 *                 email: "john@example.com"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               data:
 *                 id: "12345"
 *                 email: "john@example.com"
 *               message: "Успешно сохранено"
 *       400:
 *         description: Bad request
 */
router.post('/', handleNewUser);

module.exports = router;
