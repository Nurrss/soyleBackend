const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Users', UsersSchema);
