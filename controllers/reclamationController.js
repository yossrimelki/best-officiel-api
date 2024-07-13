const Reclamation = require('../models/Reclamation'); // Adjust the path as necessary

// Get all reclamations
exports.getAllReclamations = async (req, res) => {
    try {
        const reclamations = await Reclamation.find();
        res.status(200).json(reclamations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a reclamation by ID
exports.getReclamationById = async (req, res) => {
    try {
        const reclamation = await Reclamation.findById(req.params.id);
        if (!reclamation) return res.status(404).json({ message: 'Reclamation not found' });
        res.status(200).json(reclamation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new reclamation
exports.createReclamation = async (req, res) => {
    const reclamation = new Reclamation(req.body);
    try {
        const newReclamation = await reclamation.save();
        res.status(201).json(newReclamation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a reclamation
exports.updateReclamation = async (req, res) => {
    try {
        const updatedReclamation = await Reclamation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReclamation) return res.status(404).json({ message: 'Reclamation not found' });
        res.status(200).json(updatedReclamation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a reclamation
exports.deleteReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findByIdAndDelete(req.params.id);
        if (!reclamation) return res.status(404).json({ message: 'Reclamation not found' });
        res.status(200).json({ message: 'Reclamation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
