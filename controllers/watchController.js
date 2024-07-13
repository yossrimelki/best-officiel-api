const Watch = require('../models/Watch');

// Get all watches
exports.getAllWatches = async (req, res) => {
  try {
    const watches = await Watch.find();
    res.status(200).json(watches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a watch by ID
exports.getWatchById = async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id);
    if (!watch) return res.status(404).json({ message: 'Watch not found' });
    res.status(200).json(watch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new watch
exports.createWatch = async (req, res) => {
  const { title, text, img, price, rating, color, shadow } = req.body;
  const newWatch = new Watch({
    title,
    text,
    img: req.file.path, // Assuming multer has stored the file path in req.file.path
    price,
    rating,
    color,
    shadow
  });

  try {
    const savedWatch = await newWatch.save();
    res.status(201).json(savedWatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a watch
exports.updateWatch = async (req, res) => {
  try {
    const updatedWatch = await Watch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWatch) return res.status(404).json({ message: 'Watch not found' });
    res.status(200).json(updatedWatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
