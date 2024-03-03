const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  title: String,
  words: [String],
  submissions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
      spokenWords: [String],
      results: Map,
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Exams', ExamSchema);
