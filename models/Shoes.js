const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  img: {
    type: String, // Store the image path
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: [Number],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  shadow: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Shoes = mongoose.model('Shoes', shoesSchema);
module.exports = Shoes;
