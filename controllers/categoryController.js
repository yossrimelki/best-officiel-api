const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const path = require('path');

// Get all categories with populated subcategories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('subCategories');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Fetch a single category with populated subcategories
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('subCategories');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newCategory = new Category({
      name,
      description,
      image
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Delete all subcategories associated with this category
    await SubCategory.deleteMany({ _id: { $in: category.subCategories } });

    // Delete the category
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Category and its subcategories deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category and subcategories', error });
  }
};

// Get all subcategories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sub-categories' });
  }
};

// Get subcategory by ID
exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sub-category' });
  }
};

// Fetch subcategories by category ID
exports.getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId).populate('subCategories');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category.subCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sub-categories', error });
  }
};

// Create subcategory
exports.createSubCategory = async (req, res) => {
  try {
    const newSubCategory = new SubCategory(req.body);
    const savedSubCategory = await newSubCategory.save();

    // Update the parent category with the new subcategory
    const updatedCategory = await Category.findByIdAndUpdate(
      req.body.category, 
      { $push: { subCategories: savedSubCategory._id } },
      { new: true }
    ).populate('subCategories'); // Populate subCategories to return the updated list

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(201).json({
      message: 'Sub-category created and category updated',
      subCategory: savedSubCategory,
      updatedCategory
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating sub-category', error });
  }
};

// Update subcategory
exports.updateSubCategory = async (req, res) => {
  try {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }
    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sub-category' });
  }
};

// Delete subcategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'Sub-category not found' });
    }
    res.status(200).json({ message: 'Sub-category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sub-category' });
  }
};
