const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the name of the place."],
    trim: true,
    maxLength: [30, "Name can not be more than 30 characters"]
  },
  location: {
    type: String,
    required: [true, "Please specify location(city, country) of the destination."],
    trim: true,
    maxLength: [60, "Address can not be more than 50 characters"]
  },
  description: {
    type: String,
    trim: true,
    default: "No description available."
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    reviewText: {
      type: String,
      required: [true, 'Missing review text.']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing user reference.']
    },
  }]
}, { timestamps: true });

module.exports = mongoose.model('Destination', DestinationSchema);