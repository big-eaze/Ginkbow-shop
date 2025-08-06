import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Import CORS
import sequelize from './config/database.js';
import Product from './models/Product.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import categories from './defaultData/defaultProducts.js'; // Import defaultProducts.js;
import defaultCart from './defaultData/defaultCart.js';
import './models/index.js'; // Ensure associations are loaded;
import Cart from './models/Cart.js'; // Ensure the Cart model is imported
import paymentSummaryRoutes from './routes/paymentSummaryRoutes.js';
import resetRoutes from './routes/resetRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js'; // Import ordersRoutes.js
import trackingRoutes from './routes/trackingRoutes.js'; // Import trackingRoutes
import orderData from './defaultData/defaultOrders.js'; // Import the default orders data
import { Order, OrderProduct } from './models/index.js'; // Import models
import trackingData from './defaultData/defaultTracking.js'; // Import tracking data
import Tracking from './models/Tracking.js'; // Import Tracking model
import cron from 'node-cron';
import updateTrackingStatus from './utils/updateTrackingStatus.js';

dotenv.config();

const app = express();

// Enable CORS globally
app.use(cors()); // Add this line to enable CORS for all routes

app.use(express.json());

const PORT = process.env.PORT || 8080;


// Routes
try {
  app.use('/products', productRoutes);
  app.use('/cartItems', cartRoutes);
  app.use('/reset', resetRoutes);
  app.use('/payment-summary', paymentSummaryRoutes);
  app.use('/orders', ordersRoutes);
  app.use('/tracking', trackingRoutes);
} catch (err) {
  console.error("🔥 Error in route registration:", err);
}



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, 'dist')));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}





const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully!');


    categories.forEach(category => {
      if (Array.isArray(category.products)) {
        category.products.forEach(async product => {
          try {
            await Product.create({
              ...product,
              categoryKey: category.key, // Add the category key to each product
            });
          } catch (error) {
            console.error('Error inserting product:', product, error);
          }
        });
      } else {
        console.warn(`Category "${category.name}" has no products.`);
      }
    });

    // Seed cart
    defaultCart.forEach(async cartItem => {
      try {
        await Cart.create(cartItem);
      } catch (error) {
        console.error('Error inserting cart item:', cartItem, error);
      }
    });

    // Seed orders and their associated products
    for (const order of orderData) {
      // Create the order
      const createdOrder = await Order.create({
        id: order.id,
        orderTimeMs: order.orderTimeMs,
        totalCostCents: order.totalCostCents,
      });

      // Create the associated products
      for (const product of order.products) {
        await OrderProduct.create({
          orderId: createdOrder.id,
          productId: product.productId,
          quantity: product.quantity,
          estimatedDeliveryTimeMs: product.estimatedDeliveryTimeMs,
        });
      }
    }

    console.log('Orders seeded successfully!');

    // Seed tracking data for existing orders
    for (const tracking of trackingData) {
      await Tracking.create(tracking);
    }

    console.log('Tracking data seeded successfully!');
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Schedule the tracking status update to run every minute
cron.schedule('* * * * *', async () => {
  console.log('Running scheduled task: Update tracking statuses');
  await updateTrackingStatus();
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to SQLite has been established successfully.');

    await seedDatabase();

    // Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database or sync models:', error);
  }
})();