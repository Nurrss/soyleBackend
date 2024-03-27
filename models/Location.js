const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['historical', 'restaurant', 'nature', 'park', 'shop', 'event'],
    required: true,
  },
  coordinates: {
    type: { type: String },
    coordinates: [Number],
  },
  description: {
    type: String,
  },
  // Add more fields as needed
});

// Index coordinates for geospatial queries
locationSchema.index({ coordinates: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
