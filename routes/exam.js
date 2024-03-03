/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: API endpoints for managing exams
 */

const router = require('express').Router();
const _ = require('lodash');
const Exams = require('../models/Exams');
const ApiOptimizer = require('../api');
const examController = require('../controllers/examController');
const errorHandler = require('../middleware/errorHandler');

const exams = new ApiOptimizer(Exams);
const modelName = 'Exams';

/**
 * @swagger
 * /exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Exams]
 *     description: Retrieve a list of all exams.
 *     responses:
 *       200:
 *         description: A list of exams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 */

router.route('/').get(async (req, res) => {
  try {
    await exams.getAll(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /exams/{id}:
 *   get:
 *     summary: Get an exam by ID
 *     tags: [Exams]
 *     description: Retrieve an exam by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the exam
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The exam object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 */

router.route('/:id').get(async (req, res) => {
  try {
    await exams.getById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /exams/add:
 *   post:
 *     summary: Add a new exam
 *     tags: [Exams]
 *     description: Add a new exam with the specified title.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             example:
 *               title: New Exam
 *     responses:
 *       200:
 *         description: The newly created exam
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 */

router.post('/add', async (req, res) => {
  try {
    const { title } = req.body;
    const entity = { title };
    await exams.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /exams/{id}:
 *   put:
 *     summary: Update an exam by ID
 *     tags: [Exams]
 *     description: Update an exam by its ID with a new word.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the exam
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
 *             example:
 *               word: NewWord
 *     responses:
 *       200:
 *         description: The updated exam object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 */

router.route('/:id').put(async (req, res) => {
  try {
    const entityId = _.get(req, 'params.id');
    const { word } = req.body;
    const fieldsToUpdate = { word };
    await exams.updateById({ entityId, fieldsToUpdate, req, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /exams/{id}:
 *   delete:
 *     summary: Delete an exam by ID
 *     tags: [Exams]
 *     description: Delete an exam by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the exam
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted exam object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 */

router.route('/:id').delete(async (req, res) => {
  try {
    await exams.deleteById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /exams/{id}/words:
 *   post:
 *     summary: Add a word to an exam
 *     tags: [Exams]
 *     description: Add a word to an exam identified by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the exam
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
 *             example:
 *               word: NewWord
 *     responses:
 *       200:
 *         description: The updated exam object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: Exam not found
 */

router.post('/:id/words', examController.addWordToExam);

module.exports = router;
