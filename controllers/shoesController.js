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
  const imgPaths = (req.files && Object.values(req.files).flat().map(file => `/uploads/${file.filename}`)) || [];

  const shoe = new Shoes({
    title: req.body.title,
    text: req.body.text,
    img: imgPaths,
    price: parseFloat(req.body.price),
    sizes: req.body.sizes.split(',').map(size => parseFloat(size.trim())),
    rating: parseFloat(req.body.rating),
    color: req.body.color,
    shadow: req.body.shadow,
    solde: parseFloat(req.body.solde)
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
    const updatedShoe = await Shoes.findById(req.params.id);

    if (!updatedShoe) return res.status(404).json({ message: 'Shoe not found' });

    if (req.files) {
      updatedShoe.img = Object.values(req.files).flat().map(file => `/uploads/${file.filename}`);
    }

    if (req.body.title) updatedShoe.title = req.body.title;
    if (req.body.text) updatedShoe.text = req.body.text;
    if (req.body.price) updatedShoe.price = parseFloat(req.body.price);
    if (req.body.sizes) updatedShoe.sizes = req.body.sizes.split(',').map(size => parseFloat(size.trim()));
    if (req.body.rating) updatedShoe.rating = parseFloat(req.body.rating);
    if (req.body.color) updatedShoe.color = req.body.color;
    if (req.body.shadow) updatedShoe.shadow = req.body.shadow;
    if (req.body.solde) updatedShoe.solde = parseFloat(req.body.solde);

    const savedShoe = await updatedShoe.save();
    res.status(200).json(savedShoe);
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
