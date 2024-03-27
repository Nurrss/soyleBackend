const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transportationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['bus', 'train', 'taxi', 'car', 'walking'],
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const Transportation = mongoose.model('Transportation', transportationSchema);

module.exports = Transportation;
