const router = require('express').Router();
const _ = require('lodash');
const examController = require('../controllers/examController');

/**
 * @swagger
 * tags:
 *   name: Result
 *   description: API endpoints for exam results
 */

/**
 * @swagger
 * /exams/{examId}:
 *   post:
 *     summary: Submit a word for an exam
 *     description: Submit a word for the specified exam.
 *     tags: [Result]
 *     parameters:
 *       - in: path
 *         name: examId
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
 *               userId:
 *                 type: string
 *               spokenWord:
 *                 type: string
 *             example:
 *               userId: 123456
 *               spokenWord: Hello
 *     responses:
 *       200:
 *         description: Successful submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 submissionId:
 *                   type: string
 *       400:
 *         description: Bad request, missing user ID or spoken word
 *       404:
 *         description: Exam not found
 *       500:
 *         description: Internal server error
 */

router.post('/:examId', examController.submitWord);

/**
 * @swagger
 * /exams/{examId}/submission/{submissionId}:
 *   post:
 *     summary: Get results for a submission
 *     description: Get results for the specified submission of an exam.
 *     tags: [Result]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         description: ID of the exam
 *         schema:
 *           type: string
 *       - in: path
 *         name: submissionId
 *         required: true
 *         description: ID of the submission
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Results of the submission
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 [char]:
 *                   type: string
 *                   description: Percentage of correct answers for each character
 *       404:
 *         description: Submission not found
 *       500:
 *         description: Internal server error
 */

router.post('/:examId/submission/:submissionId', examController.getResults);

module.exports = router;
