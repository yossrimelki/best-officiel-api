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
    type: [String], // Array of image URLs
    required: false
  },
  price: {
    type: Number,
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
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  solde: {
    type: Number,
    required: false
  }
}, { timestamps: true });

const Watch = mongoose.model('Watch', watchSchema);
module.exports = Watch;
