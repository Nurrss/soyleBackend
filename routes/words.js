/**
 * @swagger
 * tags:
 *   name: Words
 *   description: API endpoints for managing words
 */

const router = require('express').Router();
const _ = require('lodash');
const Words = require('../models/Words');
const ApiOptimizer = require('../api');
const errorHandler = require('../middleware/errorHandler');

const words = new ApiOptimizer(Words);
const modelName = 'Words';

// get all words
/**
 * @swagger
 * /words:
 *   get:
 *     summary: Retrieve all words
 *     tags: [Words]
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
    await words.getAll(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// get a word by id
/**
 * @swagger
 * /words/{id}:
 *   get:
 *     summary: Retrieve a word by ID
 *     tags: [Words]
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
    await words.getById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// add a new word
/**
 * @swagger
 * /words/add:
 *   post:
 *     summary: Add a new word
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully added word
 *       '400':
 *         description: Bad request
 */
router.post('/add', async (req, res) => {
  try {
    const { word } = req.body;
    const entity = { word };
    await words.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// update a word by id
/**
 * @swagger
 * /words/{id}:
 *   put:
 *     summary: Update a word by ID
 *     tags: [Words]
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
 *               word:
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

// delete a word by id
/**
 * @swagger
 * /words/{id}:
 *   delete:
 *     summary: Delete a word by ID
 *     tags: [Words]
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
