const Words = require('../models/Words');

exports.checkWord = async (req, res) => {
  const { id, userInput } = req.body;

  try {
    // Fetch the word by ID from the database 
    const wordData = await Words.findById(id);
    if (!wordData) {
      return res.status(404).json({ error: 'Word not found' });
    }

    // Extract the correct word from the database
    const correctWord = wordData.word;

    // Compare the user input word with the correct word
    let correctCount = 0;
    let incorrectCount = 0;
    for (let i = 0; i < correctWord.length; i++) {
      if (correctWord[i] === userInput[i]) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }

    // Send the result back to the client
    res.json({ correctCount, incorrectCount });
  } catch (error) {
    console.error('Error checking word:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
