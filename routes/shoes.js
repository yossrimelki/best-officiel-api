const express = require('express');
const router = express.Router();
const shoesController = require('../controllers/shoesController');
const upload = require('../middleware/upload');

router.get('/', shoesController.getAllShoes);
router.get('/:id', shoesController.getShoeById);
router.post('/', upload.single('img'), shoesController.createShoe); // Use multer middleware to handle single file upload
router.put('/:id', shoesController.updateShoe);
router.delete('/:id', shoesController.deleteShoe);

module.exports = router;
