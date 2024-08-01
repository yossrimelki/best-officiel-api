const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // Store the file path
    required: false
  },
  subCategories: [{
    type: Schema.Types.ObjectId,
    ref: 'SubCategory'
  }]
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
