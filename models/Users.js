const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  resultsHistory: [
    {
      exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exams',
      },
      submissionId: mongoose.Schema.Types.ObjectId,
      results: Map,
    },
  ],
});

module.exports = mongoose.model('Users', UsersSchema);
