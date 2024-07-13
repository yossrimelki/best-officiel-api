const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamationController'); // Adjust the path as necessary

router.get('/', reclamationController.getAllReclamations);
router.get('/:id', reclamationController.getReclamationById);
router.post('/', reclamationController.createReclamation);
router.put('/:id', reclamationController.updateReclamation);
router.delete('/:id', reclamationController.deleteReclamation);

module.exports = router;
