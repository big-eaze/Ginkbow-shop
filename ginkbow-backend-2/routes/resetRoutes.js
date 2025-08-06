import express from 'express';
import Order from '../models/Order.js';
import OrderProduct from '../models/OrderProduct.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import categories from '../defaultData/defaultProducts.js';
import defaultCart from '../defaultData/defaultCart.js';
import orderData from '../defaultData/defaultOrders.js';

const router = express.Router();

// Reset all data and seed default data
router.post('/', async (req, res) => {
  try {
    // Clear all data from the database
    await OrderProduct.destroy({ where: {}, truncate: true });
    await Order.destroy({ where: {}, truncate: true });
    await Cart.destroy({ where: {}, truncate: true });
    await Product.destroy({ where: {}, truncate: true });

    // Seed default products
    for (const category of categories) {
      if (Array.isArray(category.products)) {
        for (const product of category.products) {
          await Product.create({
            ...product,
            categoryKey: category.key,
          });
        }
      }
    }

    // Seed default cart items
    for (const cartItem of defaultCart) {
      await Cart.create(cartItem);
    }

    // Seed default orders
    for (const order of orderData) {
      const createdOrder = await Order.create({
        id: order.id,
        orderTimeMs: order.orderTimeMs,
        totalCostCents: order.totalCostCents,
      });

      for (const product of order.products) {
        await OrderProduct.create({
          orderId: createdOrder.id,
          productId: product.productId,
          quantity: product.quantity,
          estimatedDeliveryTimeMs: product.estimatedDeliveryTimeMs,
        });
      }
    }

    res.status(200).json({ message: 'Database reset successfully and default data seeded.' });
  } catch (error) {
    console.error('Error resetting database:', error);
    res.status(500).json({ message: 'Failed to reset database' });
  }
});

export default router;