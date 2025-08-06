import express from 'express';
import Product from '../models/Product.js';


const router = express.Router();


// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
});

// Get products by category key
router.get('/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const products = await Product.findAll({ where: { categoryKey: key } });
    res.json(products);
  } catch (error) {
    console.error(`Error fetching products for category "${key}":`, error);
    res.status(500).json({ message: 'Failed to fetch products for the category' });
  }
});

export default router;