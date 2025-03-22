const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    id: String,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String
  });
  const Product = mongoose.model('Product', productSchema);

// 1. Get blogs - No need to auth
router.get("/", async (_, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the collection
        res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
      }
})


module.exports = router;