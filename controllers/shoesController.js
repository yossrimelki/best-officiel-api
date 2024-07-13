const Shoes = require('../models/Shoes');

// Get all shoes
exports.getAllShoes = async (req, res) => {
  try {
    const shoes = await Shoes.find();
    res.status(200).json(shoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a shoe by ID
exports.getShoeById = async (req, res) => {
  try {
    const shoe = await Shoes.findById(req.params.id);
    if (!shoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json(shoe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new shoe
exports.createShoe = async (req, res) => {
  const shoe = new Shoes({
    title: req.body.title,
    text: req.body.text,
    img: req.file.path, // Save the path of the uploaded image
    price: req.body.price,
    sizes: req.body.sizes.split(',').map(size => parseFloat(size.trim())), // Convert sizes string to an array of numbers
    rating: req.body.rating,
    color: req.body.color,
    shadow: req.body.shadow
  });

  try {
    const newShoe = await shoe.save();
    res.status(201).json(newShoe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a shoe
exports.updateShoe = async (req, res) => {
  try {
    const updatedShoe = await Shoes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json(updatedShoe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a shoe
exports.deleteShoe = async (req, res) => {
  try {
    const shoe = await Shoes.findByIdAndDelete(req.params.id);
    if (!shoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json({ message: 'Shoe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
