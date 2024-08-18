// routes/watches.js
const express = require('express');
const router = express.Router();
const watchController = require('../controllers/watchController');
const upload = require('../middleware/upload');

// Define upload fields
const uploadFields = [
  { name: 'img0', maxCount: 1 },
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 }
];

// Define routes with middleware and controller methods
router.get('/', watchController.getAllWatches);
router.get('/:id', watchController.getWatchById);
router.post('/', upload(uploadFields), watchController.createWatch);
router.put('/:id', upload(uploadFields), watchController.updateWatch);
router.delete('/:id', watchController.deleteWatch);

// Additional routes
router.get('/grouped-by-category/:categoryId', watchController.getWatchesGroupedByCategory);
router.get('/sub-category/:subCategoryName', watchController.getWatchesBySubCategoryName);

module.exports = router;
