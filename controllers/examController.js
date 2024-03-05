const { floor } = require('lodash');
const Exam = require('../models/Exams');
const Users = require('../models/Users');
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
      sub => sub.user && sub.user.toString() === userId,
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

    // After adding a new submission
    exam.markModified('submissions');
    await exam.save();
    console.log(submission._id); // Should correctly log the ObjectId of the submission

    res.status(200).json({
      message: 'Word submission successful',
      submissionId: submission._id.toString(), // Ensure the _id is converted to a string if necessary
    });

    console.log(submission);
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

    // Assuming submission.user is populated and contains the user ID
    const userId = submission.user._id;

    // Update user's resultsHistory
    await Users.findByIdAndUpdate(
      userId,
      {
        $push: {
          resultsHistory: {
            exam: examId,
            submissionId: submissionId,
          },
        },
      },
      { new: true },
    );

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

function calculateResults(targetWords, spokenWords) {
  let letterStats = {};

  // Accumulate stats for each letter in the target words
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

  // Convert the stats into the required array format
  let resultsArray = Object.entries(letterStats).map(([char, stats]) => ({
    letter: char,
    percent: (stats.correct / stats.total) * 100 + '%', // Formatting percentage to 2 decimal places
  }));

  return { data: resultsArray };
}
