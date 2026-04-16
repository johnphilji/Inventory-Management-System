const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');

// Helper for activity logging
const logActivity = async (userId, type, description) => {
  try {
    const activity = new Activity({ userId, type, description });
    await activity.save();
  } catch (err) {
    console.error('Activity Logging Error:', err);
  }
};

// @route    GET api/products
// @desc     Get all products for current user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route    POST api/products
// @desc     Add a new product
// @access   Private
router.post('/', auth, async (req, res) => {
  const { name, category, vendor, price, purchasePrice, quantity, monthlyTrend } = req.body;
  
  const product = new Product({
    name, category, vendor, price, purchasePrice, quantity, monthlyTrend,
    userId: req.user.id
  });

  try {
    const newProduct = await product.save();
    await logActivity(req.user.id, 'Inventory Update', `Added new product: ${name}`);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route    PUT api/products/:id
// @desc     Update a product
// @access   Private
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, userId: req.user.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    await logActivity(req.user.id, 'Inventory Update', `Updated product: ${product.name}`);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route    DELETE api/products/:id
// @desc     Delete a product
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, userId: req.user.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const productName = product.name;
    await Product.deleteOne({ _id: req.params.id });
    await logActivity(req.user.id, 'Inventory Update', `Removed product: ${productName}`);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
