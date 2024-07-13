// controllers/commandeController.js

const Commande = require('../models/commande');
const LineCommande = require('../models/lineCommande');
const Shoes = require('../models/Shoes');
const Watch = require('../models/Watch');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Get all commandes with populated LineCommande details
exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find()
            .populate({
                path: 'items',
                populate: { path: 'productId', model: 'LineCommande' }
            });
        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get details of a shoe by ID
exports.getShoeById = async (req, res) => {
    const { id } = req.params;
    try {
        const shoe = await Shoes.findById(id);
        if (!shoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.status(200).json(shoe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get details of a watch by ID
exports.getWatchById = async (req, res) => {
    const { id } = req.params;
    try {
        const watch = await Watch.findById(id);
        if (!watch) {
            return res.status(404).json({ message: 'Watch not found' });
        }
        res.status(200).json(watch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a commande by ID
exports.getCommandeById = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id)
            .populate({
                path: 'items',
                populate: { path: 'productId', model: 'Shoes' }
            })
            .populate({
                path: 'items',
                populate: { path: 'productId', model: 'Watch' }
            });
        if (!commande) return res.status(404).json({ message: 'Commande not found' });
        res.status(200).json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Create a new commande
exports.createCommande = async (req, res) => {
    const { name, phone, items, totalAmount, deliveryAddress, paymentMethod, orderDate } = req.body;

    console.log('Incoming request body:', JSON.stringify(req.body, null, 2));

    if (!name || !phone || !items || !totalAmount || !deliveryAddress || !paymentMethod) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Validate and format items
        const formattedItems = items.map(item => ({
            productId: ObjectId.isValid(item.productId) ? new ObjectId(item.productId) : null,
            productType: item.productType,
            title: item.title,
            quantity: item.quantity,
            price: item.price
        }));

        console.log('Formatted items:', JSON.stringify(formattedItems, null, 2));

        // Check for valid ObjectId
        if (formattedItems.some(item => !item.productId || !item.productType || !item.title)) {
            return res.status(400).json({ message: 'Invalid productId, productType, or title' });
        }

        // Insert LineCommande documents
        const lineCommandes = await LineCommande.insertMany(formattedItems);

        // Create new Commande with references to LineCommande documents
        const newCommande = new Commande({
            name,
            phone,
            items: lineCommandes.map(item => item._id),
            totalAmount,
            deliveryAddress,
            paymentMethod,
            orderDate: orderDate ? new Date(orderDate) : new Date()
        });

        const savedCommande = await newCommande.save();
        res.status(201).json(savedCommande);
    } catch (error) {
        console.error('Error saving commande:', error);
        res.status(400).json({ message: error.message });
    }
};

// Update a commande
exports.updateCommande = async (req, res) => {
    try {
        const updatedCommande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCommande) return res.status(404).json({ message: 'Commande not found' });
        res.status(200).json(updatedCommande);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a commande
exports.deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndDelete(req.params.id);
        if (!commande) return res.status(404).json({ message: 'Commande not found' });
        res.status(200).json({ message: 'Commande deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
