/**
 * @swagger
 * tags:
 *   name: Words
 *   description: API endpoints for managing words
 */

const router = require('express').Router();
const _ = require('lodash');
const Users = require('../models/Users');
const ApiOptimizer = require('../api');
const errorHandler = require('../middleware/errorHandler');

const users = new ApiOptimizer(Users);
const modelName = 'Users';

// get all users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of words
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Word'
 */
router.route('/').get(async (req, res) => {
  try {
    await users.getAll(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// get a word by id
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a word by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the word to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single word object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Word'
 *       '404':
 *         description: Word not found
 */
router.route('/:id').get(async (req, res) => {
  try {
    await users.getById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// add a new word
/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Add a new word
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
 *     responses:
 *       '200':
 *         description: Successfully added word
 *       '400':
 *         description: Bad request
 */
router.post('/add', async (req, res) => {
  try {
    const { user } = req.body;
    const entity = { user };
    await users.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// update a user by id
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a word by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the word to update
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
 *         description: Successfully updated word
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Word not found
 */
router.route('/:id').put(async (req, res) => {
  try {
    const entityId = _.get(req, 'params.id');
    const { word } = req.body;
    const fieldsToUpdate = { word };
    await words.updateById({ entityId, fieldsToUpdate, req, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// delete a user by id
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a word by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the word to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted word
 *       '404':
 *         description: Word not found
 */
router.route('/:id').delete(async (req, res) => {
  try {
    await words.deleteById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;
