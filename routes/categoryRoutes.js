const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const upload = require('../middleware/upload');

// Categories
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', upload.single('image'), categoryController.createCategory);
router.put('/categories/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// Sub-Categories
router.get('/subcategories', categoryController.getAllSubCategories);
router.get('/subcategories/:id', categoryController.getSubCategoryById);
router.post('/subcategories', categoryController.createSubCategory);
router.put('/subcategories/:id', categoryController.updateSubCategory);
router.delete('/subcategories/:id', categoryController.deleteSubCategory);

// Fetch subcategories by category
router.get('/categories/:categoryId/subcategories', categoryController.getSubCategoriesByCategoryId);

module.exports = router;
