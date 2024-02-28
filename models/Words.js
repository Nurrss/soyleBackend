const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  word: String,
  correctLetters: [String],
});

module.exports = mongoose.model('Word', wordSchema);
