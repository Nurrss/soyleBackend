/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

const router = require('express').Router();
const _ = require('lodash');
const Users = require('../models/Users');
const ApiOptimizer = require('../api');
const errorHandler = require('../middleware/errorHandler');

// Initialize ApiOptimizer for Users model
const users = new ApiOptimizer(Users);
const modelName = 'Users';

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', async (req, res) => {
  try {
    await users.getAll(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 */
router.get('/:id', async (req, res) => {
  try {
    await users.getById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated user
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: User not found
 */
router.put('/:id', async (req, res) => {
  try {
    const entityId = _.get(req, 'params.id');
    const { email } = req.body;
    const fieldsToUpdate = { email };
    await users.updateById({ entityId, fieldsToUpdate, req, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted user
 *       '404':
 *         description: User not found
 */
router.delete('/:id', async (req, res) => {
  try {
    await users.deleteById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;
