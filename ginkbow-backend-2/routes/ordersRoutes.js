import express from 'express';
import { Order, OrderProduct, Product, Cart, Tracking } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid'; // Don't forget to import uuid if used

const router = express.Router();

// GET /orders - Get all orders
router.get('/', async (req, res) => {
  const { expand } = req.query;

  try {
    const include = [];

    const productInclude = {
      model: OrderProduct,
      as: 'products',
      attributes: ['id', 'orderId', 'productId', 'quantity', 'estimatedDeliveryTimeMs'],
    };

    if (expand === 'products') {
      productInclude.include = [
        {
          model: Product,
          as: 'product',
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
          ],
        },
      ];
    }

    include.push(productInclude);

    const orders = await Order.findAll({ include });

    // Format the response
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      orderTimeMs: order.orderTimeMs,
      totalCostCents: order.totalCostCents,
      products: order.products.map((product) => {
        const productData = {
          orderId: product.orderId, // Include the orderId
          productId: product.productId,
          quantity: product.quantity,
          estimatedDeliveryTimeMs: product.estimatedDeliveryTimeMs,
        };

        if (expand === 'products' && product.product) {
          productData.product = product.product;
        }

        return productData;
      }),
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// GET /orders/:id - Get details of a specific order
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { expand } = req.query;

  try {
    // Validate the `expand` query value
    const shouldExpandProducts = expand === 'products';

    // Define base include for OrderProducts
    const orderProductsInclude = {
      model: OrderProduct,
      as: 'products',
      attributes: ['id', 'orderId', 'productId', 'quantity', 'estimatedDeliveryTimeMs'],
    };

    // Conditionally include full product details
    if (shouldExpandProducts) {
      orderProductsInclude.include = {
        model: Product,
        as: 'product',
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
        ],
      };
    }

    // Query the order with optional nested includes
    const order = await Order.findOne({
      where: { id },
      include: [orderProductsInclude],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Format the response
    const formattedOrder = {
      id: order.id,
      orderTimeMs: order.orderTimeMs,
      totalCostCents: order.totalCostCents,
      products: order.products.map((product) => {
        const productData = {
          orderId: product.orderId, // Include the orderId
          productId: product.productId,
          quantity: product.quantity,
          estimatedDeliveryTimeMs: product.estimatedDeliveryTimeMs,
        };

        // Include full product details if requested
        if (shouldExpandProducts && product.product) {
          productData.product = product.product;
        }

        return productData;
      }),
    };

    return res.json(formattedOrder);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Failed to fetch order' });
  }
});

// POST /orders - Create a new order
router.post('/', async (req, res) => {
  const products = req.body; // The request body is an array of products

  // Validate the request body
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  try {
    // Calculate the orderTimeMs (current timestamp in milliseconds)
    const orderTimeMs = Date.now();

    let totalCostCents = 0; // Initialize total cost
    let estimatedDeliveryTimeMs = orderTimeMs + 7 * 24 * 60 * 60 * 1000; // Default estimated delivery time (7 days from now)

    // Create the associated products
    const createdProducts = [];
    for (const product of products) {
      if (!product.productId || !product.quantity) {
        return res.status(400).json({ message: 'Invalid product data in order' });
      }

      // Fetch the product price from the database
      const productDetails = await Product.findOne({
        where: { id: product.productId },
        attributes: ['price'], // Only fetch the price
      });

      if (!productDetails) {
        return res.status(404).json({ message: `Product with ID ${product.productId} not found` });
      }

      // Calculate the cost for this product
      const productCost = productDetails.price * product.quantity;

      // Add to the total cost
      totalCostCents += productCost;

      // Calculate estimatedDeliveryTimeMs (7 days from orderTimeMs)
      estimatedDeliveryTimeMs = orderTimeMs + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

      createdProducts.push({
        productId: product.productId,
        quantity: product.quantity,
        estimatedDeliveryTimeMs,
      });
    }

    // Create the order
    const order = await Order.create({
      id: uuidv4(),
      orderTimeMs,
      totalCostCents,
    });

    // Save the associated products to the database
    for (const product of createdProducts) {
      await OrderProduct.create({
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
        estimatedDeliveryTimeMs: product.estimatedDeliveryTimeMs,
      });
    }

    // List of carriers to shuffle from
    const carriers = ['FedEx', 'UPS', 'DHL', 'USPS', 'Amazon Logistics'];

    // Randomly select a carrier
    const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];

    // Create a tracking record for the order
    await Tracking.create({
      id: uuidv4(),
      orderId: order.id,
      carrier: randomCarrier, // Use the randomly selected carrier
      trackingNumber: Math.random().toString(36).substring(2, 10).toUpperCase(), // Generate a random tracking number
      status: 'Order Placed',
      updatedAt: new Date(),
      estimatedDeliveryTimeMs, // Include the estimated delivery time
    });

    // Wipe the cart empty
    try {
      console.log('Clearing the cart...');
      await Cart.destroy({ where: {} });
      console.log('Cart cleared successfully.');
    } catch (error) {
      console.error('Error clearing the cart:', error);
    }

    // Respond with the created order and its products
    res.status(201).json({
      id: order.id,
      orderTimeMs: order.orderTimeMs,
      totalCostCents: order.totalCostCents,
      products: createdProducts,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

export default router;
