import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = express.Router();

// Add a product to the cart
router.post('/', async (req, res) => {
  const { productId, quantity, deliveryFee } = req.body;

  try {
    // Check if the productId exists in the Product table
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate quantity (must be a number between 1 and 10)
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return res.status(400).json({ message: 'Quantity must be a number between 1 and 10' });
    }

    // Check if the product already exists in the cart
    const existingCartItem = await Cart.findOne({ where: { productId } });
    if (existingCartItem) {
      // Increase the quantity
      const newQuantity = existingCartItem.quantity + quantity;

      // Ensure the total quantity does not exceed 10
      if (newQuantity > 10) {
        return res.status(400).json({ message: 'Total quantity cannot exceed 10' });
      }

      // Calculate the base delivery fee per item
      const baseDeliveryFee = deliveryFee;

      // Update the quantity and delivery fee
      existingCartItem.quantity = newQuantity;
      existingCartItem.deliveryFee = baseDeliveryFee * newQuantity; // Update delivery fee based on the new quantity
      await existingCartItem.save();

      return res.json({ message: 'Cart updated successfully', cartItem: existingCartItem });
    }

    // Calculate the delivery fee for the new cart item
    const calculatedDeliveryFee = deliveryFee * quantity;

    // Add the product to the cart
    const cartItem = await Cart.create({
      productId,
      quantity,
      deliveryFee: calculatedDeliveryFee, // Set the calculated delivery fee
    });

    res.status(201).json({ message: 'Product added to cart', cartItem });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
});

// Get all items in the cart and the total quantity
router.get('/', async (req, res) => {
  const { expand } = req.query; // Extract the `expand` query parameter

  try {
    const includeProduct = expand === 'products'; // Check if `expand=product` is requested

    // Fetch all cart items
    const cartItems = await Cart.findAll({
      include: includeProduct
        ? {
            model: Product,
            as: 'product', // Alias defined in the association
            attributes: [
              'id',
              'name',
              'price',
              'image',
              'initialPrice',
              'discountPercent',
              'rating',
              'type',
              'categoryKey',
            ], // Include all product fields
          }
        : undefined, // Do not include the Product model if `expand` is not set
    });

    // Calculate the total quantity of items in the cart
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      cartItems,
      totalQuantity, // Include the total quantity in the response
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Failed to fetch cart items' });
  }
});

// Delete a product from the cart
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    // Check if the product exists in the cart
    const cartItem = await Cart.findOne({ where: { productId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Delete the product from the cart
    await cartItem.destroy();

    res.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Failed to delete cart item' });
  }
});

// Update the quantity of a product in the cart
router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    // Validate quantity (must be a number between 1 and 10)
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return res.status(400).json({ message: 'Quantity must be a number between 1 and 10' });
    }

    // Find the cart item by productId
    const cartItem = await Cart.findOne({ where: { productId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Update the quantity and dynamically calculate the delivery fee
    const baseDeliveryFee = cartItem.deliveryFee / cartItem.quantity; // Calculate the base delivery fee per item
    cartItem.quantity = quantity;
    cartItem.deliveryFee = baseDeliveryFee * quantity; // Update the delivery fee based on the new quantity

    await cartItem.save();

    res.json({ message: 'Cart item updated successfully', cartItem });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'Failed to update cart item' });
  }
});

export default router;