const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

/**
 * @swagger
 * /checkword:
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
 *               wordId:
 *                 type: string
 *                 description: The ID of the word to check
 *               userInput:
 *                 type: string
 *                 description: The user input word to compare
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 correctLettersCount:
 *                   type: object
 *                   description: Object containing counts of correct letters
 *                 incorrectLettersCount:
 *                   type: integer
 *                   description: Number of incorrect letters
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Word not found
 *       '500':
 *         description: Internal server error
 */

router.post('/', wordController.checkWord);

module.exports = router;
