const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  budget: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  preferences: {
    historical: {
      type: Boolean,
      default: false,
    },
    restaurant: {
      type: Boolean,
      default: false,
    },
    nature: {
      type: Boolean,
      default: false,
    },
    park: {
      type: Boolean,
      default: false,
    },
    shop: {
      type: Boolean,
      default: false,
    },
    event: {
      type: Boolean,
      default: false,
    },
    // Add more preferences as needed
  },
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
