const mongoose = require("mongoose");
const { Schema } = mongoose;

const WordsSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Words", WordsSchema);
