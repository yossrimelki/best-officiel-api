const express = require('express');
const router = express.Router();
const shoesController = require('../controllers/shoesController');
const upload = require('../middleware/upload');

// Define fields for file upload with limits
const uploadFields = [
  { name: 'img0', maxCount: 1 },
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 }
];

router.get('/', shoesController.getAllShoes);
router.get('/:id', shoesController.getShoeById);

router.post('/', upload(uploadFields), shoesController.createShoe);
router.put('/:id', upload(uploadFields), shoesController.updateShoe);
router.delete('/:id', shoesController.deleteShoe);

module.exports = router;
