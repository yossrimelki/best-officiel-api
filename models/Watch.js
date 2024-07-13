const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number, // Changed to String to accommodate "5+"
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

const Watch = mongoose.model('Watch', watchSchema);
module.exports = Watch;
