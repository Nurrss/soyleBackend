const Exam = require('../models/Exams');
const mongoose = require('mongoose');

exports.addWordToExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { word } = req.body;

    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { $addToSet: { words: word } },
      { new: true },
    );

    if (!updatedExam) {
      return res.status(404).send('Exam not found');
    }

    res.json(updatedExam);
  } catch (err) {
    console.error(err);
    res.status(500).send('Problem with server');
  }
};

exports.submitWord = async (req, res) => {
  const { examId } = req.params;
  const { userId, spokenWord } = req.body;

  if (!userId) {
    return res.status(400).send({ message: 'User id is required' });
  }
  if (!spokenWord || spokenWord.length === 0) {
    return res.status(400).send({ message: 'Spoken word must not be empty' });
  }

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).send('Exam not found');
    }

    let submission = exam.submissions.find(
      sub => sub.user.toString() === userId,
    );

    if (submission) {
      // If a submission exists, add the spokenWord to it
      submission.spokenWords.push(spokenWord);
    } else {
      // If no submission exists, create one
      submission = {
        user: new mongoose.Types.ObjectId(userId), // Corrected usage with 'new'
        spokenWords: [spokenWord],
        results: {}, // Assuming you have some results logic to implement here
        submittedAt: new Date(), // Capture the submission time (optional)
      };
      exam.submissions.push(submission);
    }

    await exam.save();

    res.status(200).send({
      message: 'Word submission successful',
      submissionId: submission._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

exports.getResults = async (req, res) => {
  const { examId, submissionId } = req.params;

  try {
    const exam = await Exam.findById(examId).populate('submissions.user');
    const submission = exam.submissions.id(submissionId);

    if (!submission) return res.status(404).send('Submission not found');

    const results = calculateResults(exam.words, submission.spokenWords);

    res.status(200).json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

function calculateResults(targetWords, spokenWords) {
  let letterStats = {};

  targetWords.forEach((word, index) => {
    const spokenWord = spokenWords[index] || '';

    word.split('').forEach((char, charIndex) => {
      if (!letterStats[char]) letterStats[char] = { correct: 0, total: 0 };
      letterStats[char].total++;

      if (spokenWord[charIndex] === char) {
        letterStats[char].correct++;
      }
    });
  });

  let results = {};
  for (const [char, stats] of Object.entries(letterStats)) {
    results[char] = (stats.correct / stats.total) * 100 + '%';
  }

  return results;
}
