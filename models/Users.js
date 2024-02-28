const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  results: [{ type: Schema.Types.ObjectId, ref: 'Result' }], // Reference to Result model
});

module.exports = mongoose.model('Users', UsersSchema);
