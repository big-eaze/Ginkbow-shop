import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = express.Router();

// Payment summary: Calculate sub-total, total delivery fee, and total cost
router.get('/', async (req, res) => {
  try {
    // Fetch all cart items with product details
    const cartItems = await Cart.findAll({
      include: {
        model: Product,
        as: 'product',
        attributes: ['price'], // Ensure the price is fetched correctly
      },
    });

    // Log the fetched cart items for debugging
    console.log('Cart Items:', cartItems);

    // Check if the cart is empty
    if (cartItems.length === 0) {
      return res.json({
        subTotal: 0,
        totalDeliveryFee: 0,
        totalCost: 0,
      });
    }

    // Initialize totals
    let subTotal = 0;
    let totalDeliveryFee = 0;

    // Calculate sub-total and total delivery fee
    for (const cartItem of cartItems) {
      const productPrice = cartItem.product.price;
      const quantity = cartItem.quantity;
      const deliveryFee = cartItem.deliveryFee;

      subTotal += productPrice * quantity; // Add product price * quantity to sub-total
      totalDeliveryFee += deliveryFee; // Add delivery fee to total delivery fee
    }

    // Calculate total cost
    const totalCost = subTotal + totalDeliveryFee;

    // Return the payment summary
    res.json({
      subTotal,
      totalDeliveryFee,
      totalCost,
    });
  } catch (error) {
    console.error('Error calculating payment summary:', error);
    res.status(500).json({ message: 'Failed to calculate payment summary' });
  }
});

export default router;