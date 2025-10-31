const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create a Product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "✅ Product Added", product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "✅ Product Updated", updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.json({ message: "🗑 Product Deleted", deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
