/**
 * @swagger
 * tags:
 *   name: AI
 *   description: API endpoints for managing ai
 */

const OpenAI = require('openai');
const router = require('express').Router();
require('dotenv').config();

const checkWord = [
  {
    id: 1,
    word: 'Қанат',
    userInput: 'Канат',
  },
  {
    id: 2,
    word: 'Қанат',
    userInput: 'Канат',
  },
  {
    id: 3,
    word: 'Қанат',
    userInput: 'Канат',
  },
];

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

router.route('/advice').get(async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Ты онлайн логопед, В этом массиве есть правильные слова и поле userInput, которые проговорил ребенок. Тебе нужно сравнить слова и выдать мне общий совет: где у меня ошибка и как исправить ошибку в произношении.\n\n${JSON.stringify(checkWord, null, 2)}`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  res.status(200).json({ success: true, answer: completion.choices[0] });
});
module.exports = router;
