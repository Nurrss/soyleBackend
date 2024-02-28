const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

/**
 * @swagger
 * /api/words/check-word:
 *   post:
 *     summary: Check user input word against the word in the database
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the word to check
 *               userInput:
 *                 type: string
 *                 description: The user input word to compare
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 correctCount:
 *                   type: integer
 *                   description: Number of correct letters
 *                 incorrectCount:
 *                   type: integer
 *                   description: Number of incorrect letters
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Word not found
 *       '500':
 *         description: Internal server error
 */

router.post('/check-word', wordController.checkWord);

module.exports = router;
