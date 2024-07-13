const express = require('express');
const router = express.Router();
const watchController = require('../controllers/watchController');
const upload = require('../middleware/upload'); // Adjust the path as necessary

router.get('/', watchController.getAllWatches);
router.get('/:id', watchController.getWatchById);
router.post('/', upload.single('img'), watchController.createWatch);
router.put('/:id', watchController.updateWatch);
router.delete('/:id', watchController.deleteWatch);

module.exports = router;
