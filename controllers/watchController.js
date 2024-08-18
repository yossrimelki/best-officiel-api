// controllers/watchController.js
const mongoose = require('mongoose');
const Watch = require('../models/Watch');
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');

// Get all watches
exports.getAllWatches = async (req, res) => {
  try {
    const watches = await Watch.find().populate('subCategory category');
    res.status(200).json(watches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a watch by ID
exports.getWatchById = async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id).populate('subCategory category');
    if (!watch) return res.status(404).json({ message: 'Watch not found' });
    res.status(200).json(watch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new watch
exports.createWatch = async (req, res) => {
  try {
    const { title, text, price, rating, color, shadow, subCategory, category, solde } = req.body;

    const img = (req.files && Object.values(req.files).flat().map(file => `/uploads/${file.filename}`)) || [];

    const newWatch = new Watch({
      title,
      text,
      price,
      rating,
      color,
      shadow,
      subCategory,
      category,
      solde,
      img
    });

    await newWatch.save();
    res.status(201).json(newWatch);
  } catch (error) {
    console.error('Failed to create watch:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ message: 'Failed to create watch', error: error.message });
  }
};

// Update an existing watch
exports.updateWatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, price, rating, color, shadow, subCategory, category, solde } = req.body;

    const img =(req.files && Object.values(req.files).flat().map(file => `/uploads/${file.filename}`)) || [];

    const updatedWatch = await Watch.findByIdAndUpdate(id, {
      title,
      text,
      price,
      rating,
      color,
      shadow,
      subCategory,
      category,
      solde,
      img
    }, { new: true });

    if (!updatedWatch) return res.status(404).json({ message: 'Watch not found' });
    res.status(200).json(updatedWatch);
  } catch (error) {
    console.error('Failed to update watch:', error.message);
    res.status(500).json({ message: 'Failed to update watch', error: error.message });
  }
};

// Delete a watch
exports.deleteWatch = async (req, res) => {
  try {
    const watch = await Watch.findByIdAndDelete(req.params.id);
    if (!watch) return res.status(404).json({ message: 'Watch not found' });
    res.status(200).json({ message: 'Watch deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get watches grouped by category
exports.getWatchesGroupedByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate categoryId
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find watches belonging to this category
    const watches = await Watch.find({ category: categoryId }).populate('category subCategory');

    res.status(200).json({
      category: {
        _id: category._id,
        name: category.name
      },
      items: watches
    });
  } catch (error) {
    console.error('Error fetching watches by category ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Get watches by sub-category name
exports.getWatchesBySubCategoryName = async (req, res) => {
  try {
    const { subCategoryName } = req.params;

    // Find the sub-category by name
    const subCategory = await SubCategory.findOne({ title: subCategoryName });
    if (!subCategory) return res.status(404).json({ message: 'Sub-category not found' });

    // Find watches belonging to this sub-category
    const watches = await Watch.find({ subCategory: subCategory._id }).populate('subCategory');
    res.status(200).json({
      subCategory: subCategoryName,
      items: watches
    });
  } catch (error) {
    console.error('Error fetching watches by sub-category name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
