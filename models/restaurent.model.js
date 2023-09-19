const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the name of the dish."]
  },
  price: {
    type: Number,
    required: [true, "Please add the price."]
  },
  description: {
    type: String,
    default: "No description available."
  },
  isVeg: {
    type: Boolean,
    enum: ["yes", "no"],
    required: [true, "Please mention isVeg or not."]
  }
});

const RestaurentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name."],
    unique: true,
    trim: true,
    maxLength: [30, "Name can not be more than 30 characters"]
  },
  cuisine: [{
    type: String,
    required: [true, "Please add a cuisine."],
    trim: true,
    enum: ['North Indian', 'Asian', 'South Indian', 'Japanese', 'American', 'Mughlai', 'Fast Food', 'Grilled', 'Other'],
  }],
  address: {
    type: String,
    maxLength: [50, "Address can not be more than 50 characters"]
  },
  city: {
    type: String,
    default: 'Bengaluru',
  },
  menu: [{
    type: MenuSchema,
    required: [true, "Please add at least 1 item to the menu."]
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  reviews: [{
    reviewText: {
      type: String,
      required: [true, 'Missing review text.']
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing user reference.']
    },
  }]
}, { timestamps: true });

module.exports = mongoose.model('Restaurent', RestaurentSchema);