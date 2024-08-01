const express = require('express');
const router = express.Router();
const watchController = require('../controllers/watchController');
const upload = require('../middleware/upload');

// Define routes with middleware and controller methods
router.get('/', watchController.getAllWatches);
router.get('/:id', watchController.getWatchById);
router.post('/', upload.single('img'), watchController.createWatch); // Ensure 'img' matches the form field name
router.put('/:id', upload.single('img'), watchController.updateWatch); // Ensure 'img' matches the form field name
router.delete('/:id', watchController.deleteWatch);

// Additional routes
router.get('/grouped-by-category/:categoryId', watchController.getWatchesGroupedByCategory);
router.get('/sub-category/:subCategoryName', watchController.getWatchesBySubCategoryName);

module.exports = router;