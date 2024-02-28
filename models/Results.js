const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  word: { type: Schema.Types.ObjectId, ref: 'Word' },
  userInput: String,
  correctLettersCount: { type: Object, default: {} }, // Store correct letters count for each word
});

module.exports = mongoose.model('Result', resultSchema);
